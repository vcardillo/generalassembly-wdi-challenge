'use strict';

/**
 * @ngdoc function
 * @name gaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gaApp
 */
angular.module('gaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('ul.nav li').removeClass("active");
    $('ul.nav li#nav-home').addClass("active");
  });
