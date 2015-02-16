var app = angular.module('restaurantApp', ['ionic', 'ui.router'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($urlRouterProvider, $httpProvider, $stateProvider) {

  $stateProvider

    .state('/', {
      url: "/",
      templateUrl: "landingPage.html"
    })

    $urlRouterProvider.otherwise('/')
  })




