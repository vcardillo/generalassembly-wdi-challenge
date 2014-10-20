'use strict';

/**
 * @ngdoc function
 * @name gaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gaApp
 */
angular.module('gaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('ul.nav li').removeClass("active");
    $('ul.nav li#nav-about').addClass("active");
  });
