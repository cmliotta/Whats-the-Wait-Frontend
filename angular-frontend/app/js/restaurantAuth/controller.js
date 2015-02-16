restaurantApp.controller('restaurantAuthController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {
    $scope.loginRestaurant = false;
    // $scope.signup = false;
    $scope.message = '';
    $scope.restaurant = {email: '', password: ''};

    var urlBase = ""

    $scope.loginRestaurant = function () {
      $http.post('http://localhost:3000/restaurants/login', $scope.restaurant)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.restaurant_token = data.token;
          $window.sessionStorage.id = data.id;
          console.log($window.sessionStorage);
          console.log(data);
          // set authservice to true (boolean isloggedin)
          $scope.message = 'Welcome';
          // $scope.loginRestaurant = '';
          $location.path('restaurant_main')
        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;

          // set authservice to false
          // Handle login errors here
          $scope.message = 'Error: Invalid user or password';
        });
    };
     $scope.logout = function () {
        // change back to false authservice
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user_id;
    };
  }]);
