angular.module('restaurantApp')

.controller('patronMainCtrl', ['patronFactory', '$scope', '$http', '$timeout', '$location', function(patronAuthFactory, $scope, $http, $timeout, $location) {

$http.get('http://localhost:3000/patrons/2')
    .success(function(data) {
      console.log(data)
      $location.path("/patronMain")
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 0 + '0'
      $scope.waitInfo.range = $scope.waitInfo.minutes + 5
      $scope.waitInfo.rangeSeconds = 0 + '0'
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
    }, 1000)

    setInterval(function() {
      if($scope.waitInfo.minutes > 0) {
        $http.get('http://localhost:3000/patrons/2')
        .success(function(data){
        $scope.waitInfo = data.waitInfo
        $scope.waitInfo.seconds = 0 + '0'
        $scope.waitInfo.range = $scope.waitInfo.minutes + 5
        $scope.waitInfo.rangeSeconds = 0 + '0'
        $scope.restaurant = data.restaurant
        $scope.parties_ahead = data.parties_ahead
        $location.path("/patronMain")
        }).error(function(data){
          $location.path("/noWaitList")
        })
      }
    }, 60000)


    $scope.onTimeout = function(){
      if ($scope.waitInfo.seconds > 0) {
        $scope.waitInfo.seconds--;
        $scope.waitInfo.rangeSeconds--;
        if ($scope.waitInfo.seconds < 10) {
          $scope.waitInfo.seconds = '0' + $scope.waitInfo.seconds;
          $scope.waitInfo.rangeSeconds = '0' + $scope.waitInfo.rangeSeconds;
        }
      } else if($scope.waitInfo.seconds == 0 && $scope.waitInfo.minutes > 0) {
        $scope.waitInfo.seconds = 59;
        $scope.waitInfo.rangeSeconds = 59;
        $scope.waitInfo.minutes--;
        $scope.waitInfo.range--;
      } else if ($scope.waitInfo.rangeSeconds > 0) {
          $scope.waitInfo.rangeSeconds--;
          if ($scope.waitInfo.rangeSeconds < 10) {
            $scope.waitInfo.rangeSeconds = '0' + $scope.waitInfo.rangeSeconds;
        }
      } else if($scope.waitInfo.rangeSeconds == 0 && $scope.waitInfo.range > 0) {
          $scope.waitInfo.range--;
          $scope.waitInfo.rangeSeconds = 59;
      } else {
         $location.path("/tableReady")
      }
      mytimeout = $timeout($scope.onTimeout,1000);
      }
    var mytimeout = $timeout($scope.onTimeout,1000);

    // need to change for patron
    $scope.confirmCancelReservation = function() {
      $http.post('http://localhost:3000/restaurants/' + $scope.cancelReservation.restaurant_id + '/cancellation', $scope.cancelReservation)
        .success(function(response)  {
          delete $scope.cancelReservation;
        })
    }

    $scope.dontCancelReservation = function() {
      delete $scope.cancelReservation;
    }

   $scope.initCancelReservation = function(waitInfo) {
    $scope.cancelReservation = angular.copy(waitInfo);
    }

}])
