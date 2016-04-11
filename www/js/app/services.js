angular.module('app.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('GetCards', function($cordovaGeolocation) {
  // Might use a resource here that returns a JSON array
    var data = [{
    id: 0,
    name: 'Kentuky',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    lat: 38.328732,
    long: -85.764771
  }, {
    id: 1,
    name: 'New York',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    lat: 40.742054,
    long: -73.769417
  },  {
    id: 2,
    name: 'Canton',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    lat: 42.325439,
    long: -82.488144
  }, {
    id: 3,
    name: 'Ann Arbor',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    lat: 42.268980,
    long: -83.731512
  }, {
    id: 4,
    name: 'Texas',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    lat: 29.424122,
    long: -98.493629
  }];
  
  
  console.log("heye neyeeheh");
  
  var lat = -1;
  var long = -1;
    
  function haversineDistance(coords1, coords2, isMiles) {


    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    if(isMiles) d /= 1.60934;
  
    return d;
  }
  
  
  function toRad(x) {
    return x * Math.PI / 180;
  }
    
  return {
    all: function() {
      console.log("in all function");
      return data;
    },
    getdist: function(){
      console.log("in getdist function");
      var posOptions = {timeout: 30000, enableHighAccuracy: false};
      console.log("here I am");
      var dists = [];
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
          .then(function (position) {
            lat  = position.coords.latitude
            long = position.coords.longitude
            var coords1 = [long, lat];
           // if(lat < 0) lat = lat*-1;
            //if(long < 0) long = long*-1;
            for (var i = 0; i < data.length; i++) {
              var lat1 = data[i].lat;
              var long1 = data[i].long;
              //if(lat1 < 0) lat1 = lat1*-1;
             // if(long1 < 0) long1 = long1*-1;
              console.log("lat is" + lat + " long is " + long + " lat1 is " + lat1 + "long1 is " + long1);
              var coords2 = [long1, lat1];
              
              var num = haversineDistance(coords1, coords2, 1);
              console.log("num is " + num);
              dists.push(num);
            }
            
          }, function(err) {
          // error
          });
  
        return dists;
      }      
  };

})

.factory('BookmarksService', function(CardService) {
  
  console.log("in BookmarksService");
  CardService.init();
  var currentUser = Parse.User.current();
  var bookmarks = Parse.Object.extend("Likes");
  var query = new Parse.Query(bookmarks).include("card").include("username");
  query.equalTo("username", currentUser);
  var bookmarks_array = []
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
        console.log(results.length);
              bookmarks_array.push(
                  {
                    "username" : results[i].get('username').get('username'),
                    "card" : results[i].get('card'),
                    "description" : results[i].get('card').get('description'),
                    "by" : results[i].get('card').get('postedBy')
                    
                  }
              );
          console.log(results[i].get('card').get('postedBy'));
          console.log(results[i].get('card').get('description'));
          //});
  
      }
      console.log(results.length);
  
    },
  
    error: function(error) {
      // error is an instance of Parse.Error.
      alert("Error Loading Cards " + error.debug)
    }
  });

  return {
    all: function() {
      return bookmarks_array;
    },
    remove: function(chat) {
      
    },
    get: function(chatId) {

    }
  };
})

.service('CardService', ['$q', 'ParseConfiguration',
         function ($q, ParseConfiguration) {

             var parseInitialized = false;


             return {

                 /**
                  *
                  * @returns {*}
                  */
                 init: function () {

                    //debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createCard: function (_cardParams) {
                    
                    console.log("createCard function");
                    console.log("description" + _cardParams.idea);
                    console.log("description" + _cardParams.postedBy);
                    var Card = Parse.Object.extend("Card");
                    var userGeoPoint = new Parse.GeoPoint({latitude: _cardParams.lat, longitude: _cardParams.long});
                    var card = new Card();
                    card.set("description", _cardParams.idea);
                    card.set("postedBy", _cardParams.postedBy);
                    card.set("location", userGeoPoint);
                    
                    return card.save(null, {});
                
                },
                /**
                 *
                 * @param _parseInitUser
                 * @returns {Promise}
                 */
                createBookmark: function (_input) {

                    var Like = Parse.Object.extend("Likes");
                    var like = new Like();
                    like.set("username", _input.username);
                    like.set("card", {"__type":"Pointer","className":"Card","objectId":""+ _input.card_ptr +""});


                    // should return a promise
                    return like.save(null, {});
                },

                LoadCards: function ($input, coordinates) {
                  var userGeoPoint = new Parse.GeoPoint({latitude: coordinates.lat, longitude: coordinates.long});
                  console.log("in load function");
                  var cards = Parse.Object.extend("Card");
                  var query = new Parse.Query(cards);
                  query.near("location", userGeoPoint);
                  query.limit(coordinates.limit);
                  var cards_array = []
                  query.find({
                    success: function(results) {
                      for (var i = 0; i < results.length; i++) {
                        console.log(results.length);
                        //if(results[i].get('description') == "") continue;
                          //$scope.$apply(function (){
                              var hum = Math.floor((Math.random() * 125) + 1);;
                              var color = 'rgb(' + (hum*2) + ',130,' + (255-(hum)) + ')';
                              $input.push(
                                  {
                                    "idea" : results[i].get('description'),
                                    "username" : results[i].get('postedBy'),
                                     "color" : color,
                                     "card_ptr": results[i].id
                                     
                                  }
                              );
                          //console.log(results[i].id);
                        
                      }
  
                    },
                  
                    error: function(error) {
                      // error is an instance of Parse.Error.
                      alert("Error Loading Cards " + error.debug)
                    }
                  });
                }

             }
        
        }])
        
.factory('Cards', function(CardService) {
    
    var cards = []
    
    return {
      
    all: function($cards) {
      if($cards == null){
        CardService.init();
        CardService.LoadCards(cards);
        console.log("variable is null therefore adding more cards in service all()");
        return cards;
      }else{
        return null;
      }
    },
    
    add: function(coordinates){
      
        CardService.init();
        CardService.LoadCards(cards, coordinates);
        return cards;
        
      
    }

  };
  

})

.factory('GeoService', ['$rootScope', function ($rootScope) {

    var service = {

        model: {
            name: '',
            email: '',
            range: ''
        },

        SaveState: function () {
            sessionStorage.GeoService = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.GeoService);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return {
      
      all: function(){
        return service;
      },
      
      range: function($input){
        service.model.range = $input;
        return service;
      }
      
      
      
    };
}])

// .factory('location', function($cordovaGeolocation) {
//   var location;

//   var addCookie = function(val) {
//       cookieSet=val;
//   }

//   var getCookie = function(){
//       return cookieSet;
//   }

//   return {
//     addCookie : addCookie ,
//     getCookie : getCookie 
//   };

// });
        
;