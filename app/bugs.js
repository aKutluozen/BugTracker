'use strict';
// Declare app level module which depends on views, and components
angular.module('myBugs.bugs', [
    "ngRoute", "firebase", "ngSanitize", "ngCsv"
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when("/bugs", {
        templateUrl: "view/bugs.html"
        , controller: "BugsController"
    }).when("/manageBugs", {
        templateUrl: "view/manageBugs.html"
        , controller: "BugsController"
    }).when("/login", {
        templateUrl: "view/login.html"
    })
}])