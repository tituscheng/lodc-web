(function () {
  'use strict';


  var NewsController = function($scope, NewsService) {

  	NewsService.Get(function(response){
  		$scope.news = response;
  	});

  }
  NewsController.$inject = ['$scope', 'NewsService'];
  angular.module('lodcWebApp').controller('NewsController', NewsController);

})();  
