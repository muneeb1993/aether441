angular.module('your_app_name.services', [])

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
  }, {
    id: 2,
    name: 'Texas',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    lat: 29.424122,
    long: -98.493629
  }];
  
  
  console.log("heye neyeeheh");

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  console.log("here I ma");
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log(lat);
      console.log(long);
    }, function(err) {
      // error
    });
    
    
  return {
    all: function() {
      return data;
    }
  };
  // Some fake testing data

})


// .factory('CalcDist', function(lat1,lon1,lat2,lon2) {
//   // Might use a resource here that returns a JSON array
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1); 
//   var a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ; 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var d = (R * c)*0.62137119; // Distance in km
//   return d;


// function deg2rad(deg) {
//   return deg * (Math.PI/180);
// }

// });
;