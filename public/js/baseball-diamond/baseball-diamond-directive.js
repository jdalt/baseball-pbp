angular.module('baseball-diamond')
.directive('baseballDiamond', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {},
    transclude: true,
    templateUrl: TemplateUtil.url('baseball-diamond/baseball-diamond.tmpl.svg'),
    controller: function($scope) {

    }
  }
})
