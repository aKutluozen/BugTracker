'use strict';
// Declare app level module which depends on views, and components
angular.module('myBugs', [
  'ngRoute', "firebase", 'myBugs.bugs', 'ngSanitize', 'ngCsv' 
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/bugs'
    });
}]);