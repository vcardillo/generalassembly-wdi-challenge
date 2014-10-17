'use strict';

/**
 * @ngdoc function
 * @name yeomanAngularTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanAngularTestApp
 */
angular.module('yeomanAngularTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
