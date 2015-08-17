angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners) {

  var vm = this
  vm.runnerPrefs = runners

  vm.close = function() {
    console.log('dieing')
    close(false)
  }

  vm.save = function() {
    console.log('saving')
    close(vm.runnerPrefs)
  }

})
