Meteor.methods({ 
    getCityLevelData: function (cityStates) {
    var cityStateDataList = []
    cityStates.forEach((cityState, index, citiStates) => {
        cityState.cities.forEach(city => {
            var data = [];
            const result = HTTP.call('GET', 'https://api.airvisual.com/v2/city', {
              
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
                    
                 return data;
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
 
},

getCityData : function(city, state) {
    var data = [];
    const result = HTTP.call('GET', 'https://api.airvisual.com/v2/city', {
      
    params : {
        state: state,
        city : city,
        country: 'pakistan',
        key: 'gSYZJMKqAE8Egb2zr'

    }
    
    });

    return result.data.data;
},
getStationNames : function (city, state) {
    var data = [];
    const result = HTTP.call('GET', 'https://api.airvisual.com/v2/stations', {
      
    params : {
        state: state,
        city : city,
        country: 'pakistan',
        key: 'gSYZJMKqAE8Egb2zr'

    }
    
    });

    return result.data.data;
},
getStationData : function (city, state, station) {
    var data = [];
    const result = HTTP.call('GET', 'https://api.airvisual.com/v2/station', {
      
    params : {
        station : station,
        city : city,
        state: state,
        country: 'pakistan',
        key: 'gSYZJMKqAE8Egb2zr'

    }
    
    });
    
    return result.data.data;
}

});

/*
Meteor.methods({
    getCityData : function(location) {
        //send a HTTP GET request to the AirVisual API and receive data
        const result = HTTP.call('GET', 'http://api.airvisual.com/v2/city', {
              params: {
                city : 'karachi',
                state : 'sindh',
                country : 'pakistan',  
                key: "gSYZJMKqAE8Egb2zr"
            }
            }, function(err, res) {
                if (!err) {
                    let historicalData = res.data.data.history.pollution;
                    let futureData = res.data.data.forecasts;
                    let past24HourValues = historicalData.slice(0, 24); //to be used to display average
                    let currentValues = res.data.data.current; //current Value
                    let forecast24HourValues = futureData.slice(0,24);
                    
                    
                    let node = {
                        city : 'karachi',
                        state : 'sindh',
                        country : 'pakistan',
                        forecastAvg : 0,
                        historicalAvg : 0,
                        current : currentValues.pollution.aqius
                    }
                    getAvg(forecast24HourValues, function(data) {
                      
                        node.forecastAvg = data;
                    });
                    getAvg(past24HourValues, function(data) {
                        node.historicalAvg = data;
                    })

                    return node;
                  //  console.log(node);
                    
                    
                    
                }
            });
    }
    
});

function getAvg(list, callback) {
    let total = 0;
    list.forEach((item, index, list) => {
        total += item.aqius;
        if(list.length == index + 1) {
//            console.log(total);
            let averagedValue = total/24;
            return callback(averagedValue.toFixed(0) - 1);
            
        }
    });
    
}

*/
//http://api.airvisual.com/v2/city?city=karachi&state=sindh&country=pakistan&key=gSYZJMKqAE8Egb2zr