var unirest = require('unirest');
var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMERKEY,
  consumer_secret: process.env.YELP_CONSUMERSECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKENSECRET
});
var clean = require('./logic.js');
var weatherParser = require('./server.js');

module.exports = {
  cityIdPromFunc : function (city) {
    var cityIdPromise = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/search/locations.json?query='+ city+ '&apikey='+ process.env.SONGKICK_API)
      .end(function (response) {
        resolve(response);
      });
    });
    return cityIdPromise;
  },
  musicEventPromFuncPage1 : function (cityId) {
    var musicEventPromPage1 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage1;
  },
  musicEventPromFuncPage2 : function (cityId) {
    var musicEventPromPage2 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .send({"page" : 2})
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage2;
  },
  musicEventPromFuncPage3 : function (cityId) {
    var musicEventPromPage3 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .send({"page" : 3})
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage3;
  },
  musicEventPromFuncPage4 : function (cityId) {
    var musicEventPromPage4 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .send({"page" : 4})
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage4;
  },
  musicEventPromFuncPage5 : function (cityId) {
    var musicEventPromPage5 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .send({"page" : 5})
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage5;
  },
  musicEventPromFuncPage6 : function (cityId) {
    var musicEventPromPage6 = new Promise(function (resolve, reject) {
      unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
      .send({"page" : 6})
      .end(function (response) {
        resolve(response);
      });
    });
    return  musicEventPromPage6;
  },
  yelpPromFunc : function (city) {
    var yelpPromise = new Promise(function (resolve, reject) {
      yelp.search({term:'food', location: city}, function (error,data) {
        resolve(data);
      });
    });
    return yelpPromise;
  },
  weatherPromFunc : function (city) {
    var weatherPromise = new Promise(function (resolve, reject) {
      unirest.post('http://api.openweathermap.org/data/2.5/forecast?q='+city+',us')
      .send()
      .end(function (response) {
        var weather = clean(weatherParser(response));
        resolve(weather);
      });
    });
    return weatherPromise;
  }
};
