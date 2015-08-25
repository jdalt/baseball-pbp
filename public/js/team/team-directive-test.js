describe('team Directive', function() {
  var scope, elem
  var team

  beforeEach(inject(function() {
    scope = $rootScope.$new()
    team = { name: "Mud Hens" }
  }))

  function compile() {
    var tmpl = '<div team home-team="homeTeam"></div>'
    _.defaults(scope, {
      homeTeam: team
    })
    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  it('should display name of home team', function() {
    compile()
    expect(elem.text()).toContain("Mud Hens")
  })
})
