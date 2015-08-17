angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners, action, _) {

  var vm = this
  vm.baseToString = {}
  vm.baseToString[-1] = "Out"
  vm.baseToString[0]  = "Batting"
  vm.baseToString[1]  = "1st"
  vm.baseToString[2]  = "2nd"
  vm.baseToString[3]  = "3rd"
  vm.baseToString[4]  = "Home"

  vm.action = action
  vm.runnerPrefs = _.map(runners, function(runner) {
    runner.possibleBases = possibleBases(runner.minEnd, (action.outs == 0))
    return runner
  })

  function possibleBases(minBase, removeOut) {
    var possible = []
    var baseRange = _.range(minBase, 5)
    if(!removeOut) baseRange.unshift(-1) // -1 is the base code for an out
    _.map(baseRange, function(base) {
      possible.push({ num: base, name: vm.baseToString[base] })
    })
    return possible
  }

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

})
