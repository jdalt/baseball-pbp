angular.module('game-state')
.factory('GameState', function(GameSettings) {

  var _state = {}

  function setInning(inningNum, isTop) {
    var teamBatting, teamPitching

    if(isTop) {
      teamBatting = this._state.teamBatting = GameSettings.awayTeam
      teamPitching = this._state.teamPitching = GameSettings.homeTeam
    } else {
      teamBatting = this._state.teamBatting = GameSettings.homeTeam
      teamPitching = this._state.teamPitching = GameSettings.awayTeam
    }

    var inning = GameSettings.innings[inningNum - 1] // GameState uses 0 indexed array
    var inningHalf
    if(isTop) {
      inningHalf = inning.top
    } else {
      inningHalf = inning.bottom
    }
    inningHalf.runs = 0

    this._state = _.extend(this._state, {
      inning: inning.number,
      inningHalf: inningHalf,
      isInningTop: isTop,
      outs: 0,
      batter: teamBatting.lineup[teamBatting.batterIndex],
      pitcher: teamPitching.pitcher,
      runners: []
    })

    this._state.currentAtBat = createAtBat(this._state)
  }

  function update(runners, action) {
    var outs = _.where(runners, { end: -1 }).length
    var runs = _.where(runners, { end: 4 }).length

    var newPlayAction = buildPlayAction(outs, runs, runners, action, this._state)
    this._state.currentAtBat.playActions.push(newPlayAction)

    this._state.outs += outs
    updateTeamStats(this._state, runs, action)

    this._state.runners = _.chain(runners)
      .select(function(runner) { return (0 < runner.end) && (runner.end < 4) })
      .map(function(runner) { return { base: runner.end, player: runner.player } })
      .value()

    if(atBatFinished(runners, this._state.batter)) nextAtBat(this._state)
  }

  function updateTeamStats(state, runs, playAction) {
    state.teamBatting.runs += runs
    if(playAction.isHit) state.teamBatting.hits += 1
    if(playAction.isError) state.teamPitching.errors += 1
  }

  function atBatFinished(runners, batter) {
    var batterRunner = _.findWhere(runners, { player: batter })
    return (batterRunner.end != 0)
  }

  function nextAtBat(state) {
    finalizeCurrentAtBat(state)
    updateInningHalf(state)
    state.currentAtBat = createAtBat(state)
    state.batter = nextBatter(state) // don't advance if the batter is still batting
  }

  function updateInningHalf(state) {
    state.inningHalf.completedAtBats.push(state.currentAtBat)

    var runsScored = _.chain(state.currentAtBat.playActions).flatten()
      .map('runners').flatten()
      .where({ end: 4}).valueOf().length
    state.inningHalf.runs += runsScored
  }

  function buildPlayAction(outs, runs, runners, action, state) {
    return {
      outsStart: state.outs,
      outsEnd: state.outs + outs,
      runsStart: state.teamBatting.runs,
      runsEnd: state.teamBatting.runs + runs,
      action: action,
      runners: runners,
      fielders: {}
    }
  }

  // Creates new at-bat from current game this._state
  function createAtBat(state) {
    return {
      inning: state.inning,
      outsStart: state.outs,
      runsStart: state.teamBatting.runs,
      batter: state.teambatter,
      pitcher: state.pitcher,
      pitches: [],
      playActions: []
    }
  }

  function finalizeCurrentAtBat(state) {
    var actions = state.currentAtBat.playActions
    var outsEnd = _.last(actions).outsEnd
    var runsEnd = _.last(actions).runsEnd
    state.currentAtBat.outsEnd = outsEnd
    state.currentAtBat.runsEnd = runsEnd
  }

  function nextBatter(state) {
    state.teamBatting.batterIndex++
    if(state.teamBatting.batterIndex >= state.teamBatting.lineup.length) state.teamBatting.batterIndex = 0
    return state.teamBatting.lineup[state.teamBatting.batterIndex]
  }

  function nextInning() {

    if(this._state.isInningTop) {
      this.setInning(this._state.inning, false)
    } else {
      this.setInning(this._state.inning + 1, true)
    }
  }

  // Getters
  function outs() { return this._state.outs }
  function runners() { return this._state.runners }
  function batter() { return this._state.batter }
  function pitcher() { return this._state.pitcher }
  function teamBatting() { return this._state.teamBatting }
  function isInningTop() { return this._state.isInningTop }
  function inning() { return this._state.inning }
  function inningHalf() { return this._state.inningHalf }

  return {
    _state: _state,
    outs: outs,
    runners: runners,
    batter: batter,
    pitcher: pitcher,
    teamBatting: teamBatting,
    update: update,
    isInningTop: isInningTop,
    inning: inning,
    inningHalf: inningHalf,
    nextInning: nextInning,
    setInning: setInning
  }

})
