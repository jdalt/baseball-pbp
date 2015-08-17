angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners) {

  var vm = this
  vm.test = runners

  vm.close = function() {
    console.log('dieing')
    close(false)
  }

  vm.save = function() {
    console.log('saving')
    close('saving')
  }

})
