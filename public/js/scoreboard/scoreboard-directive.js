angular.module('scoreboard')
.directive('scoreboard', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      innings: '=',
      awayTeam: '=',
      homeTeam: '='
    },
    templateUrl: TemplateUtil.url('scoreboard/scoreboard.tmpl.html'),
    controller: function($scope) {}
  }
})
