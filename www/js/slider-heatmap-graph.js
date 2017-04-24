//================================================================================
// LEGEND
//================================================================================
// Regions are used to seperate main sections of code ie. slider, graph, map, etc.

// //========= used to specify section within your region to organize topics

// This is used for function definition
// |--------------------------------------------------------------------------
// | Functions
// |--------------------------------------------------------------------------

//================================================================================
// Global Variables
//================================================================================
var timeStampMin;
var timeStampMax;
var initialLoad = 0;
var superNodesChosen = 1;
var showWindDirection = 0;
var showAqi = 0;

// Array containing the node names
var chosenNodes = ["node 1", "node 2", "node 3", "node 4", "node 5", "node 6", "node 7", "node 8", "node 9", "node 10"];

// Variable used to select the elements in chosenNodes
var currentNodeIndex = 0;

var nodeIndex = 0;


//================================================================================
// Graph Variables
//================================================================================
var plotData = new Array();
var minset = [];
var maxset = [];
var plotData1 = [];
var plotData2 = [];
var plotData3 = [];
var plotData4 = [];
var plotData5 = [];
var plotData6 = [];
var plotData7 = [];
var plotData8 = [];
var plotData9 = [];
var plotData10 = [];

//Initializing variables for min and max y-axis points
var ymin;
var ymax;
var ticks = 5;

// Initialize to temperature
var datatype = 0;

//================================================================================
// Multiple Node Selection Variables
//================================================================================
var ComparisonArray = [];
var ComparisonCount = 0;
var finalstring ='';

//================================================================================
// Heatmap Variables
//================================================================================
// Used for the slider ruler text within the slider
var map;
var averageHeat = new Array();
var averageHumidity = new Array();
var averageUV = new Array();
var averageWindSpeed = new Array();
var centerMap = {lat: 32.777262, lng: -117.070982};

//================================================================================
// Slider Variables
//================================================================================
// Used for the slider ruler text within the slider
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dateMin;
var dateMax;

// This will contain every timestamp between the slider's chosen minimum
// and maximum date in string format. This will be in 10 minute increments
var timeStampMid = [];

// String variables containing the min and max time stamps
var initTimeMin = new Date(2017, 3, 9, 0, 0);
var initTimeMax = new Date(2017, 3, 9, 4, 20);
var todayBoundsMin = new Date(2017, 3, 9);
var todayBoundsMax = new Date(2017, 3, 10);


//================================================================================
// Website Initialization on load
//================================================================================
// A $(document).ready() block.
$(document).ready(function() {

  superNodesChosen = 1;
  showWindDirection = 0;
  showAqi = 0;

  // Hide AQI and wind Direction on startup
  $('.node1SuperReadings').hide();
  $('.node2SuperReadings').hide();
  $('.windDirectionReadings').hide();
  $('.aqiReadings').hide();

  centerMap = {lat: 32.777262, lng: -117.070982};

  NodeAlteration();

  dateMin = new Date(initTimeMin);
  dateMax = new Date(initTimeMax);

  // Create a string for the minimum and maximum timestamps
  timeStampMin = (dateMin.getMonth()+1) +"/"+ dateMin.getDate() +"/"+  dateMin.getFullYear() +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
  timeStampMax = (dateMax.getMonth()+1) +"/"+ dateMax.getDate() +"/"+ dateMax.getFullYear() +" "+ dateMax.getHours() +":"+ dateMax.getMinutes();

  // This will update the timeStampMid array with all of the inbetween timestamps
  getTimeStamps(dateMin, dateMax);

// Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/MasterData.json', function (data) {

    // Print temp reading for lower bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

    // Fill Graph array with minimum timestamp
    var timeStampFull = [];

    //Clear arrays
    minset = [];
    maxset = [];
    plotData = [];
    plotData1 = [];
    plotData2 = [];
    plotData3 = [];
    plotData4 = [];
    plotData5 = [];
    plotData6 = [];
    plotData7 = [];
    plotData8 = [];
    plotData9 = [];
    plotData10 = [];

    timeStampFull.push(timeStampMin);

    for (var counter = 0; counter < timeStampMid.length; counter++) {

      var tempString = timeStampMid[counter];
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);

      // Fill Graph array with middle timestamps
      timeStampFull.push(tempString);
    }

    // Print temp reading for upper bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);

    // Fill Graph array with maximum timestamp
    timeStampFull.push(timeStampMax);

    for(var counter2 = 0; counter2 < timeStampFull.length; counter2++) {

      // Take date in milliseconds
      var datePoint = new Date(timeStampFull[counter2]).getTime();
      var tempPoint = data[chosenNodes[currentNodeIndex]][0][timeStampFull[counter2]][0];
      // plotData.push(date in milliseconds, Temperature reading)
      plotData.push(new Array(datePoint, tempPoint));
    }

    /***********   HEATMAP   **************/

    for(var i=0; i < 10; i++) {

      // For Kevin's Heatmap, this is a single reading. It is the
      var heatMapMin = data[chosenNodes[i]][0][timeStampMin][0];
      var heatMapMax = data[chosenNodes[i]][0][timeStampMax][0];
      var tempVariable = ((heatMapMin + heatMapMax)/2);
      // console.log("tempvar before rounding: "+ tempVariable);
      tempVariable = Math.round(tempVariable);
      // console.log("tempvar after rounding: "+ tempVariable);
      averageHeat[i] = tempVariable;

      var humidMin = data[chosenNodes[i]][0][timeStampMin][1];
      var humidMax = data[chosenNodes[i]][0][timeStampMax][1];
      tempVariable = ((humidMin + humidMax)/2);
      averageHumidity[i] = Math.round(tempVariable);


      var UVMin = data[chosenNodes[i]][0][timeStampMin][2];
      var UVMax = data[chosenNodes[i]][0][timeStampMax][2];
      averageUV[i] = ((UVMin + UVMax)/2);

      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      if(i == 0 || i == 5){
        var windspeedMin = data[chosenNodes[i]][0][timeStampMin][4];
        var windspeedMax = data[chosenNodes[i]][0][timeStampMax][4];
        tempVariable = ((windspeedMin + windspeedMax)/2);
        averageWindSpeed[i] = Math.round(tempVariable);
      }

      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
    }

     initMap();

  // Demo to display all heat readings
    //update div element to display new readings
    // var div = document.getElementById('temp-demo');

    // // Display readings on page
    // div.innerHTML = ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]) + "\n";
    // for (counter = 0; counter < timeStampMid.length; counter++) {
    //   var tempString = timeStampMid[counter];
    //   div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]) + "\n";
    // }
    // div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]) + "\n";


    // // update div element to display new readings
    // var div2 = document.getElementById('avgheat-demo');

    // // Display average heat on page
    // div2.innerHTML = ("Average Heat: " + averageHeat[0]);

  }); // End of $.getJSON


  AveragePictures();

}); // End of Document.Ready

// End of Website Initialization on load


// region: Brandon's Slider Default Load, Change Slider Button Event Handlers, and Slider Value Changed Event Handler
//---------------------------------------------------------------------------------------

//================================================================================
// Today Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-today").click(function() {

  var todayBoundsMin = new Date(2017, 3, 12);
  var todayBoundsMax = new Date(2017, 3, 13);
  var initTodayMin = new Date(2017, 3, 12, 0, 0);
  var initTodayMax = new Date(2017, 3, 12, 4, 20);

  $("#dateSlider").dateRangeSlider( {
      //Note, month 0 is January. Month 4, is May.
      bounds: {min: todayBoundsMin, max: todayBoundsMax},
      scales: [{
        first: function(value){ return value; },
        end: function(value) {return value; },
        next: function(value){
          var next = new Date(value);

          // If we don't have +1 for month, it will break EVERYTHING since date objects start at 0.
          // WE NEED TO INCREMENET MONTH LIKE THIS!
          return new Date(next.setMonth(value.getMonth() + 1));
        },
        label: function(value){
          var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
          return month + "/" + day + "/" + year;
        },
        format: function(tickContainer, tickStart, tickEnd){
          tickContainer.addClass("myCustomClass");
        }
      }],
      step: {
        minutes:10
      },

    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false

  }).dateRangeSlider("values", initTodayMin, initTodayMax);
});


//================================================================================
// Day Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-7days").click(function() {

  var dayBoundsMin = new Date(2017, 3, 7);
  var dayBoundsMax = new Date(2017, 3, 13);
  var initDayMin = new Date(2017, 3, 8);
  var initDayMax = new Date(2017, 3, 10);

  $("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: dayBoundsMin, max: dayBoundsMax},
    scales: [{
      first: function(value){ return value; },
      end: function(value) {return value; },
      next: function(value){
        var next = new Date(value);

        // If we don't have +1 for month, it will break EVERYTHING since date objects start at 0.
        // WE NEED TO INCREMENET MONTH LIKE THIS!
        return new Date(next.setMonth(value.getMonth() + 1));
      },
      label: function(value){
        return months[value.getMonth()];
      },
      format: function(tickContainer, tickStart, tickEnd){
        tickContainer.addClass("myCustomClass");
      }
    }],
    step: {
      minutes:10
    },

    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false

    //*** NOTE ***
    // After the slider has been initialized once, we can no longer use
    // defaultValues to set its value, it will have no effec.
    // To set the value after changing view, we need to use the values
    // function. That is what the line below is doing.
  }).dateRangeSlider("values", initDayMin, initDayMax);
});


//================================================================================
// Slider Value Changed Event Handler
//================================================================================
$("#dateSlider").bind("valuesChanged", function(e, data){;

  //Center map
  centerMap = {lat: 32.777187, lng: -117.069876};

  dateMin = new Date(data.values.min);
  dateMax = new Date(data.values.max);

  // Create a string for the minimum and maximum timestamps
  timeStampMin = (dateMin.getMonth()+1) +"/"+ dateMin.getDate() +"/"+  dateMin.getFullYear() +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
  timeStampMax = (dateMax.getMonth()+1) +"/"+ dateMax.getDate() +"/"+ dateMax.getFullYear() +" "+ dateMax.getHours() +":"+ dateMax.getMinutes();

  // This will update the timeStampMid array with all of the inbetween timestamps
  getTimeStamps(dateMin, dateMax);


  // Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/MasterData.json', function (data) {
    // Print temp reading for lower bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

    // Fill Graph array with minimum timestamp
    var timeStampFull = [];

    //Clear arrays
    minset = [];
    maxset = [];
    plotData = [];
    plotData1 = [];
    plotData2 = [];
    plotData3 = [];
    plotData4 = [];
    plotData5 = [];
    plotData6 = [];
    plotData7 = [];
    plotData8 = [];
    plotData9 = [];
    plotData10 = [];


    timeStampFull.push(timeStampMin);

    for (var counter = 0; counter < timeStampMid.length; counter++) {

      var tempString = timeStampMid[counter];
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);

      // Fill Graph array with middle timestamps
      timeStampFull.push(tempString);
    }

    // Print temp reading for upper bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);

    // Fill Graph array with maximum timestamp
    timeStampFull.push(timeStampMax);


    for(var counter2 = 0; counter2 < timeStampFull.length; counter2++) {

      var datePoint = new Date(timeStampFull[counter2]).getTime();
      var dataPoint1 = data[chosenNodes[0]][0][timeStampFull[counter2]][datatype];
      var dataPoint2 = data[chosenNodes[1]][0][timeStampFull[counter2]][datatype];
      var dataPoint3 = data[chosenNodes[2]][0][timeStampFull[counter2]][datatype];
      var dataPoint4 = data[chosenNodes[3]][0][timeStampFull[counter2]][datatype];
      var dataPoint5 = data[chosenNodes[4]][0][timeStampFull[counter2]][datatype];
      var dataPoint6 = data[chosenNodes[5]][0][timeStampFull[counter2]][datatype];
      var dataPoint7 = data[chosenNodes[6]][0][timeStampFull[counter2]][datatype];
      var dataPoint8 = data[chosenNodes[7]][0][timeStampFull[counter2]][datatype];
      var dataPoint9 = data[chosenNodes[8]][0][timeStampFull[counter2]][datatype];
      var dataPoint10 = data[chosenNodes[9]][0][timeStampFull[counter2]][datatype];

      // plotData.push(date in milliseconds, Temperature reading)
      plotData1.push(new Array(datePoint, dataPoint1));
      plotData2.push(new Array(datePoint, dataPoint2));
      plotData3.push(new Array(datePoint, dataPoint3));
      plotData4.push(new Array(datePoint, dataPoint4));
      plotData5.push(new Array(datePoint, dataPoint5));
      plotData6.push(new Array(datePoint, dataPoint6));
      plotData7.push(new Array(datePoint, dataPoint7));
      plotData8.push(new Array(datePoint, dataPoint8));
      plotData9.push(new Array(datePoint, dataPoint9));
      plotData10.push(new Array(datePoint, dataPoint10));
    }


    /***********   HEATMAP   **************/

    for(var i=0; i < 10; i++) {

      // For Kevin's Heatmap, this is a single reading. It is the
      var heatMapMin = data[chosenNodes[i]][0][timeStampMin][0];
      var heatMapMax = data[chosenNodes[i]][0][timeStampMax][0];
      var tempVariable = ((heatMapMin + heatMapMax)/2);
      // console.log("tempvar before rounding: "+ tempVariable);
      tempVariable = Math.round(tempVariable);
      // console.log("tempvar after rounding: "+ tempVariable);
      averageHeat[i] = tempVariable;


      var humidMin = data[chosenNodes[i]][0][timeStampMin][1];
      var humidMax = data[chosenNodes[i]][0][timeStampMax][1];
      tempVariable = ((humidMin + humidMax)/2);
      averageHumidity[i] = Math.round(tempVariable);


      var UVMin = data[chosenNodes[i]][0][timeStampMin][2];
      console.log("UVMin: " + UVMin + "\n");
      var UVMax = data[chosenNodes[i]][0][timeStampMax][2];
      console.log("UVMin: " + UVMax + "\n");
      averageUV[i] = ((UVMin + UVMax)/2);

      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      if(i == 0 || i == 5){
        var windspeedMin = data[chosenNodes[i]][0][timeStampMin][4];
        var windspeedMax = data[chosenNodes[i]][0][timeStampMax][4];
        tempVariable = ((windspeedMin + windspeedMax)/2);
        averageWindSpeed[i] = Math.round(tempVariable);
      }




      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
    }

     initMap();

    // // For Kevin's Heatmap, this is a single reading. It is the
    // var heatMapMin = data[chosenNodes[currentNodeIndex]][0][timeStampMin][0];
    // var heatMapMax = data[chosenNodes[currentNodeIndex]][0][timeStampMax][0];
    // averageHeat = ((heatMapMin + heatMapMax)/2);
    // averageHeat = Math.round(averageHeat);
    // console.log("Updating heatmap reading: " + averageHeat);
    // initMap();
    /***********   HEATMAP END   **************/


     /***********   GRAPH   **************/

     data1 = [];
     data2 = [];
     data3 = [];
     data4 = [];
     data5 = [];
     data6 = [];
     data7 = [];
     data8 = [];
     data9 = [];
     data10 = [];
     dataset = [];

  var data1 =
  {

    label: "node 1",
    data: plotData1,
    color: "#000000"

  };

  var data2 =
  {

    label: "node 2",
    data: plotData2,
    color: "#FF0000"

  };

  var data3 =
  {

    label: "node 3",
    data: plotData3,
    color: "#00BB00"

  };

  var data4 =
  {

    label: "node 4",
    data: plotData4,
    color: "#0000FF"

  };

  var data5 =
  {

    label: "node 5",
    data: plotData5,
    color: "#FFBBFF"

  };

  var data6 =
  {

    label: "node 6",
    data: plotData6,
    color: "#00FFFF"

  };

  var data7 =
  {

    label: "node 7",
    data: plotData7,
    color: "#FFFF00"

  };

  var data8 =
  {

    label: "node 8",
    data: plotData8,
    color: "#B0B0B0"

  };

  var data9 =
  {

    label: "node 9",
    data: plotData9,
    color: "#4B0066"

  };

  var data10 =
  {

    label: "node 10",
    data: plotData10,
    color: "#FF8000"

  };

  //Taking range of y-values from each set of plotData
  var yrange1 = plotData1.map(function(range1){return range1[1];});
  var yrange2 = plotData2.map(function(range2){return range2[1];});
  var yrange3 = plotData3.map(function(range3){return range3[1];});
  var yrange4 = plotData4.map(function(range4){return range4[1];});
  var yrange5 = plotData5.map(function(range5){return range5[1];});
  var yrange6 = plotData6.map(function(range6){return range6[1];});
  var yrange7 = plotData7.map(function(range7){return range7[1];});
  var yrange8 = plotData8.map(function(range8){return range8[1];});
  var yrange9 = plotData9.map(function(range9){return range9[1];});
  var yrange10 = plotData10.map(function(range10){return range10[1];});

  for(var i = 0; i < ComparisonArray.length; i++)
  {

    if(ComparisonArray[i] == "node 1")
    {
      dataset.push(data1);
      minset.push(Math.min.apply(null,yrange1));
      maxset.push(Math.max.apply(null,yrange1));
    }

    if(ComparisonArray[i] == "node 2")
    {
      dataset.push(data2);
      minset.push(Math.min.apply(null,yrange2));
      maxset.push(Math.max.apply(null,yrange2));
    }

    if(ComparisonArray[i] == "node 3")
    {
      dataset.push(data3);
      minset.push(Math.min.apply(null,yrange3));
      maxset.push(Math.max.apply(null,yrange3));
    }

    if(ComparisonArray[i] == "node 4")
    {
      dataset.push(data4);
      minset.push(Math.min.apply(null,yrange4));
      maxset.push(Math.max.apply(null,yrange4));
    }

    if(ComparisonArray[i] == "node 5")
    {
      dataset.push(data5);
      minset.push(Math.min.apply(null,yrange5));
      maxset.push(Math.max.apply(null,yrange5));
    }

    if(ComparisonArray[i] == "node 6")
    {
      dataset.push(data6);
      minset.push(Math.min.apply(null,yrange6));
      maxset.push(Math.max.apply(null,yrange6));
    }

    if(ComparisonArray[i] == "node 7")
    {
      dataset.push(data7);
      minset.push(Math.min.apply(null,yrange7));
      maxset.push(Math.max.apply(null,yrange7));
    }

    if(ComparisonArray[i] == "node 8")
    {
      dataset.push(data8);
      minset.push(Math.min.apply(null,yrange8));
      maxset.push(Math.max.apply(null,yrange8));
    }

    if(ComparisonArray[i] == "node 9")
    {
      dataset.push(data9);
      minset.push(Math.min.apply(null,yrange9));
      maxset.push(Math.max.apply(null,yrange9));
    }

    if(ComparisonArray[i] == "node 10")
    {
      dataset.push(data10);
      minset.push(Math.min.apply(null,yrange10));
      maxset.push(Math.max.apply(null,yrange10));
    }

  }

  ymin = Math.min.apply(null,minset);
  ymax = Math.max.apply(null,maxset);

  console.log("ymin: " + ymin);
  console.log("ymax: " + ymax);
  console.log("ComparisonArray: " + ComparisonArray);
  console.log("data1 " + data1);

    // Setting options variable for plotting graph
    if(timeStampFull.length < ((8*6)+1)) {
      var options = {
          series: {
              lines: { show: true },
              points: {show: true },
          },
          grid: {
              hoverable: true,
              clickable: true
          },
          xaxis:
          {
              mode: "time",
              timeformat: "%m/%d/%y\n %h:%M",
              //min: ((new Date(dateMin).getTime() - 600000*6*7)),
              //max: ((new Date(dateMax).getTime() - 600000*6*7))
              min: new Date(dateMin).getTime(),
              max: new Date(dateMax).getTime(),
              timezone: "browser"
          },

          yaxis:
          {
              min: ymin - ticks,
        max: ymax + ticks,
        ticksize: ticks
          }
      }
    }
    else {
      var options = {
        series: {
            lines: { show: true },
            points: {show: false },
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        xaxis:
        {
            mode: "time",
            timeformat: "%m/%d/%y\n %h:%M",
            //min: ((new Date(dateMin).getTime() - 600000*6*7)),
            //max: ((new Date(dateMax).getTime() - 600000*6*7))
            min: new Date(dateMin).getTime(),
            max: new Date(dateMax).getTime(),
            timezone: "browser"
        },

        yaxis:
        {
          min: ymin - ticks,
      max: ymax + ticks,
      ticksize: ticks
        }
      }
    }

    /*var dataset = [
      {
         label: chosenNodes[currentNodeIndex],
         data: plotData,
         color: "#FF0000"
      }
    ]*/

    $.plot($("#placeholder"), dataset, options);
    /***********   END OF GRAPH   **************/



  // Demo to display all heat readings
    //update div element to display new readings
    // var div = document.getElementById('temp-demo');

    // // Display readings on page
    // div.innerHTML = ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]) + "\n";
    // for (counter = 0; counter < timeStampMid.length; counter++) {
    //   var tempString = timeStampMid[counter];
    //   div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]) + "\n";
    // }
    // div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]) + "\n";


    // // update div element to display new readings
    // var div2 = document.getElementById('avgheat-demo');

    // // Display average heat on page
    // div2.innerHTML = ("Average Heat: " + averageHeat[0]);

  }); // End of $.getJSON
}); // End of $("#dateSlider").bind("valuesChanged")


//================================================================================
// Functions
//================================================================================

/*
|--------------------------------------------------------------------------
| getTimeStamps
|--------------------------------------------------------------------------
|
| Takes the minimum and maximum timestamps of the slider as an input and
| fills the timeStampMid array with every timestamp inbetween in
| increments of 10 minutes.
|
| Input: two Date objects
| Return: none
|
|
*/

function getTimeStamps(timeMin, timeMax){

  // ** IMPORTANT **
  // You NEED to create a new date object initialized with these values.
  // If you simply did "minCopy = timeMin" you would be modifying the
  // original Date object. We want to make a copy of the date object
  // to prevent this!
  var minCopy = new Date(timeMin);
  var maxCopy = new Date(timeMax);

  // If the current min and max are the same, clear out timeStampMid and return
  if(minCopy.getTime() == maxCopy.getTime()) {

    // Clear out timeStampMid
    timeStampMid = [];
    return;
  }

  // NOTE: Instead of comparing dates using the operators directly,(dateMin == dateMax),
  // a good practice is to compare the dates but using the milliseconds format.
  // You can obtain milliseconds format using the getTime( ) function.
  // Reference: https://wiki.base22.com/display/btg/How+to+compare+dates+in+JavaScript

  // If the current difference between min and max is 600000 milliseconds,
  // (equivalent to 10 minutes), we do not need to calculate inbetween values.
  else if((maxCopy.getTime() - minCopy.getTime()) == 600000) {

    // Clear out timeStampMid
    timeStampMid = [];
    return;
  }
  else {

    // Clear out timeStampMid
    timeStampMid = [];

    // Only loop if the difference in min and max is greater than 10 minutes
    // This will continue incrementing the minimum by 10 minutes
    // until it becomes 10 minutes away from the maximum timestamp
    while((maxCopy.getTime() - minCopy.getTime()) > 600000) {

      // Increment the minutes by 10
      minCopy.setMinutes(minCopy.getMinutes()+10);

      // Create a new timestamp after incrementing minutes by 10
      var tempString =  (minCopy.getMonth()+1) +"/"+ minCopy.getDate() +"/"+ minCopy.getFullYear() +" "+ minCopy.getHours() +":"+ minCopy.getMinutes();

      // Append the current string into the timeStampMid array
      timeStampMid.push(tempString);
    } // End of While loop

    return;
  } // End of else

/* //*** Not necessary since Date object handles rollover
    // Don't cache ajax or content won't be fresh
    $.ajaxSetup ({
        cache: false,
        complete: function() {
          // Schedule the next request when the current one's complete
          if(i == true) {
            i = false;
          }
          else {
            i = true;
          }
          setTimeout(updatePageInfo, timeDelay);
        }
    });

    // **** IT IS IMPORTANT TO DISPLAY THE INFO BEFORE INCREMENTING IT ****
    //console.log(myDate.getDate() +"/"+ myDate.getMonth() +"/"+ myDate.getFullYear()+" "+ myDate.getHours() +":"+ myDate.getMinutes()+":"+ myDate.getSeconds());

    // load() functions
    var loadUrl = myDate.getDate() +"/"+ myDate.getMonth() +"/"+ myDate.getFullYear() +" "+ myDate.getHours() +":"+ myDate.getMinutes()+":"+ myDate.getSeconds();
    var loadUrl2;
    if(i == true) {
      loadUrl2 = "/www/test-data/example.json";
    }
    else {
      loadUrl2 = "/www/test-data/test_data_subnodes.json";
    }

//DEBUG
    //$("#refreshImage").html(loadUrl);
    //$("#refreshImage2").load(loadUrl2);

    // |*-- If we chose to update at an interval of seconds --*|
    if(refreshSecond == true) {

      //** Only increment second if it is less than 60
      if(myDate.getSeconds() < 60) {
        myDate.setSeconds(myDate.getSeconds() + refreshSecondInterval);
      }

      //** Otherwise, Reset seconds and update the minutes  hours (if applicable)
      else {
        // if we have reached the 60th second, reset seconds and increment minutes and hour
        myDate.setSeconds(0);

        // Only increment minutes if the current minute is 59 or lower
        if(myDate.getMinutes() < 60) {
          myDate.setMinutes(myDate.getMinutes() + 1);
        }

        // Otherwise, reset minutes and update the hours
        else {
          // if we have reached the 60th minute, reset minutes and increment hour
          myDate.setMinutes(0);

          // If the current hour is already 24, start over at the 0th hour
          if(myDate.getHours() > 23) {
             myDate.setHour(0);
          }
          // If the current hour is not 24, go to the next hour
          else {
            myDate.setHour(myDate.getHours() + 1);
          }
        }

      } // End of resetting minutes and hours
    }


    // |*-- If we chose to update at an interval of minutes --*|
    else if(refreshMinute == true) {

      //** Only increment if the current minute is 59 or lower
      if(myDate.getMinutes() < 60) {
        myDate.setMinutes(myDate.getMinutes() + refreshMinuteInterval);
      }

      //** Otherwise, reset minutes and update the hours
      else {
        // if we have reached the 60th minute, reset minutes and increment hour
        myDate.setMinutes(0);

        // If the current hour is already 24, start over at the 0th hour
        if(myDate.getHours() > 23) {
           myDate.setHour(0);
        }
        // If the current hour is not 24, go to the next hour
        else {
          myDate.setHour(myDate.getHours() + 1);
        }
      }
    } // end of updating by specified minute interval


    // |*-- Otherwise, increment by a default of 10 minutes --*|
    else {
      //** Only increment if the current minute is 59 or lower
      if(myDate.getMinutes() < 60) {
        myDate.setMinutes(myDate.getMinutes() + 10);
      }

      //** Otherwise, reset minutes and update the hours
      else {
        // if we have reached the 60th minute, reset minutes and increment hour
        myDate.setMinutes(0);

        // If the current hour is already 24, start over at the 0th hour
        if(myDate.getHours() > 23) {
           myDate.setHour(0);
        }
        // If the current hour is not 24, go to the next hour
        else {
          myDate.setHour(myDate.getHours() + 1);
        }
      }
    }
*/
}; // End of getTimeStamps()

//---------------------------------------------------------------------------------------
//endregion: Slider Value Changed Event Handler, Slider Default Load, and Change Slider Button Event Handlers






// region: Yusuf's checkboxes
//---------------------------------------------------------------------------------------

//================================================================================
// Event Handlers
//================================================================================

//================================================================================
// Expand button clicked event handler
//================================================================================
$('#justify-icon').click(function(){

  // This will only happen once
  if(initialLoad == 0) {

    initialLoad = 1;

    //================================================================================
    // Default Constructor for the Slider. Created when the expand button is first pressed
    //================================================================================
    $("#dateSlider").dateRangeSlider( {

        //Note, month 0 is January. Month 4, is May.
        bounds: {min: new Date(2017, 3, 9, 0, 0), max: new Date(2017, 3, 9, 24, 0)},
        defaultValues: {min: initTimeMin, max: initTimeMax},
        scales: [{
          first: function(value){ return value; },
          end: function(value) {return value; },
          next: function(value){
            var next = new Date(value);

            // If we don't have +1 for month, it will break EVERYTHING since date objects start at 0.
            // WE NEED TO INCREMENET MONTH LIKE THIS!
            return new Date(next.setMonth(value.getMonth() + 1));
          },
          label: function(value){
            var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
              return month + "/" + day + "/" + year;
          },
          format: function(tickContainer, tickStart, tickEnd){
            tickContainer.addClass("myCustomClass");
          }
        }],
        step: {
          minutes:10
        },
        formatter: function(value){
          var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
          return month + "/" + day + "/" + year + " " + hour + ":" + min;
        },
        wheelMode: "scroll",
        wheelSpeed: 1,

        // Deactivate ranges in case if the user switches between the different views
        range:false
    });

    dateMin = new Date(initTimeMin);
    dateMax = new Date(initTimeMax);

    // Create a string for the minimum and maximum timestamps
    timeStampMin = (dateMin.getMonth()+1) +"/"+ dateMin.getDate() +"/"+  dateMin.getFullYear() +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
    timeStampMax = (dateMax.getMonth()+1) +"/"+ dateMax.getDate() +"/"+ dateMax.getFullYear() +" "+ dateMax.getHours() +":"+ dateMax.getMinutes();

    // This will update the timeStampMid array with all of the inbetween timestamps
    getTimeStamps(dateMin, dateMax);


    // console.log(timeStampMin);
    // console.log(timeStampMax);

    $.getJSON('Node_Json_Data/MasterData.json', function (data) {

      //Center map
      centerMap = {lat: 32.777187, lng: -117.069876};


      var testTimeStamps = [];
      var timeStampStrings = [];


      testTimeStamps = Object.keys(data[chosenNodes[currentNodeIndex]][0]);

      //console.log("testTimeStamps: " + testTimeStamps + "\n");

      //testTimeStamps.sort();

      testTimeStamps.forEach(function(element) {
        var MyDate = new Date(element);
        var MyDateString;

        MyDate.setDate(MyDate.getDate() + 20);

        MyDateString = ('0' + (MyDate.getMonth())).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' +  MyDate.getFullYear() +" "+ MyDate.getHours() +":"+ MyDate.getMinutes();

        //console.log(MyDateString + "\n");
        timeStampStrings.push(MyDateString);

          //console.log(element + "\n");
      });

      timeStampStrings.sort();

      timeStampStrings.forEach(function(element) {
        console.log(element + "\n");
      });

      // Print temp reading for lower bound timestamp
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

      // Fill Graph array with minimum timestamp
      var timeStampFull = [];

      //Clear arrays
      minset = [];
      maxset = [];
      plotData = [];
      plotData1 = [];
      plotData2 = [];
      plotData3 = [];
      plotData4 = [];
      plotData5 = [];
      plotData6 = [];
      plotData7 = [];
      plotData8 = [];
      plotData9 = [];
      plotData10 = [];

      // Initialize graph with node 1 selected on start up
      ComparisonArray[0] = "node 1";
      ComparisonCount = 1;
      finalstring = "Nodes compared: node 1";

      //document.getElementById('ComparisonNode').innerHTML = finalstring;


      timeStampFull.push(timeStampMin);

      for (var counter = 0; counter < timeStampMid.length; counter++) {

        var tempString = timeStampMid[counter];
        //console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);

        // Fill Graph array with middle timestamps
        timeStampFull.push(tempString);
      }

      // Print temp reading for upper bound timestamp
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);

      // Fill Graph array with maximum timestamp
      timeStampFull.push(timeStampMax);

    for(var counter2 = 0; counter2 < timeStampFull.length; counter2++) {

      var datePoint = new Date(timeStampFull[counter2]).getTime();
      var dataPoint1 = data[chosenNodes[0]][0][timeStampFull[counter2]][datatype];
      var dataPoint2 = data[chosenNodes[1]][0][timeStampFull[counter2]][datatype];
      var dataPoint3 = data[chosenNodes[2]][0][timeStampFull[counter2]][datatype];
      var dataPoint4 = data[chosenNodes[3]][0][timeStampFull[counter2]][datatype];
      var dataPoint5 = data[chosenNodes[4]][0][timeStampFull[counter2]][datatype];
      var dataPoint6 = data[chosenNodes[5]][0][timeStampFull[counter2]][datatype];
      var dataPoint7 = data[chosenNodes[6]][0][timeStampFull[counter2]][datatype];
      var dataPoint8 = data[chosenNodes[7]][0][timeStampFull[counter2]][datatype];
      var dataPoint9 = data[chosenNodes[8]][0][timeStampFull[counter2]][datatype];
      var dataPoint10 = data[chosenNodes[9]][0][timeStampFull[counter2]][datatype];

      // plotData.push(date in milliseconds, Temperature reading)
      plotData1.push(new Array(datePoint, dataPoint1));
      plotData2.push(new Array(datePoint, dataPoint2));
      plotData3.push(new Array(datePoint, dataPoint3));
      plotData4.push(new Array(datePoint, dataPoint4));
      plotData5.push(new Array(datePoint, dataPoint5));
      plotData6.push(new Array(datePoint, dataPoint6));
      plotData7.push(new Array(datePoint, dataPoint7));
      plotData8.push(new Array(datePoint, dataPoint8));
      plotData9.push(new Array(datePoint, dataPoint9));
      plotData10.push(new Array(datePoint, dataPoint10));
    }

      /***********   HEATMAP   **************/

      for(var i=0; i < 10; i++) {

      var heatMapMin = data[chosenNodes[i]][0][timeStampMin][0];
      var heatMapMax = data[chosenNodes[i]][0][timeStampMax][0];
      var tempVariable = ((heatMapMin + heatMapMax)/2);
      // console.log("tempvar before rounding: "+ tempVariable);
      tempVariable = Math.round(tempVariable);
      // console.log("tempvar after rounding: "+ tempVariable);
      averageHeat[i] = tempVariable;


      var humidMin = data[chosenNodes[i]][0][timeStampMin][1];
      var humidMax = data[chosenNodes[i]][0][timeStampMax][1];
      tempVariable = ((humidMin + humidMax)/2);
      averageHumidity[i] = Math.round(tempVariable);


      var UVMin = data[chosenNodes[i]][0][timeStampMin][2];
      var UVMax = data[chosenNodes[i]][0][timeStampMax][2];
      averageUV[i] = ((UVMin + UVMax)/2);

      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      if(i == 0 || i == 5){
        var windspeedMin = data[chosenNodes[i]][0][timeStampMin][4];
        var windspeedMax = data[chosenNodes[i]][0][timeStampMax][4];
        tempVariable = ((windspeedMin + windspeedMax)/2);
        averageWindSpeed[i] = Math.round(tempVariable);
      }


      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      }

      initMap();
      /***********   HEATMAP END   **************/

      /***********   GRAPH   **************/

     data1 = [];
     data2 = [];
     data3 = [];
     data4 = [];
     data5 = [];
     data6 = [];
     data7 = [];
     data8 = [];
     data9 = [];
     data10 = [];
     dataset = [];

     console.log("Temperature radio button selected!\n");
     //temperature radio button event handler
     datatype = 0;
     ticks = 5;

  var data1 =
  {

    label: "node 1",
    data: plotData1,
    color: "#000000"

  };

  var data2 =
  {

    label: "node 2",
    data: plotData2,
    color: "#FF0000"

  };

  var data3 =
  {

    label: "node 3",
    data: plotData3,
    color: "#00BB00"

  };

  var data4 =
  {

    label: "node 4",
    data: plotData4,
    color: "#0000FF"

  };

  var data5 =
  {

    label: "node 5",
    data: plotData5,
    color: "#FFBBFF"

  };

  var data6 =
  {

    label: "node 6",
    data: plotData6,
    color: "#00FFFF"

  };

  var data7 =
  {

    label: "node 7",
    data: plotData7,
    color: "#FFFF00"

  };

  var data8 =
  {

    label: "node 8",
    data: plotData8,
    color: "#B0B0B0"

  };

  var data9 =
  {

    label: "node 9",
    data: plotData9,
    color: "#4B0066"

  };

  var data10 =
  {

    label: "node 10",
    data: plotData10,
    color: "#FF8000"

  };

  //Taking range of y-values from each set of plotData
  var yrange1 = plotData1.map(function(range1){return range1[1];});
  var yrange2 = plotData2.map(function(range2){return range2[1];});
  var yrange3 = plotData3.map(function(range3){return range3[1];});
  var yrange4 = plotData4.map(function(range4){return range4[1];});
  var yrange5 = plotData5.map(function(range5){return range5[1];});
  var yrange6 = plotData6.map(function(range6){return range6[1];});
  var yrange7 = plotData7.map(function(range7){return range7[1];});
  var yrange8 = plotData8.map(function(range8){return range8[1];});
  var yrange9 = plotData9.map(function(range9){return range9[1];});
  var yrange10 = plotData10.map(function(range10){return range10[1];});

  for(var i = 0; i < ComparisonArray.length; i++)
  {

    if(ComparisonArray[i] == "node 1")
    {
      dataset.push(data1);
      minset.push(Math.min.apply(null,yrange1));
      maxset.push(Math.max.apply(null,yrange1));
    }

    if(ComparisonArray[i] == "node 2")
    {
      dataset.push(data2);
      minset.push(Math.min.apply(null,yrange2));
      maxset.push(Math.max.apply(null,yrange2));
    }

    if(ComparisonArray[i] == "node 3")
    {
      dataset.push(data3);
      minset.push(Math.min.apply(null,yrange3));
      maxset.push(Math.max.apply(null,yrange3));
    }

    if(ComparisonArray[i] == "node 4")
    {
      dataset.push(data4);
      minset.push(Math.min.apply(null,yrange4));
      maxset.push(Math.max.apply(null,yrange4));
    }

    if(ComparisonArray[i] == "node 5")
    {
      dataset.push(data5);
      minset.push(Math.min.apply(null,yrange5));
      maxset.push(Math.max.apply(null,yrange5));
    }

    if(ComparisonArray[i] == "node 6")
    {
      dataset.push(data6);
      minset.push(Math.min.apply(null,yrange6));
      maxset.push(Math.max.apply(null,yrange6));
    }

    if(ComparisonArray[i] == "node 7")
    {
      dataset.push(data7);
      minset.push(Math.min.apply(null,yrange7));
      maxset.push(Math.max.apply(null,yrange7));
    }

    if(ComparisonArray[i] == "node 8")
    {
      dataset.push(data8);
      minset.push(Math.min.apply(null,yrange8));
      maxset.push(Math.max.apply(null,yrange8));
    }

    if(ComparisonArray[i] == "node 9")
    {
      dataset.push(data9);
      minset.push(Math.min.apply(null,yrange9));
      maxset.push(Math.max.apply(null,yrange9));
    }

    if(ComparisonArray[i] == "node 10")
    {
      dataset.push(data10);
      minset.push(Math.min.apply(null,yrange10));
      maxset.push(Math.max.apply(null,yrange10));
    }

  }

  ymin = Math.min.apply(null,minset);
  ymax = Math.max.apply(null,maxset);

  console.log("ymin: " + ymin);
  console.log("ymax: " + ymax);
  console.log("ComparisonArray: " + ComparisonArray);
  console.log("data1 " + data1);

    // Setting options variable for plotting graph
    if(timeStampFull.length < ((8*6)+1)) {
      var options = {
          series: {
              lines: { show: true },
              points: {show: true },
          },
          grid: {
              hoverable: true,
              clickable: true
          },
          xaxis:
          {
              mode: "time",
              timeformat: "%m/%d/%y\n %h:%M",
              //min: ((new Date(dateMin).getTime() - 600000*6*7)),
              //max: ((new Date(dateMax).getTime() - 600000*6*7))
              min: new Date(dateMin).getTime(),
              max: new Date(dateMax).getTime(),
              timezone: "browser"
          },

          yaxis:
          {
              min: ymin - ticks,
        max: ymax + ticks,
        ticksize: ticks
          }
      }
    }
    else {
      var options = {
        series: {
            lines: { show: true },
            points: {show: false },
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        xaxis:
        {
            mode: "time",
            timeformat: "%m/%d/%y\n %h:%M",
            //min: ((new Date(dateMin).getTime() - 600000*6*7)),
            //max: ((new Date(dateMax).getTime() - 600000*6*7))
            min: new Date(dateMin).getTime(),
            max: new Date(dateMax).getTime(),
            timezone: "browser"
        },

        yaxis:
        {
          min: ymin - ticks,
      max: ymax + ticks,
      ticksize: ticks
        }
      }
    }

    /*var dataset = [
      {
         label: chosenNodes[currentNodeIndex],
         data: plotData,
         color: "#FF0000"
      }
    ]*/

    $.plot($("#placeholder"), dataset, options);
    /***********   END OF GRAPH   **************/

  /*  // Demo to display all heat readings
      // update div element to display new readings
      var div = document.getElementById('temp-demo');

      // Display readings on page
      div.innerHTML = ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]) + "\n";
      for (counter = 0; counter < timeStampMid.length; counter++) {
        var tempString = timeStampMid[counter];
        div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]) + "\n";
      }
      div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]) + "\n";
  */

      // // update div element to display new readings
      // var div2 = document.getElementById('avgheat-demo');

      // // Display average heat on page
      // div2.innerHTML = ("Average Heat: " + averageHeat[0]);

    }); // End of getJSON
  } // End of if
  else {

  }

}); // End of expandButton press



$('#temperature').on("change", function(){
  console.log("Temperature radio button selected!\n");
  //temperature radio button event handler
  datatype = 0;
  ticks = 5;
  updateGraph();

});

$('#humidity').on("change", function(){
  console.log("Humidity radio button selected!\n");
  //humidity radio button event handler
  datatype = 1;
  ticks = 10;
  updateGraph();
});

$('#uvIndex').on("change", function(){
  console.log("UV Index radio button selected!\n");
  //UVI radio button event handler
  datatype = 2;
  ticks = .5;
  updateGraph();
});

//Air Pressure radio button event handler
$('#pressure').on("change", function(){

  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  if(nodeIndex == 0) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: node 1";
  }
  else if(nodeIndex == 5) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }
  else {
    console.log("Sub Node selected but air pressure compared");
    return;
  }

  // document.getElementById('ComparisonNode').innerHTML = ComparisonArray;
  datatype = 3;
  ticks = 100;
  updateGraph();
});

$('#windSpeed').on("change", function(){

  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  if(nodeIndex == 0) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: node 1";
  }
  else if(nodeIndex == 5) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }
  else {
    console.log("Sub Node selected but air pressure compared");
    return;
  }

  datatype = 4;
  ticks = 5;
  updateGraph();
});

$('#windGust').on("change", function(){

  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  if(nodeIndex == 0) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: node 1";
  }
  else if(nodeIndex == 5) {
    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }
  else {
    console.log("Sub Node selected but air pressure compared");
    return;
  }

  datatype = 6;
  ticks = 5;
  updateGraph();
});

$('#windDirection').on("change", function(){
  console.log("Wind Speed radio button selected!\n");
  //humidity radio button event handler
  if(showWindDirection == 0) {
    showWindDirection = 1;
    $('.windDirectionReadings').show();
  }
  else {
    showWindDirection = 0;
    $('.windDirectionReadings').hide();
  }

  if( showWindDirection == 1 || showAqi == 1) {
    $('.node1SuperReadings').show();
    $('.node2SuperReadings').show();
  }
  else {
    $('.node1SuperReadings').hide();
    $('.node2SuperReadings').hide();
  }

});

$('#aqi').on("change", function(){
  console.log("Wind Speed radio button selected!\n");
  //humidity radio button event handler
  if(showAqi == 0) {
    showAqi = 1;
    $('.aqiReadings').show();
  }
  else {
    showAqi = 0;
    $('.aqiReadings').hide();
  }

  if( showWindDirection == 1 || showAqi == 1) {
    $('.node1SuperReadings').show();
    $('.node2SuperReadings').show();
  }
  else {
    $('.node1SuperReadings').hide();
    $('.node2SuperReadings').hide();
  }

});







//================================================================================
// Functions
//================================================================================

/*
|--------------------------------------------------------------------------
| Function Name
|--------------------------------------------------------------------------
|
| Description of function
|
| Inputs:
| Return:
|
|
*/


function NodeAlteration() {
    // $.getJSON('Node_Json_Data/MasterData.json', function (data)
    // {
    //   var tmpdata = data;
    // });
    var jsonarray = ["node 1","node 2","node 3","node 4","node 5","node 6","node 7","node 8","node 9","node 10"];
    nodeIndex = 0;
    ComparisonCount = 0;
    finalstring ='';
    document.getElementById('left').onclick = function() {

      // Hide super node readings when a non super node is selected
      if(nodeIndex == 1 || nodeIndex == 6) {
        $( ".super-node-readings" ).show();
      }
      else {
        $( ".super-node-readings" ).hide();
      }

      //console.log(tmpkeys)
      if (nodeIndex >=1)
      {
        nodeIndex = nodeIndex - 1;
      }
      else
      {
        nodeIndex = 9;
      }
        document.getElementById('Nodename').innerHTML = jsonarray[nodeIndex];
    };
    document.getElementById('right').onclick = function() {
      // Hide super node readings when a non super node is selected
      if(nodeIndex == 9 || nodeIndex == 4) {
        $( ".super-node-readings" ).show();
      }
      else {
        $( ".super-node-readings" ).hide();
      }


      if (nodeIndex <9) {
        nodeIndex = nodeIndex + 1;
      }
      else {
        nodeIndex = 0;
      }
        document.getElementById('Nodename').innerHTML = jsonarray[nodeIndex];
    };


    document.getElementById('compare').onclick = function() {

      // If the currently selected node is not a super node and compare is pressed
      // for any of the super node measurements, don't do anything
      if(datatype == 3 || datatype == 4 || datatype == 6) {

        if(nodeIndex == 0 || nodeIndex == 5) {
          console.log("Super Node selected!\n");
        }
        else {
          console.log("Sub Node selected but air pressure compared. compare event handler\n");
          return;
        }
      }

      index = contains.call(ComparisonArray, jsonarray[nodeIndex]); // true
      if (String(index) == 'false') {
        console.log("jsonarray: " + jsonarray + " nodeIndex: " + nodeIndex);
        ComparisonArray[ComparisonCount] = jsonarray[nodeIndex];
        console.log("ComparisonArray: " + ComparisonArray + " ComparisonCount: " + ComparisonCount);
        ComparisonCount = ComparisonCount + 1;

        var arrayLength = ComparisonArray.length;
          if (ComparisonCount == 1)
          {
            finalstring = "Nodes Compared: " + finalstring + String(ComparisonArray[ComparisonCount-1]);
          }
          else
          {
            finalstring = finalstring + ' , ' + String(ComparisonArray[ComparisonCount-1]);
          }
      }


        // document.getElementById('ComparisonNode').innerHTML = finalstring;
        updateGraph();
    };

    document.getElementById('clear').onclick = function() {
      ComparisonArray = [];
        // document.getElementById('ComparisonNode').innerHTML = ComparisonArray;
        ComparisonCount = 0;
        finalstring = '';
        updateGraph();
    };
    document.getElementById('Nodename').innerHTML = jsonarray[nodeIndex];


    // console.log(Object.keys(tmpdata));
}

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};




function AveragePictures() {


    // console.log(Object.keys(tmpdata));
    var avgtmp = 88;
    var avghumid = 68;
    var avgUV = 2;



    var Temperture = document.getElementById("TemperturePics");
    var Humidity = document.getElementById("HumidityPics");
    var UVIndex = document.getElementById("UVIndexPics");



    document.getElementById('Node1TempData').innerHTML = 70;
    document.getElementById('Node2TempData').innerHTML = 73;
    document.getElementById('Node3TempData').innerHTML = 71;
    document.getElementById('Node4TempData').innerHTML = 75;
    document.getElementById('Node5TempData').innerHTML = 78;
    document.getElementById('Node6TempData').innerHTML = 78;
    document.getElementById('Node7TempData').innerHTML = 78;
    document.getElementById('Node8TempData').innerHTML = 78;
    document.getElementById('Node9TempData').innerHTML = 78;
    document.getElementById('Node10TempData').innerHTML = 78;

    document.getElementById('Node1HumidData').innerHTML = 70;
    document.getElementById('Node2HumidData').innerHTML = 73;
    document.getElementById('Node3HumidData').innerHTML = 71;
    document.getElementById('Node4HumidData').innerHTML = 75;
    document.getElementById('Node5HumidData').innerHTML = 78;
    document.getElementById('Node6HumidData').innerHTML = 78;
    document.getElementById('Node7HumidData').innerHTML = 78;
    document.getElementById('Node8HumidData').innerHTML = 78;
    document.getElementById('Node9HumidData').innerHTML = 78;
    document.getElementById('Node10HumidData').innerHTML = 78;

    document.getElementById('Node1UVData').innerHTML = 4;
    document.getElementById('Node2UVData').innerHTML = 3;
    document.getElementById('Node3UVData').innerHTML = 7;
    document.getElementById('Node4UVData').innerHTML = 2;
    document.getElementById('Node5UVData').innerHTML = 5;
    document.getElementById('Node6UVData').innerHTML = 3;
    document.getElementById('Node7UVData').innerHTML = 2;
    document.getElementById('Node8UVData').innerHTML = 8;
    document.getElementById('Node9UVData').innerHTML = 6;
    document.getElementById('Node10UVData').innerHTML = 3;

    document.getElementById('AVGTempData').innerHTML = 88;
    document.getElementById('AVGHumidData').innerHTML = 68;
    document.getElementById('AVGUVData').innerHTML = 2;

    if (avgtmp > 85)
    {
      Temperture.src="./img/side-panel/Temp3.png";
    }
    else if (avgtmp > 70)
    {
      Temperture.src="./img/side-panel/Temp2.png";
    }
    else if(avgtmp > 50)
    {
        Temperture.src="./img/side-panel/Temp1.png";
    }
    else
    {
        Temperture.src="./img/side-panel/Temp0.png";
    }

    if (avghumid > 85)
    {
      Humidity.src="./img/side-panel/HumidityLevel3.png";
    }
    else if (avghumid > 70)
    {
      Humidity.src="./img/side-panel/HumidityLevel2.png";
    }
    else if (avghumid > 50)
    {
        Humidity.src="./img/side-panel/HumidityLevel1.png";
    }
    else
    {
        Humidity.src="./img/side-panel/HumidityLevel0.png";
    }

    if (avgUV > 7)
    {
      UVIndex.src="./img/side-panel/UV3.png";
    }
    else if (avgUV > 4)
    {
      UVIndex.src="./img/side-panel/UV2.png";
    }
    else
    {
      UVIndex.src="./img/side-panel/UV1.png";
    }

}

//endregion: End of Yusuf's Collapsed









//---------------------------------------------------------------------------------------
//endregion: End of Yusuf's checkboxes







// region: Kevin's Heatmap
//---------------------------------------------------------------------------------------

//================================================================================
// Event Handlers
//================================================================================


//================================================================================
// Functions

  /*
  |--------------------------------------------------------------------------
  | initMap
  |--------------------------------------------------------------------------
  |
  | Initializes Google Map API.
  |
  | Inputs: lat,lng, and marker
  | Return: Map and heatmap
  */

function initMap() {
    var infoFlag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 19,
      center: centerMap,
      mapTypeId: 'satellite'
    });
    marker1 = new google.maps.Marker({
        position: {lat: 32.777756, lng: -117.070581},
        label: '1',
        map: map
    });
    var content1 = '<div id="content">'+
        '<h2>Super Node 1</h2>'+
        '<div><b>Temperature: </b>' + averageHeat[0] + '<br>'+
        '<b>Humidity: </b>' + averageHumidity[0] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[0] +'<br>'+
        '<b>Wind Speed: </b>'+ averageWindSpeed[0] +' MPH <br>'+
        '<b>AQI Level: </b>Good<br>'+
        '<b>Deployment Details: </b>Top of engineering building<br>'+
        '</div>'+
        '</div>';
    var info1 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content1 + '</div>',
      maxWidth: 300
    });
    marker1.addListener('click', function() {
      if(infoFlag[0] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 0){
            infoFlag[i] = 0;
          }
        }
        infoFlag[0] = 1;
        info1.open(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info1.close(map, marker1);
        infoFlag[0] = 0;
      }
    });
    marker2 = new google.maps.Marker({
        position: {lat: 32.777003, lng: -117.070759},
        label: '2',
        map: map
    });
    var content2 = '<div id="content">'+
        '<h2>Sub Node 1</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[1] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[1] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[1] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info2 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content2 + '</div>',
      maxWidth: 300
    });
    marker2.addListener('click', function() {
      if(infoFlag[1] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 1){
            infoFlag[i] = 0;
          }
        }
        infoFlag[1] = 1;
        info1.close(map, marker1);
        info2.open(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info2.close(map, marker2);
        infoFlag[1] = 0;
      }
    });
    marker3 = new google.maps.Marker({
        position: {lat: 32.777261, lng: -117.070789},
        label: '3',
        map: map
    });
    var content3 = '<div id="content">'+
        '<h2>Sub Node 2</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[2] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[2] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[2] +'<br>'+
        '<b>Deployment Details: </b>Ziptied on tree<br>'+
        '</div>'+
        '</div>';
    var info3 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content3 + '</div>',
      maxWidth: 300
    });
    marker3.addListener('click', function() {
      if(infoFlag[2] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 2){
            infoFlag[i] = 0;
          }
        }
        infoFlag[2] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.open(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info3.close(map, marker3);
        infoFlag[2] = 0;
      }
    });
    marker4 = new google.maps.Marker({
        position: {lat: 32.776814, lng: -117.070793},
        label: '4',
        map: map
    });
    var content4 = '<div id="content">'+
        '<h2>Sub Node 3</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[3] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[3] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[3] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info4 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content4 + '</div>',
      maxWidth: 300
    });
    marker4.addListener('click', function() {
      if(infoFlag[3] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 3){
            infoFlag[i] = 0;
          }
        }
        infoFlag[3] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.open(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info4.close(map, marker4);
        infoFlag[3] = 0;
      }
    });
    marker5 = new google.maps.Marker({
        position: {lat: 32.777381, lng: -117.070581},
        label: '5',
        map: map
    });
    var content5 = '<div id="content">'+
        '<h2>Sub Node 4</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[4] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[4] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[4] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info5 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content5 + '</div>',
      maxWidth: 300
    });
    marker5.addListener('click', function() {
      if(infoFlag[4] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 4){
            infoFlag[i] = 0;
          }
        }
        infoFlag[4] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.open(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info5.close(map, marker5);
        infoFlag[4] = 0;
      }
    });
    marker6 = new google.maps.Marker({
        position: {lat: 32.776685, lng: -117.070227},
        label: '6',
        map: map
    });
    var content6 = '<div id="content">'+
        '<h2>Super Node 2</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[5] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[5] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[5] +'<br>'+
        '<b>Wind Speed: </b>'+ averageWindSpeed[5] +' MPH <br>'+
        '<b>AQI Level: </b>Moderate<br>'+
        '<b>Deployment Details: </b>Top of physics building<br>'+
        '</div>'+
        '</div>';
    var info6 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content6 + '</div>',
      maxWidth: 300
    });
    marker6.addListener('click', function() {
      if(infoFlag[5] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 5){
            infoFlag[i] = 0;
          }
        }
        infoFlag[5] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.open(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info6.close(map, marker6);
        infoFlag[5] = 0;
      }
    });
    marker7 = new google.maps.Marker({
        position: {lat: 32.776912, lng: -117.071473},
        label: '7',
        map: map
    });
    var content7 = '<div id="content">'+
        '<h2>Sub Node 5</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[6] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[6] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[6] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info7 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content7 + '</div>',
      maxWidth: 300
    });
    marker7.addListener('click', function() {
      if(infoFlag[6] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 6){
            infoFlag[i] = 0;
          }
        }
        infoFlag[6] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.open(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info7.close(map, marker7);
        infoFlag[6] = 0;
      }
    });
    marker8 = new google.maps.Marker({
        position: {lat: 32.777072, lng: -117.070298},
        label: '8',
        map: map
    });
    var content8 = '<div id="content">'+
        '<h2>Sub Node 6</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[7] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[7] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[7] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info8 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content8 + '</div>',
      maxWidth: 300
    });
    marker8.addListener('click', function() {
      if(infoFlag[7] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 7){
            infoFlag[i] = 0;
          }
        }
        infoFlag[7] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.open(map, marker8);
        info9.close(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info8.close(map, marker8);
        infoFlag[7] = 0;
      }
    });
    marker9 = new google.maps.Marker({
        position: {lat: 32.776858, lng: -117.071270},
        label: '9',
        map: map
    });
    var content9 = '<div id="content">'+
        '<h2>Sub Node 7</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[8] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[8] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[8] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info9 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content9 + '</div>',
      maxWidth: 300
    });
    marker9.addListener('click', function() {
      if(infoFlag[8] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 8){
            infoFlag[i] = 0;
          }
        }
        infoFlag[8] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.open(map, marker9);
        info10.close(map, marker10);
      }
      else{
        info9.close(map, marker9);
        infoFlag[8] = 0;
      }
    });
    marker10 = new google.maps.Marker({
        position: {lat: 32.777088, lng: -117.071203},
        label: '10',
        map: map
    });
    var content10 = '<div id="content">'+
        '<h2>Sub Node 8</h2>'+
        '<div><b>Temperature: </b>'+ averageHeat[9] +'<br>'+
        '<b>Humidity: </b>'+ averageHumidity[9] +'<br>'+
        '<b>UV Index: </b>'+ averageUV[9] +'<br>'+
        '<b>Deployment Details: </b>Ziptied to light post<br>'+
        '</div>'+
        '</div>';
    var info10 = new google.maps.InfoWindow({
      content: '<div style="overflow:hidden">' + content10 + '</div>',
      maxWidth: 300
    });
    marker10.addListener('click', function() {
      if(infoFlag[9] == 0){
        for(var i = 0; i < 10; i++){
          if(i != 9){
            infoFlag[i] = 0;
          }
        }
        infoFlag[9] = 1;
        info1.close(map, marker1);
        info2.close(map, marker2);
        info3.close(map, marker3);
        info4.close(map, marker4);
        info5.close(map, marker5);
        info6.close(map, marker6);
        info7.close(map, marker7);
        info8.close(map, marker8);
        info9.close(map, marker9);
        info10.open(map, marker10);
      }
      else{
        info10.close(map, marker10);
        infoFlag[9] = 0;
      }
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: tempPoints(),
      radius: 50,
      maxIntensity: 100,
      map: map
    });
}

function tempPoints() {
  return [
    {location: new google.maps.LatLng(32.777756, -117.070581), weight: averageHeat[0]},
    {location: new google.maps.LatLng(32.777003, -117.070759), weight: averageHeat[1]},
    {location: new google.maps.LatLng(32.777261, -117.070789), weight: averageHeat[2]},
    {location: new google.maps.LatLng(32.776814, -117.070793), weight: averageHeat[3]},
    {location: new google.maps.LatLng(32.777381, -117.070581), weight: averageHeat[4]},
    {location: new google.maps.LatLng(32.776685, -117.070227), weight: averageHeat[5]},
    {location: new google.maps.LatLng(32.776912, -117.071473), weight: averageHeat[6]},
    {location: new google.maps.LatLng(32.777072, -117.070298), weight: averageHeat[7]},
    {location: new google.maps.LatLng(32.776858, -117.071270), weight: averageHeat[8]},
    {location: new google.maps.LatLng(32.777088, -117.071203), weight: averageHeat[9]}
  ];}

//---------------------------------------------------------------------------------------
//endregion: End of Kevin's Heatmap




// region: Philippe's Graph
//---------------------------------------------------------------------------------------

//================================================================================
// Event Handlers
//================================================================================



//================================================================================
// Functions
//================================================================================

/*
|--------------------------------------------------------------------------
| Function Name
|--------------------------------------------------------------------------
|
| Description of function
|
| Inputs:
| Return:
|
|
*/
function updateGraph() {

// Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/MasterData.json', function (data) {
    // Print temp reading for lower bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

    // Fill Graph array with minimum timestamp
    var timeStampFull = [];

    //Clear arrays
    minset = [];
    maxset = [];
    plotData = [];
    plotData1 = [];
    plotData2 = [];
    plotData3 = [];
    plotData4 = [];
    plotData5 = [];
    plotData6 = [];
    plotData7 = [];
    plotData8 = [];
    plotData9 = [];
    plotData10 = [];


    timeStampFull.push(timeStampMin);

    for (var counter = 0; counter < timeStampMid.length; counter++) {

      var tempString = timeStampMid[counter];
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);

      // Fill Graph array with middle timestamps
      timeStampFull.push(tempString);
    }

    // Print temp reading for upper bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);

    // Fill Graph array with maximum timestamp
    timeStampFull.push(timeStampMax);


    for(var counter2 = 0; counter2 < timeStampFull.length; counter2++) {

      var datePoint = new Date(timeStampFull[counter2]).getTime();
      var dataPoint1 = data[chosenNodes[0]][0][timeStampFull[counter2]][datatype];
      var dataPoint2 = data[chosenNodes[1]][0][timeStampFull[counter2]][datatype];
      var dataPoint3 = data[chosenNodes[2]][0][timeStampFull[counter2]][datatype];
      var dataPoint4 = data[chosenNodes[3]][0][timeStampFull[counter2]][datatype];
      var dataPoint5 = data[chosenNodes[4]][0][timeStampFull[counter2]][datatype];
      var dataPoint6 = data[chosenNodes[5]][0][timeStampFull[counter2]][datatype];
      var dataPoint7 = data[chosenNodes[6]][0][timeStampFull[counter2]][datatype];
      var dataPoint8 = data[chosenNodes[7]][0][timeStampFull[counter2]][datatype];
      var dataPoint9 = data[chosenNodes[8]][0][timeStampFull[counter2]][datatype];
      var dataPoint10 = data[chosenNodes[9]][0][timeStampFull[counter2]][datatype];

      // plotData.push(date in milliseconds, Temperature reading)
      plotData1.push(new Array(datePoint, dataPoint1));
      plotData2.push(new Array(datePoint, dataPoint2));
      plotData3.push(new Array(datePoint, dataPoint3));
      plotData4.push(new Array(datePoint, dataPoint4));
      plotData5.push(new Array(datePoint, dataPoint5));
      plotData6.push(new Array(datePoint, dataPoint6));
      plotData7.push(new Array(datePoint, dataPoint7));
      plotData8.push(new Array(datePoint, dataPoint8));
      plotData9.push(new Array(datePoint, dataPoint9));
      plotData10.push(new Array(datePoint, dataPoint10));
    }



      /***********   GRAPH   **************/

     data1 = [];
     data2 = [];
     data3 = [];
     data4 = [];
     data5 = [];
     data6 = [];
     data7 = [];
     data8 = [];
     data9 = [];
     data10 = [];
     dataset = [];

  var data1 =
  {

    label: "node 1",
    data: plotData1,
    color: "#000000"

  };

  var data2 =
  {

    label: "node 2",
    data: plotData2,
    color: "#FF0000"

  };

  var data3 =
  {

    label: "node 3",
    data: plotData3,
    color: "#00BB00"

  };

  var data4 =
  {

    label: "node 4",
    data: plotData4,
    color: "#0000FF"

  };

  var data5 =
  {

    label: "node 5",
    data: plotData5,
    color: "#FFBBFF"

  };

  var data6 =
  {

    label: "node 6",
    data: plotData6,
    color: "#00FFFF"

  };

  var data7 =
  {

    label: "node 7",
    data: plotData7,
    color: "#FFFF00"

  };

  var data8 =
  {

    label: "node 8",
    data: plotData8,
    color: "#B0B0B0"

  };

  var data9 =
  {

    label: "node 9",
    data: plotData9,
    color: "#4B0066"

  };

  var data10 =
  {

    label: "node 10",
    data: plotData10,
    color: "#FF8000"

  };

  //Taking range of y-values from each set of plotData
  var yrange1 = plotData1.map(function(range1){return range1[1];});
  var yrange2 = plotData2.map(function(range2){return range2[1];});
  var yrange3 = plotData3.map(function(range3){return range3[1];});
  var yrange4 = plotData4.map(function(range4){return range4[1];});
  var yrange5 = plotData5.map(function(range5){return range5[1];});
  var yrange6 = plotData6.map(function(range6){return range6[1];});
  var yrange7 = plotData7.map(function(range7){return range7[1];});
  var yrange8 = plotData8.map(function(range8){return range8[1];});
  var yrange9 = plotData9.map(function(range9){return range9[1];});
  var yrange10 = plotData10.map(function(range10){return range10[1];});

  for(var i = 0; i < ComparisonArray.length; i++)
  {

    if(ComparisonArray[i] == "node 1")
    {
      dataset.push(data1);
      minset.push(Math.min.apply(null,yrange1));
      maxset.push(Math.max.apply(null,yrange1));
    }

    if(ComparisonArray[i] == "node 2")
    {
      dataset.push(data2);
      minset.push(Math.min.apply(null,yrange2));
      maxset.push(Math.max.apply(null,yrange2));
    }

    if(ComparisonArray[i] == "node 3")
    {
      dataset.push(data3);
      minset.push(Math.min.apply(null,yrange3));
      maxset.push(Math.max.apply(null,yrange3));
    }

    if(ComparisonArray[i] == "node 4")
    {
      dataset.push(data4);
      minset.push(Math.min.apply(null,yrange4));
      maxset.push(Math.max.apply(null,yrange4));
    }

    if(ComparisonArray[i] == "node 5")
    {
      dataset.push(data5);
      minset.push(Math.min.apply(null,yrange5));
      maxset.push(Math.max.apply(null,yrange5));
    }

    if(ComparisonArray[i] == "node 6")
    {
      dataset.push(data6);
      minset.push(Math.min.apply(null,yrange6));
      maxset.push(Math.max.apply(null,yrange6));
    }

    if(ComparisonArray[i] == "node 7")
    {
      dataset.push(data7);
      minset.push(Math.min.apply(null,yrange7));
      maxset.push(Math.max.apply(null,yrange7));
    }

    if(ComparisonArray[i] == "node 8")
    {
      dataset.push(data8);
      minset.push(Math.min.apply(null,yrange8));
      maxset.push(Math.max.apply(null,yrange8));
    }

    if(ComparisonArray[i] == "node 9")
    {
      dataset.push(data9);
      minset.push(Math.min.apply(null,yrange9));
      maxset.push(Math.max.apply(null,yrange9));
    }

    if(ComparisonArray[i] == "node 10")
    {
      dataset.push(data10);
      minset.push(Math.min.apply(null,yrange10));
      maxset.push(Math.max.apply(null,yrange10));
    }

  }

  ymin = Math.min.apply(null,minset);
  ymax = Math.max.apply(null,maxset);

  console.log("ymin: " + ymin);
  console.log("ymax: " + ymax);
  console.log("ComparisonArray: " + ComparisonArray);
  console.log("data1 " + data1);

    // Setting options variable for plotting graph
    if(timeStampFull.length < ((8*6)+1)) {
      var options = {
          series: {
              lines: { show: true },
              points: {show: true },
          },
          grid: {
              hoverable: true,
              clickable: true
          },
          xaxis:
          {
              mode: "time",
              timeformat: "%m/%d/%y\n %h:%M",
              //min: ((new Date(dateMin).getTime() - 600000*6*7)),
              //max: ((new Date(dateMax).getTime() - 600000*6*7))
              min: new Date(dateMin).getTime(),
              max: new Date(dateMax).getTime(),
              timezone: "browser"
          },

          yaxis:
          {
              min: ymin - ticks,
        max: ymax + ticks,
        ticksize: ticks
          }
      }
    }
    else {
      var options = {
        series: {
            lines: { show: true },
            points: {show: false },
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        xaxis:
        {
            mode: "time",
            timeformat: "%m/%d/%y\n %h:%M",
            //min: ((new Date(dateMin).getTime() - 600000*6*7)),
            //max: ((new Date(dateMax).getTime() - 600000*6*7))
            min: new Date(dateMin).getTime(),
            max: new Date(dateMax).getTime(),
            timezone: "browser"
        },

        yaxis:
        {
          min: ymin - ticks,
      max: ymax + ticks,
      ticksize: ticks
        }
      }
    }

    /*var dataset = [
      {
         label: chosenNodes[currentNodeIndex],
         data: plotData,
         color: "#FF0000"
      }
    ]*/

    $.plot($("#placeholder"), dataset, options);
    /***********   END OF GRAPH   **************/
  }); // End of getJSON
}

//---------------------------------------------------------------------------------------
//endregion: End of Philippe's Graph