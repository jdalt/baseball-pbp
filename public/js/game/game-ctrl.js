angular.module('game')
.controller('GameCtrl', function($scope, _, playActions, BaseAdvancer, AdvanceRunnersModal) {
  var vm = this

  vm.lineupTeam1 = [
    { id: 1001, order: 1, name: "Jimmy", position: 'P'},
    { id: 1002, order: 2, name: "Ralph", position: 'C'},
    { id: 1003, order: 3, name: "Groucho", position: '1B'},
    { id: 1004, order: 4, name: "Deadpan", position: '2B'},
    { id: 1005, order: 5, name: "Rando", position: '3B'},
    { id: 1006, order: 6, name: "Sam", position: 'SS'},
    { id: 1007, order: 7, name: "Froto", position: 'LF'},
    { id: 1008, order: 8, name: "Lila", position: 'CF'},
    { id: 1009, order: 9, name: "Peach", position: 'RF'}
  ]

  vm.lineupTeam2 = [
    { id: 2001, order: 1, name: "Suza", position: 'P'},
    { id: 2002, order: 2, name: "Garbonzo", position: 'C'},
    { id: 2003, order: 3, name: "Goose", position: '1B'},
    { id: 2004, order: 4, name: "Maverick", position: '2B'},
    { id: 2005, order: 5, name: "Ice Man", position: '3B'},
    { id: 2006, order: 6, name: "Vulcan", position: 'SS'},
    { id: 2007, order: 7, name: "Fox", position: 'LF'},
    { id: 2008, order: 8, name: "Toadstool", position: 'CF'},
    { id: 2009, order: 9, name: "Bowser", position: 'RF'}
  ]

  vm.state = {
    outs: 0,
    runs: 0,
    runners: [],
    inning: 'T1',
    pitcher: vm.lineupTeam2[0],
    batter: vm.lineupTeam1[0],
  }

  vm.base = function(base) {
    var runner = _.findWhere(vm.state.runners, { base: base })
    if(!runner) runner = { base: base, player: { name: "" } }
    return runner
  }

  vm.playActions = playActions
  vm.plays = []
  vm.currentPlay = {}
  vm.currentPlayAction = {}

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
      updateRunners(runners)
    } else {
      AdvanceRunnersModal.showModal(runners, action)
      .then(function(modal) {
        console.log('modal', modal);
        modal.close.then(function(runners) {
          if(!runners) return;
          updateRunners(runners)
        });
      });
    }
  }

  function updateRunners(runners) {
    console.log('ret runners', runners)
    var outs = _.where(runners, { end: -1 }).length
    var runs = _.where(runners, { end: 4 }).length
    vm.state.outs += outs
    vm.state.runs += runs // TODO: mark for each team

    vm.state.runners = _.chain(runners)
      .select(function(runner) { return (0 < runner.end) && (runner.end < 4) })
      .map(function(runner) { return { base: runner.end, player: runner.player } })
      .value()

    var batterRunner = _.findWhere(runners, { player: vm.state.batter })
    if(batterRunner.end != 0) vm.state.batter = nextBatter() // don't advance if the batter is still batting
  }

  function nextBatter() {
    var lineup = vm.lineupTeam1  // getCurrentTeam().lineup
    console.log('lineup', lineup)
    var batterNum = vm.state.batter.order + 1
    if(batterNum > lineup.length) batterNum = 1
    return _.findWhere(lineup, { order: batterNum })
  }

})
