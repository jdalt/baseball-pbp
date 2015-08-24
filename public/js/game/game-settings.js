angular.module('game')
.factory('GameSettings', function(Teams) {

  return {
    homeTeam: Teams.homeTeam,
    awayTeam: Teams.awayTeam
  }

})
