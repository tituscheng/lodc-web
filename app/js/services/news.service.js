(function () {
    'use strict';

    angular
        .module('lodcWebApp')
        .factory('NewsService', NewsService);

    NewsService.$inject = ['$http', 'Restangular'];
    function NewsService($http, Restangular) {
        var selectedSermon = {};

        var service = Restangular.all("news");  


        function Get(callback) {
            service.one("get").get().then(function(news){
                var allnews = news.data;
                for(var i = 0; i < allnews.length; i++) {
                    var date = new Date(allnews[i].date);
                    allnews[i].day = date.getDay();
                    allnews[i].month = date.getMonth();
                }
                callback(allnews);
            })
        }

        service.Get = Get;

        return service;
    }

})();
