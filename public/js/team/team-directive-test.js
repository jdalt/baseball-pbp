describe('team Directive', function() {
  var scope, elem

  beforeEach(inject(function() {
    scope = $rootScope.$new()
  }))

  function compile() {
    var tmpl = "<div team home-away='away'></div>"
    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  it('should compile', function() {
    compile()
    expect(elem.text()).toContain("Leland Giants")
  })
})
