angular.module('game')
.controller('GameCtrl', function($scope, _, playActions, BaseAdvancer, AdvanceRunnersModal) {
  var vm = this

  vm.awayTeam = {
    name: 'Leland Giants',
    pitcher: { id: 1001, name: "Jimmy"},
    runs: 0,
    batterIndex: 0,
    lineup: [
      { id: 1001, name: "Fig", position: 'DH'},
      { id: 1002, name: "Ralph", position: 'C'},
      { id: 1003, name: "Groucho", position: '1B'},
      { id: 1004, name: "Deadpan", position: '2B'},
      { id: 1005, name: "Rando", position: '3B'},
      { id: 1006, name: "Sam", position: 'SS'},
      { id: 1007, name: "Froto", position: 'LF'},
      { id: 1008, name: "Lila", position: 'CF'},
      { id: 1009, name: "Peach", position: 'RF'}
    ]
  }
  vm.homeTeam = {
    name: 'White Elepants',
    pitcher: { id: 2001, name: "Suza"},
    runs: 0,
    batterIndex: 0,
    lineup: [
      { id: 2001, name: "Landon", position: 'DH'},
      { id: 2002, name: "Garbonzo", position: 'C'},
      { id: 2003, name: "Goose", position: '1B'},
      { id: 2004, name: "Maverick", position: '2B'},
      { id: 2005, name: "Ice Man", position: '3B'},
      { id: 2006, name: "Vulcan", position: 'SS'},
      { id: 2007, name: "Fox", position: 'LF'},
      { id: 2008, name: "Toadstool", position: 'CF'},
      { id: 2009, name: "Bowser", position: 'RF'}
    ]
  }

  vm.completedAtBats = []
  vm.playActions = playActions // Play Action Descriptors...need better name?

  vm.base = function(base) {
    var runner = _.findWhere(vm.state.runners, { base: base })
    if(!runner) runner = { base: base, player: { name: "" } }
    return runner
  }

  vm.playRunners = function() {
    var runners = _.map(vm.state.runners, function(baseRunner) {
      return { player: baseRunner.player, start: baseRunner.base, isBatter: false }
    })
    runners.unshift({ player: vm.state.batter, start: 0, isBatter: true })
    return runners
  }

  vm.createPlayAction = function(action) {
    var runners = BaseAdvancer.process(vm.playRunners(), action)
    var autoAdvance = _.every(runners, function(r) { return !r.modifiable })
    if(autoAdvance) {
      updateGameState(runners, action)
    } else {
      AdvanceRunnersModal.showModal(runners, action)
      .then(function(modal) {
        modal.close.then(function(runners) {
          if(!runners) return;
          updateGameState(runners, action)
        });
      });
    }
  }

  vm.nextInning = function() {
    if(vm.state.isInningTop) {
      setInning(vm.state.inning, false)
    } else {
      setInning(vm.state.inning + 1, true)
    }
  }

  setInning(1,true)

  function setInning(inning, isTop) {
    var teamBatting, teamPitching

    if(isTop) {
      teamBatting = vm.awayTeam
      teamPitching = vm.homeTeam
    } else {
      teamBatting = vm.homeTeam
      teamPitching = vm.awayTeam
    }

    vm.state = {
      inning: inning,
      isInningTop: isTop,
      outs: 0,
      batter: teamBatting.lineup[teamBatting.batterIndex],
      pitcher: teamPitching.pitcher,
      teamBatting: teamBatting,
      teamPitching: teamPitching,
      runners: []
    }

    vm.currentAtBat = createAtBat()
  }

  function updateGameState(runners, action) {
    var outs = _.where(runners, { end: -1 }).length
    var runs = _.where(runners, { end: 4 }).length

    var newPlayAction = buildPlayAction(outs, runs, runners, action)
    vm.currentAtBat.playActions.push(newPlayAction)

    vm.state.outs += outs
    vm.state.teamBatting.runs += runs

    vm.state.runners = _.chain(runners)
      .select(function(runner) { return (0 < runner.end) && (runner.end < 4) })
      .map(function(runner) { return { base: runner.end, player: runner.player } })
      .value()

    if(atBatFinished(runners)) nextAtBat()
  }

  function atBatFinished(runners) {
    var batterRunner = _.findWhere(runners, { player: vm.state.batter })
    return (batterRunner.end != 0)
  }

  function nextAtBat() {
    finalizeCurrentAtBat()
    vm.completedAtBats.push(vm.currentAtBat)
    vm.currentAtBat = createAtBat()
    vm.state.batter = nextBatter() // don't advance if the batter is still batting
  }

  function buildPlayAction(outs, runs, runners, action) {
    return {
      outsStart: vm.state.outs,
      outsEnd: vm.state.outs + outs,
      runsStart: vm.state.teamBatting.runs,
      runsEnd: vm.state.teamBatting.runs + runs,
      action: action,
      runners: runners,
      fielders: {}
    }
  }

  // Creates new at-bat from current game state
  function createAtBat() {
    return {
      inning: vm.state.inning,
      outsStart: vm.state.outs,
      runsStart: vm.state.teamBatting.runs,
      batter: vm.state.teambatter,
      pitcher: vm.state.pitcher,
      pitches: [],
      playActions: []
    }
  }

  function finalizeCurrentAtBat() {
    var actions = vm.currentAtBat.playActions
    var outsEnd = _.last(actions).outsEnd
    var runsEnd = _.last(actions).runsEnd
    vm.currentAtBat.outsEnd = outsEnd
    vm.currentAtBat.runsEnd = runsEnd
  }

  function nextBatter() {
    vm.state.teamBatting.batterIndex++
    if(vm.state.teamBatting.batterIndex >= vm.state.teamBatting.lineup.length) vm.state.teamBatting.batterIndex = 0
    return vm.state.teamBatting.lineup[vm.state.teamBatting.batterIndex]
  }

})
