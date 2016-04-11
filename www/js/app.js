// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'angularMoment',
  'app.controllers',
  'app.services',
  'user.controllers',
  'user.services',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'youtube-embed'
])

.run(function($ionicPlatform, $rootScope, $ionicConfig, $timeout, $cordovaGeolocation) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    
  });
  

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });
  

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {

        //debugger;

        console.log('$stateChangeError ' + error && (error.debug || error.message || error));

        // if the error is "noUser" the go to login state
        if (error && error.error === "noUser") {
            event.preventDefault();

            $state.go('auth.login', {});
        }
    });
  
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (sessionStorage.restorestate == "true") {
        $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
        sessionStorage.restorestate = false;
    }
  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function (event) {
      $rootScope.$broadcast('savestate');
  };
  
  $rootScope.miles = 5;
  
  //css folder one file delete get that from the master repo

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  console.log("in main run function");
       $cordovaGeolocation
         .getCurrentPosition(posOptions)
           .then(function (position) {
             console.log(position.coords.latitude);
             console.log(position.coords.longitude);
             $rootScope.coordinates = {
               "lat": position.coords.latitude,
               "long": position.coords.longitude
             };
             
             $rootScope.lat = position.coords.latitude;
            
           }, function(err) {
         // error
           });
        
 

})

.value('ParseConfiguration', {
        applicationId: "y7fkUE1YFO489X0F38bKxLvVorVf1cjLkQopJgGk",
        javascriptKey: "pcvflPimQ7TRD8lNoal9BcDSkoq2O9Ih3USsvDW6"
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html",
    controller: 'ButtonCtrl'
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })
  
  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignUpCtrl'
  })

//App Controller starts here 

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

//Creating cards
  .state('app.create-card', {
    url: "/layouts/create-card",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/create-card.html",
        controller: 'CreateCardCtrl'
      }
    }
  })
  
//Idea waves
  .state('app.tinder-cards', {
    url: "/layouts/tinder-cards",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/tinder-cards.html",
        controller: 'TinderCardsCtrl'
      }
    }
  })

//Bookmark contorller
  .state('app.bookmarks', {
    url: "/layouts/bookmarks",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/bookmarks.html",
        controller: 'BookmarksCtrl'
      }
    }
  })

//Inbox contorller
  .state('app.inbox', {
    url: "/layouts/inbox",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/inbox.html",
        controller: 'InboxCtrl'
      }
    }
  })
  
//Messages controller
  .state('app.messages', {
    url: "/layouts/inbox/:messageId",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/messages.html",
        controller: 'MessageCtrl'
      }
    }
  })

//Settings controller
  .state('app.geo', {
    url: "/layouts/geo",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/settings.html",
        controller: 'GeoCtrl'
      }
    }
  })
  
  
//Profile controller
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html"
      }
    }
  })


;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/walkthrough');
});
