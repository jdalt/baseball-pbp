describe('BaseballDiamond Directive', function() {
  var scope
  var elem

  beforeEach(inject(function() {
    scope = $rootScope.$new()
  }))

  function compile() {
    var tmpl = "<div></div>"

    // Doesn't seem like phantom can process svg
    elem = $compile(tmpl)(scope)
    scope.$digest()
  }

  xit('should compile', function() {
    compile()
  })
})

