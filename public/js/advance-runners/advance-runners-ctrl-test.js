describe('AdvanceRunnersCtrl', function() {
  var scope
  var elem

  beforeEach(inject(function() {
    scope = $rootScope.$new()
  }))

  function compile() {
    var tmpl = '<div><span id="smoke-test"></span></div>'

    // _.defaults(scope, { })
    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  it('should compile', function() {
    compile()
    expect(getElem('#smoke-test').length).toEqual(1)
  })

  function getElem(selector) {
    return elem.find(selector).eq(0)
  }

})
