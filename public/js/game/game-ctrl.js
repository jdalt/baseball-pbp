angular.module('game')
.controller('GameCtrl', function($scope, _, playActions, BaseAdvancer, AdvanceRunnersModal, GameSettings) {
  var vm = this

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
      teamBatting = GameSettings.awayTeam
      teamPitching = GameSettings.homeTeam
    } else {
      teamBatting = GameSettings.homeTeam
      teamPitching = GameSettings.awayTeam
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
