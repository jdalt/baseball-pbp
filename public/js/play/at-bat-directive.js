angular.module('play')
.directive('atBat', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      atBat: '=',
      playId: '='
    },
    templateUrl: TemplateUtil.url('play/at-bat.tmpl.html'),
    controller: function($scope) {

    }
  }
})
