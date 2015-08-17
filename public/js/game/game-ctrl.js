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
    inning: 'T1',
    pitcher: vm.lineupTeam2[0],
    batter: vm.lineupTeam1[0],
    base1: {},
    base2: {},
    base3: {}
  }

  vm.playActions = playActions
  vm.plays = []
  vm.currentPlay = {}
  vm.currentPlayAction = {}

  vm.currentRunners = function() {
    function pushRunner(player, start, runners) {
      if(player.id) runners.push({ player: player, start: start })
    }

    var runners = []
    pushRunner(vm.state.batter, 0, runners)
    pushRunner(vm.state.base1, 1, runners)
    pushRunner(vm.state.base2, 2, runners)
    pushRunner(vm.state.base3, 3, runners)
    return runners
  }

  vm.createPlayAction = function(action) {
    console.log('action', action)
    console.log('runners', vm.currentRunners())
    var runners = vm.currentRunners()
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
    console.log('adv runners', runners)
    // Do confirmation step, do in order of lead runner to batter?

    // Update Game State
    function updateBase(baseNum, runners) {
      var newRunner = _.select(runners, {end: baseNum})
      if(newRunner.length > 1) { console.log('error: multiple runners on same base') } // more than 1 runner cannot be on the same base
      if(newRunner.length == 1) {
        var baseProp = 'base' + baseNum
        vm.state[baseProp] = newRunner[0].player
      }
    }

    clearBases()
    updateBase(1, runners)
    updateBase(2, runners)
    updateBase(3, runners)
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

  function clearBases() {
    vm.state.base1 = vm.state.base2 = vm.state.base3 = {}
  }

  function nextBatter() {
    var lineup = vm.lineupTeam1  // getCurrentTeam().lineup
    console.log('lineup', lineup)
    var batterNum = vm.state.batter.order + 1
    if(batterNum > lineup.length) batterNum = 1
    return _.findWhere(lineup, { order: batterNum })
  }


})
