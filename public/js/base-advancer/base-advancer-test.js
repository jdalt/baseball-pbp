describe('BaseAdvancerFactory', function() {
  var PA
  var BA

  beforeEach(function() {
    inject(function(playActions, BaseAdvancer) {
      PA = playActions
      BA = BaseAdvancer
    })
  })

  function getAction(abbrev) {
    return _.findWhere(PA, { abbrev: abbrev })
  }

  describe('HR', function() {
    it('should score both runners', function() {
      var action = getAction('HR')
      var runners = [
        { player: { name: "Jim", order: 1 },
          start: 0,
          isBatter: true
        },
        { player: { name: "Zooey", order: 8 },
          start: 1,
          isBatter: false
        }
      ]

      BA.process(runners, action)
      expect(runners[0].end).toBe(4)
      expect(runners[1].end).toBe(4)
    })
  })

})
