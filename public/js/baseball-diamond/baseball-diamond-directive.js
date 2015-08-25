angular.module('baseball-diamond')
.directive('baseballDiamond', function(TemplateUtil) {
  return {
    allow: 'AE',
    scope: {},
    templateUrl: TemplateUtil.url('baseball-diamond/baseball-diamond.tmpl.svg'),
    controller: function($scope) {

    }
  }
})
