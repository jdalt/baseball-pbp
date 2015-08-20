angular.module('play-action')
.directive('playAction', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      leagues: '='
    },
    templateUrl: TemplateUtil.url('play-action/play-action.tmpl.html'),
    controller: function($scope) {

    }
  }
})
