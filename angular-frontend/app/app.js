// 'use strict';

var restaurantApp = angular.module('restaurantApp', ['ngRoute']);

restaurantApp.config(function($routeProvider) {
  $routeProvider
  .when('/',
  {
    templateUrl: 'views/home/home.html',
    controller: 'HomeController'
  })
  .when('/home',
  {
    templateUrl: 'views/home/home.html',
    controller: 'HomeController'
  })
  .when('/restaurant_registration',
  {
    templateUrl: 'views/restaurant/registration.html',
    controller: 'RestaurantRegistrationController'
  })
  .when('/restaurant_signin',
  {
    templateUrl: 'views/restaurant/signin.html',
    controller: 'RestaurantSignInController'
  })
  .when('/restaurant_main',
  {
    templateUrl: 'views/restaurant/main.html',
    controller: 'RestaurantMainController'
  })
  .when('/patron_registration',
  {
    templateUrl: 'views/patron/registration.html',
    controller: 'PatronRegistrationController'
  })
  .when('/patron_signin',
  {
    templateUrl: 'views/patron/signin.html',
    controller: 'PatronSignInController'
  })
  .when('/patron_main',
  {
    templateUrl: 'views/patron/main.html',
    controller: 'PatronMainController'
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

restaurantApp.controller('RestaurantSignInController', function($scope, $http, $location) {
  $scope.validateRestaurant = function(email, password) {
    var restaurant = {email: email, password: password};

    $http.post('https://', restaurant)
      .success(function() {
        $location.path('/restaurant_main');
      })
  };
});

restaurantApp.controller('RestaurantMainController', function($scope, $http) {
  $scope.restaurant;
  $scope.reservations = [];
  $http.get('http://localhost:3000/restaurants/1/reservations')
    .success(function(data) {
      console.log(data)
      $scope.restaurant = data.restaurant;
      for (var x in data.reservations) {
        $scope.reservations.push(data.reservations[x]);
      }
    })

  $scope.showAddForm = function() {
    $scope.addForm = true;
  };

  $scope.addReservation = function(cellPhone, numberOfPeople, minutes) {
    var newReservation = {cell_phone: cellPhone, party_size: numberOfPeople, minutes: minutes};

    $http.post('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations', newReservation)
      .success(function(data) {
        $scope.reservations.push(data);
        $scope.addForm = false;
      })
  }

  $scope.cancelReservation = function(){
    $scope.addForm = false;
  }

  $scope.addTime = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/add_time',
      data: {party_size: $scope.party_size}
    })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.party_size == 2) {
            if($scope.reservations[r].party_size <= 2) {
              $scope.reservations[r].minutes += 5;
            }
          }
          else if($scope.party_size == 4) {
            if($scope.reservations[r].party_size >= 3) {
              $scope.reservations[r].minutes += 5;
            }
          }
        }
      })
  }

  $scope.subtractTime = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/subtract_time',
      data: {party_size: $scope.party_size}
    })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.party_size == 2) {
            if($scope.reservations[r].party_size <= 2) {
              $scope.reservations[r].minutes -= 5;
            }
          }
          else if($scope.party_size == 4) {
            if($scope.reservations[r].party_size >= 3) {
              $scope.reservations[r].minutes -= 5;
            }
          }
        }
      })
  }

  $scope.seated = function(reservation) {
    $http.delete('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id)
      .success(function()  {
        console.log(reservation)
        var index = $scope.reservations.indexOf(reservation)
        $scope.reservations.splice(index, 1)
      })
  }

  $scope.canceled = function(reservation) {
    $http.delete('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id)
      .success(function()  {
        console.log(reservation);
        var index = $scope.reservations.indexOf(reservation)
        $scope.reservations.splice(index, 1)
      })
  }

});
restaurantApp.controller('PatronRegistrationController', function($scope, $http, $location) {
  $scope.addUser = function(firstName, lastName, email, phoneNumber, password) {

    var newUser = {first_name: firstName, last_name: lastName, email: email, cell_phone: phoneNumber, password: password};

    $http.post('https://', newUser)
      .success(function() {
        $location.path('/Patron/main');
      })
  };
});
restaurantApp.controller('PatronSignInController', function($scope, $http, $location) {
  $scope.validateUser = function(email, password) {
    var user = {email: email, password: password};

    $http.post('https://', user)
      .success(function() {
        $location.path('/restaurant/main');
      })
  };
});

restaurantApp.controller('PatronMainController', function($scope, $http) {
  // $scope.waitInfo;
  $http.get('http://localhost:3000/patrons/1')
    .success(function(data) {
      $scope.waitInfo = data.waitInfo
      $scope.restaurant_name = data.restaurant_name
      $scope.parties_ahead = data.parties_ahead
      console.log($scope.parties_ahead)
    })
    .error(function(data){
      console.log(data)
    })
});




// CLOCK COUNTDOWN

// function Clock(selector) {
//   this.view = new Clock.View(selector);
//   this.model = new Clock.Model;
// }

// Clock.prototype.countDown = function (min) {
//     this.model.setTime(min);
//     this.view.render(this.model);
//     setTimeout(this.tickDown.bind(this), 1000);
// }

// Clock.prototype.tickDown = function () {
//     var shouldContinue = this.model.tickDown();
//     this.view.render(this.model);
//     if (shouldContinue) {
//         setTimeout(this.tickDown.bind(this), 1000);
//     }
// }

// Clock.Model = function() {
//     this.min = 0;
//     this.sec = 0;
// }

// Clock.Model.prototype.setTime = function(min) {
//     this.min = min;
// }

// Clock.Model.prototype.tickDown = function () {
//     if (this.sec <= 0) {
//         if (this.min <= 0) {
//             return false;
//         }
//         this.sec = 59;
//         this.min = this.min - 1;
//     } else {
//         this.sec = this.sec - 1;
//     }
//     return true;
// }

// Clock.View = function (selector) {
//     this.el = document.querySelector(selector);
// }

// Clock.View.prototype.render = function(obj) {
//     var sec = obj.sec;
//     if (sec < 10) {
//         sec = '0' + sec;
//     }
//     this.el.innerHTML = obj.min + ':' + sec;
// }

// var clock = new Clock('#test');

// clock.countDown(1);

