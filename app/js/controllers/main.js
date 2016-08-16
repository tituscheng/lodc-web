(function () {
  'use strict';


  var RecentSermonController = function($scope, $sce,  SermonService) {
  	function youtubeimage(url) {
  		return url.replace("https://www.youtube.com/watch?v=", "https://img.youtube.com/vi/") + "/0.jpg";
  	}
  	SermonService.GetMostRecent(function(response){
  		for(var i = 0; i < response.length; i++) {
  			var sermon = response[i];
  			var youtubelink = youtubeimage(sermon.media.youtube);
  			
  			sermon.media.youtube = youtubelink;
  		}
  		$scope.recentsermons = response;
  	});
  }
  RecentSermonController.$inject = ['$scope', '$sce', 'SermonService'];
  angular.module('lodcWebApp').controller('RecentSermonController', RecentSermonController);

})();  
