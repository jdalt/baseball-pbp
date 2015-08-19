angular.module('baseball-pbp')
.config(function($translateProvider) {
  $translateProvider.translations('en', {
    'BASE_-1': 'Out',
    'BASE_0': 'Batter',
    'BASE_1': '1st',
    'BASE_2': '2nd',
    'BASE_3': '3rd',
    'BASE_4': 'Home'
  })
  $translateProvider.preferredLanguage('en');
});
