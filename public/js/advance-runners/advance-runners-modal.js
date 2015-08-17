angular.module('advance-runners')
.factory('AdvanceRunnersModal', function(ModalService) {

  var settings = {
    templateUrl: 'js/advance-runners/advance-runners.tmpl.html',
    controller: 'AdvanceRunnersCtrl',
    controllerAs: 'runners',
    inputs: {
      runners: "hi"
    }
  }

  return {
    showModal: function() { return ModalService.showModal(settings) }
  }

})

