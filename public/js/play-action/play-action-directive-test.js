describe('PlayActionDirective', function() {
  var scope
  var elem

  beforeEach(inject(function() {
    scope = $rootScope.$new()
  }))

  function compile() {
    var tmpl = "<div play-action></div>"

    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  it('should compile', function() {
    compile()
    expect(elem.text()).toContain("Smoke")
  })
})

