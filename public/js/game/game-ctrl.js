angular.module('game')
.controller('GameCtrl', function($scope, _, playActions, AdvanceRunnersModal) {
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
    console.log('base', base)
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
      return { player: baseRunner.player, start: baseRunner.base }
    })
    runners.unshift({ player: vm.state.batter, start: 0 })
    return runners
  }

  vm.createPlayAction = function(action) {
    console.log('action', action)
    console.log('runners', vm.state.runners)
    var runners = vm.playRunners()
    _.each(runners, function(runner) {
      runner.minEnd = Math.min(4, runner.start + basesMustAdvance(runner.start, action, runners))
      if(action.advance.optimistic) {
        runner.end = Math.min(4, runner.start + action.advance.batter)
      } else {
        runner.end = runner.minEnd
      }
      runner.modifiable = false
      if(runner.start == 0 && action.advance.batterModifiable) {
        runner.modifiable = true
      } else if( runner.start != 0 && action.advance.runnersModifiable) {
        runner.modifiable = true
      }
      if(runner.start == 0 && action.outs > 0 && action.advance.batter == 0) {
        runner.end = -1
      }
      return runner
    })

    console.log('runners', runners)

    AdvanceRunnersModal.showModal(runners, action)
    .then(function(modal) {
      console.log('modal', modal);
      modal.close.then(function(runners) {
        if(!runners) return;
        updateRunners(runners)
      });
    });
  }

  function updateRunners(runners) {
    console.log('ret runners', runners)
    var outs = _.where(runners, { end: -1 }).length
    var runs = _.where(runners, { end: 4 }).length
    vm.state.outs += outs
    vm.state.runs += runs // TODO: mark for each team

    vm.state.runners =
      _.chain(runners)
      .select(function(runner) {
        return (0 < runner.end) && (runner.end < 4)
      })
      .map(function(runner) {
        return { base: runner.end, player: runner.player }
      })
      .value()
    vm.state.batter = nextBatter()
  }

  // Precondition: valid runners, will not return valid values if 2 runners on
  // same base
  function basesMustAdvance(startBase, action, runners) {
    var runnersBehind = _.select(runners, function(runner) {
      return runner.start < startBase
    })
    var endBase = runnersBehind.length - action.outs + action.advance.batter
    var mustAdvance = endBase - startBase
    if(mustAdvance < 0) mustAdvance = 0
    return mustAdvance
  }

  function nextBatter() {
    var lineup = vm.lineupTeam1  // getCurrentTeam().lineup
    console.log('lineup', lineup)
    var batterNum = vm.state.batter.order + 1
    if(batterNum > lineup.length) batterNum = 1
    return _.findWhere(lineup, { order: batterNum })
  }

})
.filter('possiblePlayAction', function() {
  return function(allPlayActions, gameState) {
    var numRunners = gameState.runners.length
    var remainingOuts = 3 - gameState.outs
    return _.select(allPlayActions, function(playAction) {
      if(playAction.outs > remainingOuts) return false
      if(playAction.requiredRunners > numRunners) return false
      return true
    })
  }
})
