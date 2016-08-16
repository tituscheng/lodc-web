(function () {
    'use strict';

    angular
        .module('lodcWebApp')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', 'Restangular'];
    function EventService($http, Restangular) {
        var selectedSermon = {};

        var service = Restangular.all("event");  


        function Get(callback) {
            service.one("get").get().then(function(events){
                var allevents = events.data.events;
                for(var i = 0; i < allevents.length; i++) {
                    var date = new Date(allevents[i].startdate);
                    allevents[i].day = date.getDay() ;
                    allevents[i].month = date.getMonth();
                }
                callback(allevents);
            })
        }

        service.Get = Get;

        return service;
    }

})();
