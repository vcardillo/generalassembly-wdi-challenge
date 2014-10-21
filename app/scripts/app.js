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
  };


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
          that.getDetails(imdbID, this);
        });

        $('#search-results-items').append(domItem);
      }
    }
    // No results found
    else if (data.hasOwnProperty('Response') && data.Response == 'False') {
      $('#search-results-items').html('<span class="label label-info">'+data.Error+'</span>');
    }
    // Some other yet-unknown case
    else {
      $('#search-results-items').text('An unknown error has occurred (panic now).');
    }
  };


  /**
   * Get movie details
   */
  that.getDetails = function(id, movie) {
    //console.log(id);
    $(movie).find(".search-result-detail").removeClass('hidden');
    $(movie).css("cursor", "default");

    var src = "http://www.omdbapi.com/?i="+id+"&callback=omdb.detailSuccess";
    $("head").append('<script src="'+src+'"></script>');
  };


  /**
   * Get movie details success
   */
  that.detailSuccess = function(movieDetails) {
    //console.log(movieDetails);
    var movie = $("[imdbid='"+movieDetails.imdbID+"']"); // Find the movie in the dom
    var detail = $(movie).find('.result-detail'); // Find its detail container in the dom

    // Populate with data
    $(detail).find('img.mv-poster').attr("src", movieDetails.Poster);
    $(detail).find('i.mv-rated').text(movieDetails.Rated);
    $(detail).find('i.mv-released').text(movieDetails.Released);
    $(detail).find('i.mv-runtime').text(movieDetails.Runtime);
    $(detail).find('i.mv-language').text(movieDetails.Language);
    $(detail).find('i.mv-genre').text(movieDetails.Genre);
    $(detail).find('i.mv-director').text(movieDetails.Director);
    $(detail).find('i.mv-writer').text(movieDetails.Writer);
    $(detail).find('i.mv-actors').text(movieDetails.Actors);
    $(detail).find('i.mv-plot').text(movieDetails.Plot);
    $(detail).find('i.mv-country').text(movieDetails.Country);
    $(detail).find('i.mv-awards').text(movieDetails.Awards);
    $(detail).find('i.mv-metascore').text(movieDetails.Metascore);
    $(detail).find('i.mv-imdbRating').text(movieDetails.imdbRating);
    $(detail).find('i.mv-imdbVotes').text(movieDetails.imdbVotes);

    $(movie).find('p.result-detail-loader').remove();
    detail.removeClass('hidden');
  };


  return that;
})();

