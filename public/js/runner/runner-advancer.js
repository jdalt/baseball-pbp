angular.module('runner')
.factory('RunnerAdvancer', function(_) {

  function process(runners, action) {
    var usedRunnerOuts = runnersOut()
    return _.map(runners, function(runner) {
      if(runner.isBatter) {
        prepareBatter(runner)
      } else {
        prepareRunner(runner)
      }
      return runner
    })

    function prepareBatter(batter) {
      var minBase = action.advance.batter
      if(action.atBatOnly) minBase = Math.max(1, action.advance.batter)
      batter.possibleBases = possibleBases(minBase, !batterCanBeOut())

      batter.modifiable = action.advance.batterModifiable

      if(batterOut()) {
        batter.end = -1
      } else {
        batter.end = minBase
      }
    }

    function prepareRunner(runner) {
      var minBase = Math.min(4, runner.start + basesMustAdvance(runner.start, runners))
      runner.possibleBases = possibleBases(minBase, !runnersCanBeOut())

      var highlander = runner.possibleBases.length == 1 // there can only be one!
      runner.modifiable = action.advance.runnersModifiable && !highlander && !runnerOut()

      if(usedRunnerOuts > 0) {
        usedRunnerOuts -= 1
        runner.end = -1
      } else if(action.advance.optimistic) {
        runner.end = Math.min(4, runner.start + action.advance.batter)
      } else {
        runner.end = minBase
      }
    }

    function batterOut() {
      if(action.outs == 1 && action.advance.batter == 0) return true
      return false
    }

    function batterCanBeOut() {
      if(action.outs > 0 && action.advance.batter == 0) return true
      return false
    }

    function runnerOut() {
      if(action.outs == 1 && !batterOut() && runners.length == 2) return true // think FC
      return false
    }

    function runnersOut() {
      if(batterOut()) return action.outs - 1
      return action.outs
    }

    function runnersCanBeOut() {
      return runnersOut() > 0
    }

    function basesMustAdvance(startBase, runners) {
      var runnersBehind = _.select(runners, function(runner) {
        if(runner.isBatter) return false
        return runner.start < startBase
      }).length

      var occupiedBases = Math.max(0, runnersBehind - runnersCanBeOut())
      occupiedBases += action.advance.batter

      var runnerPressure = (occupiedBases + 1) - startBase
      if(runnerPressure < 0) return 0
      console.log('start base', startBase, 'occupiedBases', occupiedBases, 'runnerPressure', runnerPressure)
      return runnerPressure
    }

    function possibleBases(minBase, omitOut) {
      var possible = []
      var baseRange = _.range(minBase, 5)

      if(!omitOut) baseRange.unshift(-1) // -1 is the base code for an out

      _.each(baseRange, function(base) {
        var baseKey = 'BASE_' + base
        possible.push({ num: base, key: baseKey })
      })
      return possible
    }
  }

  return {
    process: process
  }
})
