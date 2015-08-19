describe('AdvanceRunnersCtrl', function() {
  var scope, elem, ctrl
  var PA

  beforeEach(function() {
    inject(function(playActions) {
      PA = playActions
    })
  })

  function buildController(action, runners) {
    inject(function(playActions) {
      scope = $rootScope.$new()
      PA = playActions
      ctrl = $controller('AdvanceRunnersCtrl', { $scope: scope, close: {}, action: action, runners: runners });
    })
    scope.$digest()
  }

  function getAction(abbrev) {
    return _.findWhere(PA, { abbrev: abbrev })
  }

  describe('on HR', function() {
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

      buildController(action, runners)
      console.log('ctrl.runners', ctrl.runnerPrefs)

      expect(ctrl.runnerPrefs[0].end).toBe(4)
      expect(ctrl.runnerPrefs[1].end).toBe(4)
    })
  })

})
