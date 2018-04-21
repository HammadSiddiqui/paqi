import Highcharts from 'highcharts';

Template.cityAnalysisCharts.helpers({ 
    pm25Chart: function (kw) {
        let city = kw.hash.city.toLowerCase();
        let state = kw.hash.state.toLowerCase();
        let data = ReactiveMethod.call('getCityData', city, state) ; 
        if(data){
        
           // Gather data:
        let pollutionHistoryArray = data.history.pollution;
//console.log(pollutionHistoryArray);
        let objects = [];

        pollutionHistoryArray.forEach(element => {
            objects.push([element.ts, element.p2.conc]);
        });
        console.log(objects);
        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
                // create the chart
        Highcharts.chart('pm25', {
  
          chart : {
              backgroundColor:'rgba(0, 0, 0, 1)',
              zoomType : 'x'
          },
          title: {
              text: 'PM 2.5 History',
              style : {"color": "#fafafa"}
          },
  
          subtitle: {
              text: 'PM 2.5 History of the Node'
          },
  
          xAxis: {
              gapGridLineWidth: 0,
              type: 'datetime'
          },
          legend : {
              itemStyle:{color:'#fafafa'}
            },
  
          plotOptions: {
              column: {
                
                borderWidth: 0,
                
              }
          },
          series: [{
              name: 'AQI',
              type: 'column',
              data: objects,
              gapSize: 5,
              tooltip: {
                  valueDecimals: 2
              },
              color: "#333333"
              
          }]
      });
      });
        
        }

        //let packets = Packets.find({nodeId: Session.get('currentNode')}).fetch();
        


     

     
      }  
}); 
/*
Template.analysisCharts.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 
*/