(function () {
  'use strict';


  var SermonVideoController = function($scope, $sce,  SermonService) {
  	function youtubeurlid(url) {
  		return url.replace("https://www.youtube.com/watch?v=", "");
  	}
    // $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube)\.com(/.*)?$', 'self']);
    SermonService.getSermon(function(sermon){
      $scope.youtube = $sce.trustAsHtml('<iframe width="700" height="500" src="//www.youtube.com/embed/' + youtubeurlid(sermon.media.youtube) + '" frameborder="0" allowfullscreen></iframe>');
      $scope.selectedSermon = sermon;
    });
  }
  SermonVideoController.$inject = ['$scope', '$sce', 'SermonService'];
  angular.module('lodcWebApp').controller('SermonVideoController', SermonVideoController);

})();  
