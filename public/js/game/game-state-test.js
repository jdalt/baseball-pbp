describe('GameStateFactory', function() {
  var State
  var Settings

  beforeEach(function() {
    inject(function(GameState, GameSettings) {
      State = GameState
      Settings = GameSettings
    })
  })

  describe('initialized to Top of 1st', function() {
    it('should have proper 0 state (no outs, no runs)', function() {
      State.setInning(1,true)

      expect(State.outs()).toBe(0)
      expect(State.isInningTop()).toBe(true)
      expect(State.inning()).toBe(1)
      expect(State.pitcher()).toBe(Settings.homeTeam.pitcher)
      expect(State.batter()).toBe(Settings.awayTeam.lineup[0])
      expect(State.completedAtBats().length).toBe(0)
    })
  })
})
