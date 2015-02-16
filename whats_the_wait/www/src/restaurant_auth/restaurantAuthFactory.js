angular.module('restaurantApp')

.factory("restaurantAuthFactory", ['$http', '$state', function($http, $state){

  return function something (){
    console.log("restaurantAuthFactory")
  }

}])
