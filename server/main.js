import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
//  getAllCities();  
  if(Nodes.find().count() == 0) {
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

          
          
          let stations = getCityData(cities, function(stations) {
              //console.log(stations);
          }) 
        

      });
      
  });
//    console.log(states);
  }
     


});
