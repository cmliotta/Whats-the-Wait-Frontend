restaurantApp.controller('patronAuthController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {
    $scope.loginPatron = false;
    // $scope.signup = false;
    $scope.message = '';
    $scope.patron = {cell_phone: '', password: ''};

    var urlBase = ""

    $scope.loginPatron = function () {
      $http.post('http://localhost:3000/patrons/login', $scope.patron)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.patron_token = data.token;
          $window.sessionStorage.id = data.id;
          console.log($window.sessionStorage);
          console.log(data);
          // set authservice to true (boolean isloggedin)
          $scope.message = 'Welcome';
          // $scope.loginRestaurant = '';
          $location.path('patron_main/' + data.id)
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
