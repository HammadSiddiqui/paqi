
function getAirVisualData() {
    //send a HTTP GET request to the AirVisual API and receive data
    const result = HTTP.call('GET', 'http://api.airvisual.com/v2/countries', {
          params: { key: "gSYZJMKqAE8Egb2zr",
        }
        }, function(err, res) {
            if (!err) {
                console.log(JSON.stringify(res.data));
            }
        });
}

/*Meteor.setInterval(function() { 
     getAirVisualData();
}, 3000);
*/

//http://api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
function getCities(state, callback) {
    var cities = [];
    const result = HTTP.call('GET', 'http://api.airvisual.com/v2/cities', {
          
        params : {
            state: state,
            country: 'pakistan',
            key: 'gSYZJMKqAE8Egb2zr'

        }
        
        }, function(err, res) {
            if (!err) {
               // console.log(JSON.stringify(res.data.data));
                cities = res.data.data;
               // console.log(cities);
                return callback(cities);
                
            }
            else {
                console.log(err);
                return;
            }
        });
}




function getAllCities(callback) {
 
    let states = ['sindh', 'punjab'];
    var cities = [];
    states.forEach((state, index) => {
        var citiesOfState = getCities(state, function(data) {
           //console.log(data);
            cities = cities.concat(data);
           //console.log(cities);
           if(states.length == index + 1) {
            console.log(cities);
            return cities;
            
        }
        });
   
       // console.log(cities)
         
//    return cities;    
});
}



/*
function getStations(city, state) {
    var stations = [];
    const result = HTTP.call('GET', 'http://api.airvisual.com/v2/stations', {
          
        params : {
            state: state,
            country: 'pakistan',
            key: 'gSYZJMKqAE8Egb2zr'

        }
        
        }, function(err, res) {
            if (!err) {
               // console.log(JSON.stringify(res.data.data));
                stations = res.data.data;
                console.log(stations);
                return callback(stations);
                
            }
            else {
                console.log(err);
                return;
            }
        });
}
*/

///Returns All list of stations in a particular city
/*
function getAllStations(city) {
    let cities = ['sindh', 'punjab'];
    var stations = [];
    cities.forEach((city, index) => {
        var stationOfCity = getStations(city, function(data) {
           //console.log(data);
            stations = stations.concat(data);

            if(cities.length == index + 1) {
                console.log(stations);
    //          return callback(stations);
                
              //  console.log(cities);
            }
        });
        //console.log(citiesOfState);
        
        //console.log(cities)
         
//    return cities;    
});
}

*/



//List supported stations in a city



//getStations()


//http://api.airvisual.com/v2/city?city=karachi&state=sindh&country=pakistan&key=gSYZJMKqAE8Egb2zr

