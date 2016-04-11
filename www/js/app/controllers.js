angular.module('app.controllers', [])

.controller('AuthCtrl', function($scope, $state, $ionicConfig, UserService) {
    
        console.log("in authctrl function");
        $scope.doLogoutAction = function () {
            UserService.logout().then(function () {

                // transition to next state
                $state.go('auth.login');

            }, function (_error) {
                alert("error logging in " + _error.debug);
            })
        
        };

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig, UserService, $state) {
    
        // console.log("in appctl function");
    
        // $scope.doLogoutAction = function () {
        //     UserService.logout().then(function () {

        //         // transition to next state
        //         $state.go('auth.login');

        //     }, function (_error) {
        //         alert("error logging in " + _error.debug);
        //     })
        
        // };
        
        $scope.$on('range:updated', function(event,data) {
            // you could inspect the data to see if what you care about changed, or just update your own scope
            //$scope.userInfo = User.getUserInfo()[0];
            console.log("range updated in App ctrl");
        });

})



//Profile controller
.controller('ButtonCtrl', function($scope, $state){
	 $scope.user = 'very';
	 console.log("in button controller");
	 
	    $scope.$on('range:updated', function(event,data) {
            // you could inspect the data to see if what you care about changed, or just update your own scope
            //$scope.userInfo = User.getUserInfo()[0];
            console.log("range updated in App ctrl");
        });
	// $state.go('app.profile');
})



//Bookmark tab
.controller('BookmarksCtrl', function($scope, $timeout, Chats, BookmarksService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.listCanSwipe = true
    $scope.bookmarks = BookmarksService.all();
    $timeout($scope.bookmarks, 1000);
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
  });

})

.controller('InboxCtrl', function($scope, $cordovaGeolocation, GetCards) {

   //$scope.data = GetCards.all();
   //$scope.dists = GetCards.getdist();
      var messages = [{
        text: "message 1",
        direction: 'incoming'

      }, {
        text: "message 2",
        direction: 'incoming'
      }, {
        text: "message 3",
        direction: 'outgoing'
      }, {
        text: "message 4",
        direction: 'incoming'
      }, {
        text: "message 5",
        direction: 'outgoing'
      }];
 
    $scope.messages = messages;
})

.controller('MessageCtrl', function($scope, $cordovaGeolocation, GetCards) {

   //$scope.data = GetCards.all();
   //$scope.dists = GetCards.getdist();
      var messages = [{
        text: "message 1",
        direction: 'incoming'

      }, {
        text: "message 2",
        direction: 'incoming'
      }, {
        text: "message 3",
        direction: 'outgoing'
      }, {
        text: "message 4",
        direction: 'incoming'
      }, {
        text: "message 5",
        direction: 'outgoing'
      }];
 
    $scope.messages = messages;
})


.controller('GeoCtrl', function($scope, $cordovaGeolocation, GetCards, $rootScope, GeoService) {

   //$scope.data = GetCards.all();
   //$scope.dists = GetCards.getdist();
   //$scope.range_it = 3;
   //console.log($scope.range_it);
   $scope.range_val = $rootScope.miles;
   $scope.change = function(input){
       $rootScope.miles = input;
    //   console.log(input);
    //   $scope.range_it = GeoService.range(input);
    //   console.log("rang_it is " + $scope.range_it.range);
    //   console.log("range_val is " + $scope.range_val.range);
    //   //$scope.rang_val = GeoService.range(input);


   }
 
})





// TINDER CARDS
.controller('CreateCardCtrl', [
     '$state', '$scope', 'CardService', '$rootScope', // <-- controller dependencies
     function ($state, $scope, CardService, $rootScope) {
        $scope.create_card_form = {};
         /**
          *
          */
        console.log("created card controller");
        console.log("rootscope cooordinates is in creatcard " + $rootScope.coordinates);
        console.log("this is in createCard" + $rootScope.lat);
        //console.log("this is in createCard" + $rootScope.coordinates.lat);
         $scope.postCard = function ($fields) {
             console.log("fields is " + $fields);
             console.log("fields is " + $fields.idea);

             CardService.init();
             $fields.postedBy = Parse.User.current().get('username');
             //$fields.idea = $scope.create_card_form.idea;
             //console.log("create_card_form " + $scope.create_card_form.idea);
            $fields.lat = $rootScope.coordinates.lat;
            $fields.long = $rootScope.coordinates.long;

             CardService.createCard($fields).then(function (_data) {
                 //$scope.create_card_form.idea = '';
                console.log("data " + _data);
                 alert("Success Creating Card");
                
                 //$state.go('app.profile', {});

             }, function (_error) {
                 alert("Error Creating Card " + _error.debug)
             });
         }
 
}])
   
.controller('TinderCardsCtrl',
        function($rootScope, $scope, $state, CardService, Cards) {
            
            //issue: loads only when you tap the background and the view doesn't update until you click on something on the screen
            
            $scope.exclude_IDs = [];
            console.log("in Tinderctrol");
            //console.log(this);
            var coordinates = $rootScope.coordinates;
            coordinates.limit = $rootScope.miles; 
            $scope.cards = [];
            $scope.cards = Cards.add(coordinates);

            
            $scope.addCards = function($num){
                    console.log("in addCards function");
                    var coordinates = $rootScope.coordinates;
                    coordinates.limit = $rootScope.miles;
                    console.log("limit is " + coordinates.limit);
                    $scope.cards = Cards.add(coordinates);
                    //$scope.$apply();
                
            }
        
            
            $scope.transitionOut = function(card) {
    		    console.log('card transition out');
    	   };

            
            $scope.alert = function(){
                alert("you pressed the button");
            }
            
            $scope.transitionRight = function($card) {//save card id and userBy to current user table so current_user can chat with the person
                 console.log("swiped right");

    
                 CardService.init();
                 $card.username = Parse.User.current();
                 var coordinates = $rootScope.coordinates;
                 coordinates.limit = $rootScope.miles;
                 console.log(coordinates.limit);
                 //$fields.idea = $scope.create_card_form.idea;
                 //console.log("create_card_form " + $scope.create_card_form.idea);
    
                 CardService.createBookmark($card, coordinates).then(function (_data) {
                    
                     alert("Success Creating bookmark");
    
                 }, function (_error) {
                     alert("Error Creating bookmark " + _error.debug)
                 });
    	    };
    
    	    $scope.transitionLeft = function(card) {
                console.log("swiped left");
    
    	    };
            
            $scope.cardDestroyed = function($index){
                console.log("splicing " + $index);
                $scope.cards.splice($index, 1);
                console.log("size is " + $scope.cards.length);
            }
  
            
            
        }
)

;
    

