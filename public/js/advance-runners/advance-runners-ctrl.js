angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners, action, _) {

  var vm = this
  vm.action = action
  vm.baseToString = {}
  vm.baseToString[-1] = "Out"
  vm.baseToString[0]  = "Batting"
  vm.baseToString[1]  = "1st"
  vm.baseToString[2]  = "2nd"
  vm.baseToString[3]  = "3rd"
  vm.baseToString[4]  = "Home"

  vm.close = function() {
    console.log('cancel')
    close(false)
  }

  vm.save = function() {
    var runners = _.map(vm.runnerPrefs, function(runnerPref) {
     return _.pick(runnerPref, 'player', 'start', 'end')
    })
    close(runners)
  }

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
  vm.runnerPrefs = _.map(runners, function(runner) {
    runner.possibleBases = possibleBases(runner.minEnd, (action.outs == 0))
    return runner
  })

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

  function possibleBases(minBase, removeOut) {
    var possible = []
    var baseRange = _.range(minBase, 5)
    if(!removeOut) baseRange.unshift(-1) // -1 is the base code for an out
    _.map(baseRange, function(base) {
      possible.push({ num: base, name: vm.baseToString[base] })
    })
    return possible
  }

})
