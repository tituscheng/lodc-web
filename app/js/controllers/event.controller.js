(function () {
  'use strict';


  var EventListController = function($scope, EventService) {

  	EventService.Get(function(response){
  		$scope.events = response;
  	});

  }
  EventListController.$inject = ['$scope', 'EventService'];
  angular.module('lodcWebApp').controller('EventListController', EventListController);

})();  
