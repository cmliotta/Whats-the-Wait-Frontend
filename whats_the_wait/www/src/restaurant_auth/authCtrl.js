angular.module('restaurantApp')

.controller("restaurantAuthCtrl", ['restaurantAuthFactory', '$location', '$scope', function(restaurantAuthFactory, $location, $scope){
  var vm = this;

  console.log("restaurantAuthCtrl")

    $scope.restaurantLogin = function() {
      $location.path("/restaurantMain")
    }

}])
