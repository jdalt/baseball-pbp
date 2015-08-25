angular.module('team')
.directive('team', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      homeTeam: '=',
      awayTeam: '='
    },
    templateUrl: TemplateUtil.url('team/team-directive.tmpl.html'),
    controller: function($scope, GameState) {
      if($scope.homeTeam) $scope.homeAway = 'home'
      if($scope.awayTeam) $scope.homeAway = 'away'
      $scope.team = $scope.homeTeam || $scope.awayTeam

      $scope.$watch( function watchTeamBatting() {
        return GameState.teamBatting()
      }, function syncTeamBatting(teamBatting) {
        $scope.isBatting = ($scope.team == teamBatting)
      })
    }
  }
})
