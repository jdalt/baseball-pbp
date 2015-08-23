'use strict'

// Template:
//   https://github.com/js-data/js-data-angular-mocks/blob/master/karma.start.js

var $compile, $rootScope, $q, $log, $controller, $filter

beforeEach(function () {
  module('baseball-pbp')
  module('templates')
})

beforeEach(function() {
  inject(function (_$compile_, _$rootScope_, _$q_, _$log_, _$controller_, _$filter_) {
    // Setup global mocks
    $compile = _$compile_
    $rootScope = _$rootScope_
    $controller = _$controller_
    $q = _$q_
    $log = _$log_
    $filter = _$filter_
  })
})

// Clean up after each test
afterEach(function () {
  $log.reset()
})
