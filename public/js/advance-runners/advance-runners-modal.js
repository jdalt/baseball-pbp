angular.module('advance-runners')
.factory('AdvanceRunnersModal', function(ModalService) {

  function createSettings(runners, action) {
    return {
      templateUrl: 'js/advance-runners/advance-runners.tmpl.html',
      controller: 'AdvanceRunnersCtrl',
      controllerAs: 'runners',
      inputs: {
        action: action,
        runners: runners
      }
    }
  }

  return {
    showModal: function(runners, action) {
      var settings = createSettings(runners, action)
      return ModalService.showModal(settings)
    }
  }

})

