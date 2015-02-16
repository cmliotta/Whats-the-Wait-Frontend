angular.module('restaurantApp')

.factory("restaurantFactory", ['$http', '$state', function($http, $state){

  return function hi (){
    console.log("restaurantFactory")
  }

}])
