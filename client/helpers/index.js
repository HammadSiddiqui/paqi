Template.index.helpers({ 
    getAllCities: function() { 
      let cityStates = Nodes.find({}).fetch();
      return cityStates;
      //console.log(cityStates);
      Meteor.call('getCityLevelData', cityStates, function(err, data) {
        // console.log(data);
          //return data;
      });
    }, 
    getCityDataOnClient: function(city, state) { 
       // console.log(city + ' : ' +state);
    /*  return Meteor.call('getCityData', city.toLowerCase(), state.toLowerCase(), function(error, result) {
            
            if(error) {
                console.log(error);
//                this.cityData = result;
                
            }
            else {
                console.log(result);
            }
         });
*/
        let data = ReactiveMethod.call('getCityData', city.toLowerCase(), state.toLowerCase()) ; 
       if(data){
           console.log(data);
           return data.current.pollution.aqius;
       }
             
    },
    getWeatherIcon : function() {
        
    }
}); 


Template.index.onCreated(function() {
    this.cityData = new ReactiveVar();



});
