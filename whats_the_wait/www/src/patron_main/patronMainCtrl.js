angular.module('restaurantApp')

.controller('patronMainCtrl', ['patronFactory', '$scope', '$http', '$timeout', '$location', function(patronAuthFactory, $scope, $http, $timeout, $location) {

console.log("patronMainCtrl")
 var vm = this

$http.get('http://localhost:3000/patrons/2')
    .success(function(data) {
      console.log(data)
      $location.path("/patronMain")
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 0
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
    })
    .error(function(data){
      $location.path("/noWaitList")
      console.log(data)
    })

    $scope.noWaitList = function() {
      $location.path("/noWaitList")
    }

    setInterval(function() {
      $http.get('http://localhost:3000/restaurants/' + $scope.waitInfo.restaurant_id + '/reservations/' + $scope.waitInfo.id + '/send_alert')
        .success(function(response)  {
          if (response.message == "ready"){
            $location.path("/tableReady")
          }
        })
        .error(function(response)  {
          console.log(response)
        })
    }, 60000)

// updates every minute when restaurant adds/subtracts minutes from reservations
    setInterval(function() {
      $http.get('http://localhost:3000/patrons/2')
      .success(function(data){
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 0
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
      $location.path("/patronMain")
      }).error(function(data){
        $location.path("/noWaitList")
      })
    }, 60000)

    $scope.cancel = function(reservation) {
    $http.post('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/cancellation', reservation)
      .success(function(response)  {
        console.log(response)
    })
      .error(function(response){
        console.log(response)
      })
  }

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
        $location.path("/tableReady")
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
}])
