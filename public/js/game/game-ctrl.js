angular.module('game')
.controller('GameCtrl', function($scope, _, playActions, RunnerAdvancer, ChooseBaseModal, GameState, GameSettings) {
  var vm = this

  vm.playActions = playActions // Play Action Descriptors...need better name?
  vm.positiveBatterActions = getPlayActions(['BB', '1B', '2B', '3B', 'HR'])
  vm.negativeBatterActions = getPlayActions(['K', 'F', 'FC', 'DP'])
  vm.duringAtBatActions = getPlayActions(['SB', 'CS', 'WP', 'B', 'PB', 'E'])

  function getPlayActions(abbrevList) {
    return _.map(abbrevList, function(abbrev) {
      return _.findWhere(playActions, { abbrev: abbrev })
    })
  }

  vm.base = function(base) {
    var runner = _.findWhere(GameState.runners(), { base: base })
    if(!runner) runner = { base: base, player: { name: "" } }
    return runner
  }

  vm.playRunners = function() {
    var runners = _.map(GameState.runners(), function(baseRunner) {
      return { player: baseRunner.player, start: baseRunner.base, isBatter: false }
    })
    runners.unshift({ player: GameState.batter(), start: 0, isBatter: true })
    return runners
  }

  vm.createPlayAction = function(action) {
    var runners = RunnerAdvancer.process(vm.playRunners(), action)
    var autoAdvance = _.every(runners, function(r) { return !r.modifiable })
    if(autoAdvance) {
      GameState.update(runners, action)
    } else {
      ChooseBaseModal.showModal(runners, action)
      .then(function(modal) {
        modal.close.then(function(runners) {
          if(!runners) return;
          GameState.update(runners, action)
        });
      });
    }
  }

  vm.homeTeam = GameSettings.homeTeam
  vm.awayTeam = GameSettings.awayTeam
  vm.innings = GameSettings.innings
  vm.state = GameState // needed?
  vm.nextInning = function() { GameState.nextInning() }

  $scope.$watch(function watchGameState() {
    return GameState._state.batter // sync at batter change
  }, function syncGameState() {
    vm.outs = GameState.outs()
    vm.runs = GameState.teamBatting().runs
    vm.isInningTop = GameState.isInningTop()
    vm.inning = GameState.inning()
    vm.pitcher = GameState.pitcher()
    vm.batter = GameState.batter()
    vm.inningHalf = GameState.inningHalf()
    vm.runners = GameState.runners()
  })

  GameState.setInning(1,true)
})
