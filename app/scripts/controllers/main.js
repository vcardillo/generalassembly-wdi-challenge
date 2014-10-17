'use strict';

/**
 * @ngdoc function
 * @name yeomanAngularTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanAngularTestApp
 */
angular.module('yeomanAngularTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
