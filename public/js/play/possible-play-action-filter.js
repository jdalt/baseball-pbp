angular.module('play')
.filter('possiblePlayAction', function(GameState) {
  return function(allPlayActions) {
    var numRunners = GameState.runners().length
    var remainingOuts = 3 - GameState.outs()
    return _.select(allPlayActions, function(playAction) {
      if(playAction.outs > remainingOuts) return false
      if(playAction.requiredRunners > numRunners) return false
      return true
    })
  }
})
