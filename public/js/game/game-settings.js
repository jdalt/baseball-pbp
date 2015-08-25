angular.module('game')
.factory('GameSettings', function(Teams, _) {

  var innings = _.map(_.range(1,10), function(inningNum) {
    return { number: inningNum }
  })
  return {
    innings: innings,
    homeTeam: Teams.homeTeam,
    awayTeam: Teams.awayTeam
  }

})
