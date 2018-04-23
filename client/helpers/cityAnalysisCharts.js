import Highcharts from 'highcharts';

Template.cityAnalysisCharts.helpers({ 
    
    pm25Chart: function (kw) {
        Tracker.autorun(function() { 
         
       
        let city = kw.hash.city.toLowerCase();
        let state = kw.hash.state.toLowerCase();
        let data = ReactiveMethod.call('getCityData', city, state) ; 
        if(data){
        
           // Gather data:
        let pollutionHistoryArray = data.history.pollution;
//console.log(pollutionHistoryArray);
        let objects = [];

        pollutionHistoryArray.forEach(element => {
            objects.push([Date.parse(element.ts), element.p2.conc]);
        });
       
        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
                // create the chart
      
           
            Highcharts.chart('pm25', {
  
                chart : {
                    zoomType : 'x'
                },
                title: {
                    text: 'PM 2.5 History',
                    style : {"color": "#333333"}
                },
        
                subtitle: {
                    text: 'PM 2.5 History of the Node'
                },
        
                xAxis: {
                    gapGridLineWidth: 0,
                    type: 'datetime'
                },
                legend : {
                    itemStyle:{color:'#333333'}
                  },
        
                plotOptions: {
                    column: {
                      pointWidth : 5,
                      borderWidth: 0,
                      zones: [{
                        value: 50, // Values up to 10 (not including) ...
                            color: 'green' // ... have the color blue.
                        },
                        {
                            value : 100,
                            color: 'yellow' // Values from 50 (including) and up have the color red
                        },
                        {
                            value : 150,
                            color: 'orange' // Values from 100 (including) and up have the color red
                        },
                        {
                            value : 200,
                            color: 'red' // Values from 200 (including) and up have the color red
                        },
                        {
                            value : 300,
                            color: 'purple' // Values from 300 (including) and up have the color red
                        },
                        {
                            value : 500,
                            color: 'brown' // Values from 500 (including) and up have the color red
                        }]
                      
                    }
                },
                series: [{
                    name: 'PM 2.5',
                    type: 'column',
                    data: objects,
                    gapSize: 0,
                    tooltip: {
                        valueDecimals: 2
                    },
                    color: "#333333",
                    
                    
                }]
            });
    
       
      });
        
        }

        //let packets = Packets.find({nodeId: Session.get('currentNode')}).fetch();
        


     

    });
      }  
}); 
/*
Template.analysisCharts.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 
*/