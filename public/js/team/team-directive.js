angular.module('team')
.directive('team', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      team: '='
    },
    templateUrl: TemplateUtil.url('team/team-directive.tmpl.html'),
    controller: function($scope) {

    }
  }
})
