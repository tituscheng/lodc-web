(function () {
  'use strict';


  var SermonListController = function($scope, SermonService) {
  	function youtubeimage(url) {
  		return url.replace("https://www.youtube.com/watch?v=", "https://img.youtube.com/vi/") + "/0.jpg";
  	}

  	SermonService.Get(function(response){
  		for(var i = 0; i < response.length; i++) {
  			var sermon = response[i];
  			var youtubeimglink = youtubeimage(sermon.media.youtube);
  			
  			sermon.media.img = youtubeimglink;
  		}
  		$scope.sermons = response;
  	});

    $scope.shouldDisplayVideo = false;

    $scope.select = function(chosenSermon) {
      $scope.shouldDisplayVideo = true;
      SermonService.setSermon(chosenSermon);
    }
  }
  SermonListController.$inject = ['$scope', 'SermonService'];
  angular.module('lodcWebApp').controller('SermonListController', SermonListController);

})();  
