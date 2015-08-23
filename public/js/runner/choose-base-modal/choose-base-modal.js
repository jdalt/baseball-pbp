angular.module('runner')
.factory('ChooseBaseModal', function(ModalService) {

  function createSettings(runners, action) {
    return {
      templateUrl: 'js/runner/choose-base-modal/choose-base.tmpl.html',
      controller: 'ChooseBaseCtrl',
      controllerAs: 'advModal',
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

