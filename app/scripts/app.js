'use strict';

/**
 * @ngdoc overview
 * @name gaApp
 * @description
 * # gaApp
 *
 * Main module of the application.
 */
angular
  .module('gaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



// Make app in global space
var omdb = (function() {

  var that = {};

  /**
   * Search for a movie
   */
  that.search = function() {
    var phrase = $("#search-input").val();
    var src = "http://www.omdbapi.com/?s="+phrase+"&callback=omdb.searchSuccess";

    if (phrase == '') {
      $("#search-input-box").effect("shake");
      return;
    }

    $("#search-loading").removeClass("hidden");
    $('#search-results-items').empty();

    $("head").append('<script src="'+src+'"></script>');
  }


  /**
   * Search Success
   */
  that.searchSuccess = function(data) {
    //console.log(data);
    $("#search-loading").addClass("hidden");

    // Results found
    if (data.hasOwnProperty('Search')) {

      var results = data.Search;

      for (var i=0; i<results.length; i++) {
        var movie = results[i];

        // Build item from prototype
        var domItem = $("#mv-result-proto").clone();
        domItem.removeAttr("id");
        domItem.removeClass("hidden");
        domItem.attr("imdbID", movie.imdbID);
        domItem.find("h4").text(movie.Title);
        domItem.find(".mv-year").text(movie.Year);
        domItem.find(".mv-type").text(movie.Type);

        domItem.on("click", function() {
          var imdbID = $(this).attr("imdbID");
          that.getDetails(imdbID);
        });

        $('#search-results-items').append(domItem);
      }
    }
    // No results found
    else if (data.hasOwnProperty('Response') && data.Response == "False") {
      $('#search-results-items').html('<span class="label label-info">'+data.Error+'</span>');
    }
    // Some other yet-unknown case
    else {
      $('#search-results-items').text("An unknown error has occurred (panic now).");
    }
  }


  /**
   * Get movie details
   */
  that.getDetails = function(id) {
    console.log(id);
  }

  return that;
})();

