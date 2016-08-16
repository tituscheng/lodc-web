(function () {
    'use strict';

    angular
        .module('lodcWebApp')
        .factory('SermonService', SermonService);

    SermonService.$inject = ['$http', 'Restangular'];
    function SermonService($http, Restangular) {
        var selectedSermon = {};

        var service = Restangular.all("sermon");  
        function GetDetail(asin, callback){
            service.one('{asin}').get({'asin': asin}).then(function(data){
                ResponseService.Process(data, callback);
            });
        }

        function GetMostRecent(callback) {
            service.one("recent").get().then(function(sermons){
                callback(sermons);
            })
        }

        function Get(callback) {
            service.one("get").get().then(function(sermons){
                var allsermons = sermons.data.sermons;
                callback(allsermons);
            })
        }

        function setSermon(theSermon) {
            selectedSermon = theSermon;
        }

        function getSermon(callback) {
            callback(selectedSermon);
        }

        service.GetMostRecent = GetMostRecent;
        service.Get = Get;
        service.setSermon = setSermon;
        service.getSermon = getSermon;
        // service.GetDetail = GetDetail;
        // service.Update= Update;
        // service.Create= Create;
        // service.Delete= Delete;

        return service;
    }

})();
