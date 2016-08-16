'use strict';

/**
 * @ngdoc overview
 * @name lodcWebApp
 * @description
 * # lodcWebApp
 *
 * Main module of the application.
 */
angular
  .module('lodcWebApp', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ]).config(config).run(run);

config.$inject = ['$routeProvider', 'RestangularProvider', '$stateProvider', '$urlRouterProvider'];

function config($routeProvider, RestangularProvider, $stateProvider, $urlRouterProvider) {
  var newBaseUrl = "http://0.0.0.0:3000/api/api";
  $urlRouterProvider.otherwise("/main");
  $stateProvider.state('main', {
    url: "/main",
    templateUrl: "views/main.view.html",
    controller:"RecentSermonController"
  }).state("sermons", {
    url:"/sermons",
    templateUrl: "views/sermon.view.html",
    controller: "SermonListController"
  }).state("events", {
    url:"/events",
    templateUrl: "views/event.view.html",
    controller: "EventListController"
  }).state("contact",{
    url:"/contact",
    templateUrl: "views/contact.view.html"
  }).state("sermons.video", {
    url:"/video",
    templateUrl: "views/sermonvideo.view.html",
    controller:"SermonVideoController"
  }).state("news", {
    url:"/news",
    templateUrl: "views/news.view.html",
    controller:"NewsController"
  });
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'views/main.html',
  //     controller: 'MainCtrl',
  //     controllerAs: 'main'
  //   })
  //   .when('/about', {
  //     templateUrl: 'views/about.html',
  //     controller: 'AboutCtrl',
  //     controllerAs: 'about'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });
  RestangularProvider.setBaseUrl(newBaseUrl);
}

function run($rootScope) {

}
