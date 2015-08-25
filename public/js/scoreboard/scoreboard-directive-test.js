describe('Scoreboard Directive', function() {
  var scope, elem
  var innings, homeTeam, awayTeam

  beforeEach(inject(function() {
    scope = $rootScope.$new()
    innings = [{number: 1},{number: 2}]
    awayTeam = { name: "Senators", runs: 0 }
    homeTeam = { name: "Generals", runs: 3 }
  }))

  function compile() {
    var tmpl = '<div scoreboard home-team="homeTeam" away-team="awayTeam"></div>'

    _.defaults(scope, {
      innings: innings,
      awayTeam: awayTeam,
      homeTeam: homeTeam
    })

    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  it('should include both team names', function() {
    compile()
    expect(elem.text()).toContain("Generals")
    expect(elem.text()).toContain("Senators")
  })
})

