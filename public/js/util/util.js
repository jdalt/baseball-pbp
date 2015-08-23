(function() {
angular.module('util')
  .factory('_', function($window) {
    var _ = _ || $window._;
    return _;
  })
})();

angular.module('util')
.factory('TemplateUtil', function() {
  return {
    url: function(path) {
      return ['/js', path].join('/')
    }
  }
});
