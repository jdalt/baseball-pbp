describe('AdvanceRunnersCtrl', function() {

  var scope, elem, ctrl

  function buildController(action) {
    inject(function() {
      scope = $rootScope.$new()
      ctrl = $controller('AdvanceRunnersCtrl', { $scope: scope, close: {}, action: action, runners: {} });
    })
    scope.$digest()
  }

  describe('smoke', function() {
    it('should put action on controller', function() {
      action = { outs: 1 }
      buildController(action)
      expect(ctrl.action.outs).toEqual(1)
    })
  })

})
