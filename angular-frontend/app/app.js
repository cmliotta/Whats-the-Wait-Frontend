// 'use strict';
var restaurantApp = angular.module('restaurantApp', ['ngRoute', 'ngStorage']);

restaurantApp.config(function($routeProvider) {
  $routeProvider
  .when('/',
  {
    templateUrl: 'js/home/home.html',
    controller: 'HomeController'
  })
  .when('/home',
  {
    templateUrl: 'js/home/home.html',
    controller: 'HomeController'
  })
  .when('/restaurant_registration',
  {
    templateUrl: 'js/restaurant/restaurant_registration.html',
    controller: 'restaurantAuthController'
  })
  .when('/restaurant_signin',
  {
    templateUrl: 'js/restaurantAuth/restaurant_signin.html',
    controller: 'restaurantAuthController'
  })
  .when('/restaurant_main',
  {
    templateUrl: 'js/restaurant/main.html',
    controller: 'restaurantMainController'
  })
  .when('/patron_registration',
  {
    templateUrl: 'js/patron/patron_registration.html',
    controller: 'PatronRegistrationController'
  })
  .when('/patron_signin',
  {
    templateUrl:'js/patronAuth/patron_signin.html',
    controller: 'patronAuthController'
  })
  .when('/patron_main/:id',
  {
    templateUrl: 'js/patron/main.html',
    controller: 'patronMainController'
  })
  // .otherwise({redirectTo: '/home'});
});

restaurantApp.controller('HomeController', function() {});

restaurantApp.controller('RestaurantRegistrationController', function($scope, $http, $location) {
  $scope.addRestaurant = function(firstName, lastName, email, restaurantName, phoneNumber, password, city, state, zip) {

    var newRestaurant = { first_name: firstName, last_name: lastName, email: email, restaurant_name: restaurantName, phone: phone, password: password, city: city, state: state, zip: zip };

    $http.post('https://localhost:3000/', newRestaurant)
      .success(function() {
        $location.path('/restaurant/main');
      })
  };
});

// restaurantApp.controller('restaurantSignInController', function($scope, $http, $location, $window) {
//   $scope.message = '';
//   $scope.user = {email: '', password: ''};

//   var urlBase = ""

//   $scope.loginRestaurant = function() {

//     $http.post('http://locahost:3000/restaurants', $scope.restaurant)
//       .success(function (data, status, headers, config) {
//         console.log(data)
//         console.log(data.auth_token)
//         $window.sessionStorage.token = data.auth_token;
//         $scope.message = 'Welcome';
//       })
//       .error(function (data, status, headers, config) {
//         // Erase the token if the user fails to log in
//         delete $window.sessionStorage.token;
//         $scope.message = 'Error: Invalid user or password';
//       });
//   };

//   $scope.logout = function () {
//     alert('hi')
//     delete $window.sessionStorage.token;
//     $location.path("/");
//   };
// });


// restaurantApp.controller('PatronRegistrationController', function($scope, $http, $location) {
//   $scope.addUser = function(firstName, lastName, email, phoneNumber, password) {

//     var newUser = {first_name: firstName, last_name: lastName, email: email, cell_phone: phoneNumber, password: password};

//     $http.post('https://', newUser)
//       .success(function() {
//         $location.path('/Patron/main');
//       })
//   };
// });

// restaurantApp.controller('PatronSignInController', function($scope, $http, $location) {
//   $scope.validatePatron = function(cellPhone, password) {
//     var patron = {cell_phone: cellPhone, password: password};

//     $http.post('https://locahost:3000/patron_signin', patron)
//       .success(function() {
//         $location.path('/restaurant/main');
//       })
//   };
// });

// restaurantApp.controller('PatronMainController', function($scope, $http) {
//   $scope.waitInfo = [];
//   $http.get('https://')
//     .success(function(data) {
//       waitInfo.push(data[x]);
//     })
// });

// restaurantApp.factory('AuthInterceptor', function ($rootScope, $q, $window) {
//   return {
//     request: function (config) {
//       config.headers = config.headers || {};
//       if ($window.sessionStorage.token) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//       }
//       return config;
//     },
//     response: function (response) {
//       if (response.status === 401) {
//         // handle the case where the user is not authenticated
//       }
//       return response || $q.when(response);
//     }
//   };
// });

// Auth stuff
// AuthToken Service to store token in localstorage
// restaurantApp.factory('AuthToken', ['$localStorage', function($localStorage) {
//   return {
//     set: function (data) {
//       $localStorage.token = data.token;
//       if (data.patronId) {
//         $localStorage.patronId = data.patronId;
//       } else if (data.restaurantId) {
//         $localStorage.restaurantId = data.restaurantId;
//       }
//     },

//     get: function () {
//       return $localStorage.token;
//     }
//   }
// }]);

  // AuthInterceptor to attach token to header for every request
// restaurantApp.factory('AuthInterceptor', ['$q', '$injector', function ($q, $injector) {
//     return {
//       request: function(config) {
//         var AuthToken = $injector.get("AuthToken");
//         var token = AuthToken.get();
//         config.headers = config.headers || {};
//         if (token) {
//           config.headers.Authorization = "Bearer " + token;
//         }
//         return config || $q.when(config);
//       }
//     };
//   }])

// // Checks to see if user is logged in or not
// .factory('AuthenticationFactory', function($localStorage) {
//   var auth = {
//     isLogged: false,
//     check: function() {
//       if ($localStorage.token && $localStorage.user) {
//         this.isLogged = true;
//       } else {
//         this.isLogged = false;
//         delete $localStorage.user;
//         delete $localStorage.token;
//       }
//     }
//   };

// Example of handling the response that includes the token
// restaurantApp.factory('UserAuth', function($localStorage, $location, $http, AuthenticationFactory))
// login: function (userForm) {
//         var d = $q.defer();

//         $http.post('http://localhost:3000/api/login', {
//           cell_phone: userForm.cellPhone,
//           password: userForm.password
//         }).success(function (response) {
//           AuthToken.set(response);
//           AuthFactory.isLogged = true;
//           d.resolve(response);
//         }).error(function (response) {
//           d.reject(response.error);
//         });
//         return d.promise;
//       },


restaurantApp.controller('PatronMainController', function($scope, $interval, $http, $timeout) {
    $http.get('http://localhost:3000/patrons/1')
    .success(function(data) {
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 00
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
      // console.log($scope.parties_ahead)
    })
    .error(function(data){
      console.log(data)
    })
    $scope.onTimeout = function(){
      if ($scope.waitInfo.seconds > 0) {
        $scope.waitInfo.seconds--;
        if ($scope.waitInfo.seconds < 10) {
          $scope.waitInfo.seconds = '0' + $scope.waitInfo.seconds;
        }
      } else if($scope.waitInfo.seconds == 0 && $scope.waitInfo.minutes > 0) {
        $scope.waitInfo.seconds = 59
        $scope.waitInfo.minutes--
      } else {
        angular.element(document.querySelector('#container'))[0].innerHTML = "You're Table is ready!"
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
})
