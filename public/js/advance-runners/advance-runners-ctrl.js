angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners, outs, _) {

  var vm = this
  vm.baseToString = {
    0: "Batter",
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "Score"
  }
  vm.baseToString[-1] = "Out"

  vm.outs = outs
  vm.runnerPrefs = _.map(runners, function(runner) {
    runner.possibleBases = possibleBases(runner.minEnd, (outs == 0))
    return runner
  })

  function possibleBases(minBase, removeOut) {
    console.log('bts', vm.baseToString)
    console.log('minBase', minBase, 'removeOut', removeOut)
    var possible = []
    var baseRange = _.range(minBase, 5)
    if(!removeOut) baseRange.unshift(-1) // -1 is the base code for an out
    console.log('baseRange', baseRange)
    _.map(baseRange, function(base) {
      possible.push({ num: base, name: vm.baseToString[base] })
    })
    console.log('possibleBases', possible)
    return possible
  }
  console.log('runners w/in modal', runners)

  vm.close = function() {
    console.log('dieing')
    close(false)
  }

  vm.save = function() {
    console.log('saving')
    close(vm.runnerPrefs)
  }

})
