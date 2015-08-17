angular.module('advance-runners')
.factory('AdvanceRunnersModal', function(ModalService) {

  function createSettings(runners) {
    return {
      templateUrl: 'js/advance-runners/advance-runners.tmpl.html',
      controller: 'AdvanceRunnersCtrl',
      controllerAs: 'runners',
      inputs: {
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

