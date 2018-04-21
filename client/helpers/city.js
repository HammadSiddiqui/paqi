Template.weatherCard.onCreated(function() {
    this.cardObj = new ReactiveVar();
});

Template.city.helpers({
    getCityDataOnClient: function(city, state) { 
        let data = ReactiveMethod.call('getCityData', city.toLowerCase(), state.toLowerCase()) ; 
        if(data) {
           // console.log(data);
            Template.instance().cardObj.set(data);
           // console.log( Template.instance().cardData);
            return data.current.pollution.aqius;
        }
              
     },
     getStationsNameOnClient : function (kw) {
        let city = kw.hash.city.toLowerCase();
        let state = kw.hash.state.toLowerCase();
        let data = ReactiveMethod.call('getStationNames', city, state) ; 
        if(data){
         //   console.log(data);
            //Template.instance().cardObj.set(data);
           // console.log( Template.instance().cardData);
            return data;
        }
     }
     ,
     getWeatherIcon : function () {
        
         //   console.log(Template.instance().cardObj.get());
            let ic = Template.instance().cardObj.get().current.weather.ic;
            let imgSrc = "/img/" + ic + ".png";
            
            return imgSrc;
        
        
     }
});


