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
    it('should score all runners', function() {
      var action = getAction('HR')
      var runners = BA.process(runnerOnFirst, action)

      expectDefaultEnd(runners, [4,4])
      expectModifiable(runners, [false,false])
      expect(runners[0].possibleBases.length).toBe(1)
    })
  })

  describe('FC', function() {
    describe('with runner on first' function() {
      it('should score all runners', function() {
        var action = getAction('FC')
        var runners = BA.process(runnerOnFirst, action)

        expectDefaultEnd(runners, [1,-1])
        expectModifiable(runners, [false,false])
        expect(runners[0].possibleBases.length).toBe(1)
        expect(runners[1].possibleBases.length).toBe(1)
      })
    })
  })

  function expectDefaultEnd(runners, runnersEndList) {
    _.each(runnersEndList, function(end, index) {
      expect(runners[index].end).toBe(end)
    })
  }

  function expectModifiable(runners, modifiableList) {
    _.each(modifiableList, function(modifiable, index) {
      expect(runners[index].modifiable).toBe(modifiable)
    })
  }

})


// Runner Fixtures

var allRunners = [
  { player: { name: "Batter" },
    start: 0,
    isBatter: true
  },
  { player: { name: "1st Base Runner" },
    start: 1,
    isBatter: false
  },
  { player: { name: "2nd Base Runner" },
    start: 2,
    isBatter: false
  },
  { player: { name: "3rd Base Runner" },
    start: 3,
    isBatter: false
  }
]

function createPlayRunners(basesArray) {
  basesArray.unshift(0) // make the batter yourself
  return _.map(basesArray, function(baseIndex) {
    return allRunners[baseIndex]
  })
}

var runnerOnFirst = createPlayRunners([1])
var runnerOnSecond = createPlayRunners([2])
var runnerOnThird = createPlayRunners([3])
var runnersOnFirstSecond = createPlayRunners([1,2])
var runnersAtTheCorners = createPlayRunners([1,3])
var runnersAtSecondThird = createPlayRunners([2,3])
var basesLoaded = createPlayRunners([1,2,3])
