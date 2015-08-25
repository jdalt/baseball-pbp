angular.module('scoreboard')
.directive('scoreboard', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {
      innings: '=',
      currentInning: '=',
      topInning: '=',
      awayTeam: '=',
      homeTeam: '='
    },
    templateUrl: TemplateUtil.url('scoreboard/scoreboard.tmpl.html'),
    controller: function($scope) {
      $scope.$watch('currentInning', updateCurrentInning)
      $scope.$watch('topInning', updateCurrentInning)

      function updateCurrentInning() {
        var inningObj = $scope.innings[$scope.currentInning - 1]
        if($scope.topInning)
          $scope.curInning = inningObj.top
        else
          $scope.curInning = inningObj.bottom
      }
    }
  }
})
