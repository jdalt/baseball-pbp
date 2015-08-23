describe('possiblePlayAction Filter', function() {
  var ppaFilter, PA, GS

  beforeEach(function() {
    inject(function(playActions, GameState) {
      PA = playActions
      GS = GameState
      GS.setInning(1,true)
    })
    ppaFilter = $filter('possiblePlayAction')
  })

  describe('for action Triple Play', function() {
    it('should filter out action with 2 outs and 2 runners on', function() {
      GS._state.outs = 2
      GS._state.runners = [{},{}]
      var TP = getAction('TP')
      var result = ppaFilter([TP])
      expect(result.length).toBe(0)
    })
  })

  describe('for action Sacrifice', function() {
    it('should remove action with 1 outs and 0 runners on', function() {
      GS._state.outs = 2
      GS._state.runners = []
      var SAC = getAction('SAC')
      var result = ppaFilter([SAC])
      expect(result.length).toBe(0)
    })

    it('should leave action with 1 outs and 2 runners on', function() {
      GS._state.outs = 2
      GS._state.runners = [{},{}]
      var SAC = getAction('SAC')
      var result = ppaFilter([SAC])
      expect(result.length).toBe(1)
    })

    // TODO: consider how to correctly filter this case
    xit('should filter action with 2 outs and 2 runners on', function() {
      GS._state.outs = 2
      GS._state.runners = [{},{}]
      var SAC = getAction('SAC')
      var result = ppaFilter([SAC])
      expect(result.length).toBe(0)
    })
  })

  function getAction(abbrev) {
    return _.findWhere(PA, { abbrev: abbrev })
  }

})

