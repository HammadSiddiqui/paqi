import moment from 'moment'

Template.weatherCard.onCreated(function() {
    this.cardObj = new ReactiveVar();
});

Template.weatherCard.helpers({
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
            Template.instance().cardObj.set(data);
           // console.log( Template.instance().cardData);
            return data.current.pollution.aqius;
        }
              
     },
     getWeatherIcon : function () {
        
         //   console.log(Template.instance().cardObj.get());
         if(Template.instance().cardObj.get()) {
            let ic = Template.instance().cardObj.get().current.weather.ic;
            let imgSrc = "/img/" + ic + ".png";
            
            return imgSrc;
         }
            
        
        
     },
     pm25 : function() {
         
         if (Template.instance().cardObj.get()){
            return Template.instance().cardObj.get().current.pollution.p2.conc;
         }
         
     },
     timestamp : function () {
         if(Template.instance().cardObj.get()) {
             let date = Template.instance().cardObj.get().current.pollution.ts;
             let fromNow = moment(date, "YYYYMMDD").fromNow();
             return fromNow;
         }
     }
});


