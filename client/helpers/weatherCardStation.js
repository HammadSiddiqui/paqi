Template.weatherCardStation.onCreated(function() {
    //console.log(this.data.station);
  /*  let str = this.data.station;
    str = str.substr(0,str.indexOf(' ')) || str;
    this.data.station = str;
    */
    this.cardObj = new ReactiveVar();
});

Template.weatherCardStation.helpers({
    getStationDataOnClient: function(city, state, station) { 
       // console.log(city + '\n' + state + '\n' + station);
        let data = ReactiveMethod.call('getStationData', city, state, station) ; 
        if(data){
            
           // console.log(data);
            Template.instance().cardObj.set(data);
           // console.log( Template.instance().cardData);
            return data.current.pollution.aqius;
        }
              
     },
     pm25 : function() {
        if(Template.instance().cardObj.get())
            return Template.instance().cardObj.get().current.pollution.p2.conc;
    },
    timestamp : function () {
        if(Template.instance().cardObj.get()) {
            let date = Template.instance().cardObj.get().current.pollution.ts;
            let fromNow = moment(date, "YYYYMMDD").fromNow();
            return fromNow;
        }
    }
     
});
