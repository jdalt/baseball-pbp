angular.module('play-action')
.filter('possiblePlayAction', function() {
  return function(allPlayActions, gameState) {
    var numRunners = gameState.runners.length
    var remainingOuts = 3 - gameState.outs
    return _.select(allPlayActions, function(playAction) {
      if(playAction.outs > remainingOuts) return false
      if(playAction.requiredRunners > numRunners) return false
      return true
    })
  }
})
