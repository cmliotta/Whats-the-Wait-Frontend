angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('patronMain', {
    url           : "/patronMain",
    templateUrl   : "src/patron_main/patronMain.html",
    controller    : 'patronAuthCtrl'
  })

  $urlRouterProvider.otherwise('/')
});
