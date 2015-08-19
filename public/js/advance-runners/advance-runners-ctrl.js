angular.module('advance-runners')
.controller('AdvanceRunnersCtrl', function(close, runners, action, _) {

  var vm = this
  vm.action = action
  vm.runners = runners

  vm.close = function() {
    close(false)
  }

  vm.save = function() {
    close(vm.runners)
  }

})
