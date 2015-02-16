angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('patronLogin', {
    url           : "/patronLogin",
    templateUrl   : "src/patron_auth/loginPage.html",
    controller    : 'patronAuthCtrl'
  })

  // .state('patronSignup', {
  //   url           : "/patronSignup",
  //   templateUrl   : "patron_auth/signupPage.html",
  //   controller    : 'authCtrl'
  // })

  $urlRouterProvider.otherwise('/')

});