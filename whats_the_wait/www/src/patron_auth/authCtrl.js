angular.module('restaurantApp')

.controller("patronAuthCtrl", ['patronAuthFactory', '$location', '$scope', function(patronAuthFactory, $location, $scope){
  var vm = this;

  console.log("patronAuthCtrl")

    $scope.patronLogin = function() {
      $location.path("/patronMain")
    }

//    $http.post("htpp://localhost/signin")
//      .success(function(response){
//         if (response.) {
//           $location.path("/patronMain/" + response.user_id)
//         }
//      })
}])
