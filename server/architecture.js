
var exports = module.exports = {};
//Get all states
exports.getStates = function (callback) {
    var states = [];
    const result = HTTP.call('GET', 'http://api.airvisual.com/v2/states', {
          
        params : {
            country: 'pakistan',
            key: 'gSYZJMKqAE8Egb2zr'

        }
        
        }, function(err, res) {
            if (!err) {
               // console.log(JSON.stringify(res.data.data));
                states = res.data.data;
              
             //  console.log(states);
               return callback(states);
               
                
            }
            else {
                console.log(err);
                return;
            }
        });
}

//Get all cities
exports.getCities = function (states, callback) {
    var stateCityList = [];
    states.forEach((state, index, states) => {
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
                    cities = cities.map(city => city.city);
                    let stateCity = {
                        cities : cities,
                        state : state
                    }
                    
                    stateCityList.push(stateCity);

                    if(states.length == index + 1) {
                        return callback(stateCityList);
                    }
                    
                    
                }
                else {
                    console.log(err);
                    return;
                }
            });
    });
 
}
//Get all Station Names
exports.getStationNames = function(cityStates, callback) {
    var cityStateStaionsList = []
    cityStates.forEach((cityState, index, citiStates) => {
        cityState.cities.forEach(city => {
            var stations = [];
            const result = HTTP.call('GET', 'http://api.airvisual.com/v2/stations', {
              
            params : {
                state: cityState.state,
                city : city,
                country: 'pakistan',
                key: 'gSYZJMKqAE8Egb2zr'
    
            }
            
            }, function(err, res) {
                if (!err) {
                   // console.log(JSON.stringify(res.data.data));
                   stations = res.data.data;

                   stations = stations.map(station => station.station);
                    

                    let cityStateStaions = {
                        city : city,
                        state : cityState.state,
                        stations : stations
                    }

                    cityStateStaions = cityStateStaionsList.push(cityStateStaions);
                    
                        
                        if(citiStates.length == index + 1) {
                            return callback(cityStateStaionsList)
                           // console.log(cityStateStaionsList);
                        }
//                    console.log(stations);
                   // return callback(stations);
                    
                }
                else {
                    console.log(err);
                    return;
                }
            });
        });

    });
 
}
//Get all city level data
exports.getCityData = function(cityStates, callback) {
    var cityStateDataList = []
    cityStates.forEach((cityState, index, citiStates) => {
        cityState.cities.forEach(city => {
            var data = [];
            const result = HTTP.call('GET', 'http://api.airvisual.com/v2/city', {
              
            params : {
                state: cityState.state,
                city : city,
                country: 'pakistan',
                key: 'gSYZJMKqAE8Egb2zr'
    
            }
            
            }, function(err, res) {
                if (!err) {
                   // console.log(JSON.stringify(res.data.data));
                   data = res.data.data;

                   //stations = stations.map(station => station.station);
                    
                 return callback(data);
                 
//                    console.log(stations);
                   // return callback(stations);
                    
                }
                else {
                    console.log(err);
                    return;
                }
            });
        });

    });
 
}


/*

Meteor.setInterval(function() { 
    let states = getStates(function(data) {
        console.log(states);
        var states = data.map(state => state.state);
//        console.log(states);
        let cities = getCities(states, function(cities) {
            console.log(cities);
            cities.forEach(cityState => {
                
                Nodes.upsert({state: cityState.state}, {$set:{
                    cities : cityState.cities
                }});
                
            });

            
            
          /*  let stations = getCityData(cities, function(stations) {
                //console.log(stations);
            }) 
          

        });
        
    });
//    console.log(states);     
}, 5000);

*/
