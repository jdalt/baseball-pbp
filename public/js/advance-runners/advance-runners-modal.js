angular.module('advance-runners')
.factory('AdvanceRunnersModal', function(ModalService) {

  function createSettings(runners, outs) {
    return {
      templateUrl: 'js/advance-runners/advance-runners.tmpl.html',
      controller: 'AdvanceRunnersCtrl',
      controllerAs: 'runners',
      inputs: {
        outs: outs,
        runners: runners
      }
    }
  }

  return {
    showModal: function(runners) {
      var settings = createSettings(runners)
      return ModalService.showModal(settings)
    }
  }

})

