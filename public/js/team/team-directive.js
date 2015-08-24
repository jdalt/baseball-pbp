angular.module('team')
.directive('team', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      homeAway: '@'
    },
    templateUrl: TemplateUtil.url('team/team-directive.tmpl.html'),
    controller: function($scope, Teams, GameState) {
      if($scope.homeAway == 'home') {
        $scope.team = Teams.homeTeam
      } else {
        $scope.team = Teams.awayTeam
      }

      $scope.$watch( function watchTeamBatting() {
        return GameState.teamBatting()
      }, function syncTeamBatting(teamBatting) {
        $scope.isBatting = ($scope.team == teamBatting)
      })
    }
  }
})
