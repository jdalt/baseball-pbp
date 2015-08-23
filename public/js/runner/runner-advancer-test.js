describe('RunnerAdvancerFactory', function() {
  var PA
  var RA


  beforeEach(function() {
    inject(function(playActions, RunnerAdvancer) {
      PA = playActions
      RA = RunnerAdvancer
    })
  })

  function getAction(abbrev) {
    return _.findWhere(PA, { abbrev: abbrev })
  }

  describe('HR', function() {
    it('should score all runners', function() {
      var action = getAction('HR')
      var runners = RA.process(runnerOnFirst, action)

      expectDefaultEnd(runners, [4,4])
      expectModifiable(runners, [false,false])
      expect(runners[0].possibleBases.length).toBe(1)
    })
  })

  describe('FC', function() {
    describe('with a runner on first', function() {
      it('should auto advance batter and auto 1st Base Runner out', function() {
        var action = getAction('FC')
        var runners = RA.process(runnerOnFirst, action)

        expectDefaultEnd(runners, [1,-1])
        expectModifiable(runners, [false,false])
        // Should possible bases be consistent with non-modifiable status?
        // expect(runners[0].possibleBases.length).toBe(1)
        // expect(runners[1].possibleBases.length).toBe(1)
      })
    })

    describe('with runners on first and second', function() {
      it('should auto advance batter and allow 1st Base Runner and 2nd Base Runner for UI', function() {
        var action = getAction('FC')
        var runners = RA.process(runnersOnFirstAndSecond, action)

        console.log('runner', runners[1].possibleBases)
        expectDefaultEnd(runners, [1,-1,2])
        expectModifiable(runners, [false,true,true])
        expectPossibleBases(runners[1], [-1,2,3,4])
        expectPossibleBases(runners[2], [-1,2,3,4])
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

  function expectPossibleBases(runner, possibleBases) {
    _.each(possibleBases, function(base, index) {
      expect(runner.possibleBases[index].num).toBe(base)
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
var runnersOnFirstAndSecond = createPlayRunners([1,2])
var runnersAtTheCorners = createPlayRunners([1,3])
var runnersAtSecondThird = createPlayRunners([2,3])
var basesLoaded = createPlayRunners([1,2,3])
