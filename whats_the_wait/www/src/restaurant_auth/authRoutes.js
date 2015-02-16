angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('restaurantLogin', {
    url           : "/restaurantLogin",
    templateUrl   : "src/restaurant_auth/loginPage.html",
    controller    : 'restaurantAuthCtrl'
  })

  .state('restaurantSignup', {
    url           : "/restaurantSignup",
    templateUrl   : "src/restaurant_auth/signupPage.html",
    controller    : 'restaurantAuthCtrl'
  })

  $urlRouterProvider.otherwise('/')
});
