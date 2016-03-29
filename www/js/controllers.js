Parse.initialize("y7fkUE1YFO489X0F38bKxLvVorVf1cjLkQopJgGk", "pcvflPimQ7TRD8lNoal9BcDSkoq2O9Ih3USsvDW6");



var db_connect = true;
var swipe_feedback = false;
var localCards = [{id: '0', idea: 'This card is from the local storage.', hum: 50}];

angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
// .controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {



//   $scope.doLogIn = function(){
    
// //    var userName = $scope.user.email;
// //	  var password = $scope.user.password;

//     var userName = "npangori";
// 	  var password = "12345678";
// 	  Parse.User.logIn(userName, password, {
// 	  success: function(user) {
//       $state.go('app.profile');
		
// 	  // Do stuff after successful login.
// 	  },
// 	  error: function(user, error) {
// 	  // The login failed. Check error to see why.
// 		  alert("Incorrect credentials");
// 		  return;
// 	  }
// 	  });			

// 	};

// 	$scope.user = {};

// 	$scope.user.email = "npangori";
// 	$scope.user.pin = "12345678";

// 	// We need this for the form validation
// 	$scope.selected_tab = "";

// 	$scope.$on('my-tabs-changed', function (event, data) {
// 		$scope.selected_tab = data.title;
// 	});

// })



.controller('ButtonCtrl', function($scope, $state){
	 $scope.user = 'very';
	// $state.go('app.profile');
})

.controller('TinderCardsCtrl', function($scope, $state){
	 $scope.user = 'very';
	// $state.go('app.profile');
})


.controller('CreateCardCtrl', function($scope, $state){
	 $scope.user = 'very';
	// $state.go('app.profile');
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})





// TINDER CARDS
// .controller('TinderCardsCtrl', function($scope, $http) {
// 	$scope.cards = [];
// 	$scope.exclude_IDs = [];

// 	$scope.addCard = function(id, idea, hum) {
// 		var newCard = {id: id, idea: idea, hum: hum};
// 		// Calculate color from metadata
// 		newCard.color = 'rgb(' + (hum*2) + ',130,' + (255-(hum)) + ')';
// 		$scope.cards.unshift(angular.extend({}, newCard));
// 	};

// 	$scope.addCards = function(count) {
// 		if(db_connect) {
// 			// currently getting ALL cards each time this is called
// 			var query = '';
// 			$http({
// 				method: 'GET',
// 				url: 'http://www.salsaia.com/aether/server/get.php' + query,
// 			}).then(function successCallback(value) {
// 				angular.forEach(value.data, function (v) {
// 					$scope.addCard(v.id, v.idea, v.hum);
// 				});
// 				// $scope.shuffle($scope.cards);
// 			});
// 		}
// 		else {
// 			angular.forEach(localCards, function (v) {
// 				$scope.addCard(v.id, v.idea, v.hum);
// 			});

// 			$scope.shuffle($scope.cards);
// 		}

// 		// $scope.shuffle($scope.cards);
// 	};

// 	$scope.shuffle = function(array) {
// 	  var currentIndex = array.length, temporaryValue, randomIndex;

// 	  // While there remain elements to shuffle...
// 	  while (0 !== currentIndex) {

// 	    // Pick a remaining element...
// 	    randomIndex = Math.floor(Math.random() * currentIndex);
// 	    currentIndex -= 1;

// 	    // And swap it with the current element.
// 	    temporaryValue = array[currentIndex];
// 	    array[currentIndex] = array[randomIndex];
// 	    array[randomIndex] = temporaryValue;
// 	  }

// 	  return array;
// 	};

// 	$scope.addFirstCards = function() {
// 		$scope.addCard('0', "This is the first card. The rest are pulled from the database.", '0');
//     $scope.addCard('1', "I have an idea to connect homeless shelters with food at the dining halls on campus.", '0');
//     $scope.addCard('2', "I think it would be cool to make a small solar powered heater to place in your coat pocket in order to warm your hands.", '0');
//     $scope.addCard('3', "Looking for an Android developer who can help me implement the chat feature in my app.", '0');
// 	};

// 	if(db_connect)
// 		$scope.addFirstCards();
// 	$scope.addCards(5);

// 	$scope.cardDestroyed = function(index) {
// 		$scope.exclude_IDs.unshift( $scope.cards[index].id );	// add to exluded array
// 		$scope.cards.splice(index, 1);							// remove from cards array

// 		console.log($scope.cards.length);
// 		if($scope.cards.length==0){
// 			swipe_feedback = false;
// 			console.log($scope.exclude_IDs);
// 			//$scope.addCards(5);
// 			$scope.exclude_IDs = [];
// 			return;

// 			$scope.exclude_IDs.unshift( $scope.cards[index].id );
			
// 			if($scope.exclude_IDs.length >= 10)
// 				$scope.exclude_IDs = [];

// 			$scope.addCards(5);
// 		}
// 	};

// 	$scope.transitionOut = function(card) {
// 		console.log('card transition out');
// 	};

// 	$scope.transitionRight = function(card) {
// 		if(swipe_feedback && db_connect)
// 			$http({
// 				method: "POST",
// 				url: "http://www.salsaia.com/aether/server/counter.php",
// 				data: {card_id: card.id, update_value: 'yes_count'},
// 				headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
// 			}).then(function successCallback(value) {
// 				console.log('Swiped yes: ', value);
// 			});
// 	};

// 	$scope.transitionLeft = function(card) {
// 		if(swipe_feedback && db_connect)
// 			$http({
// 				method: "POST",
// 				url: "http://www.salsaia.com/aether/server/counter.php",
// 				data: {card_id: card.id, update_value: 'no_count'},
// 				headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
// 			}).then(function successCallback(value) {
// 				console.log('Swiped no: ', value);
// 			});

// 	};

// 	$scope.check_swipeFeedback = function() {
// 		return (swipe_feedback && db_connect) ? true : false;
// 	};
// })

// // CREATE NEW CARD
// .controller('CreateCardCtrl', function($scope, $http, $state) {
	

//   $scope.postCard = function($fields){
		
// 	  var currentUser = Parse.User.current();
	
// 	  if(currentUser){
// 	  }
// 	  else{
// 		  alert("please log in");
		
// 		  return;
// 	  }

//     var Card = Parse.Object.extend("Card");
//     var card = new Card();

//     card.set("postedBy",currentUser.get("email"));
//     card.set("description",$fields.idea);
    
//     card.save(null, {
// 	    success: function(results) {
// 		    $state.go('app.settings');
// 	    },
// 	    error: function(results, error) {
// 		  // error is a Parse.Error with an error code and message.
//         $state.go('app.settings');
// 	    }
// 	  });


//     var Relationship = Parse.Object.extend("Relationship");
//     var relationship = new Relationship();

//     relationship.set("postedBy",currentUser.get("email"));
//     relationship.set("description",$fields.idea);
    
//     relationship.save(null, {
// 	    success: function(results) {
//           $state.go('app.settings');
// 	    },
// 	    error: function(results, error) {
// 		  // error is a Parse.Error with an error code and message.
// 		      $state.go('app.settings');
// 	    }
// 	  });	

//   };


// })






;
