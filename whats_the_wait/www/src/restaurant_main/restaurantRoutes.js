angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('restaurantMain', {
    url           : "/restaurantMain",
    templateUrl   : "src/restaurant_main/restaurantMain.html",
    controller    : 'restaurantMainCtrl'
  })

  $urlRouterProvider.otherwise('/')
});
