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

// Array containing the node names
var chosenNodes = ["node 1", "node 2", "node 3", "node 4", "node 5", "node 6", "node 7", "node 8", "node 9", "node 10"];

// Variable used to select the elements in chosenNodes
var currentNodeIndex = 0;


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
var ticks;

// Initialize to temperature
var datatype = 0;

//================================================================================
// Multiple Node Selection Variables
//================================================================================
var ComparisonArray = [];

//================================================================================
// Heatmap Variables
//================================================================================
// Used for the slider ruler text within the slider
var map;
var averageHeat = new Array();

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
              min: 45,
              max: 95,
              tickSize: 5
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
            min: 45,
            max: 95,
            tickSize: 5
        }
      }
    }

    var dataset = [
      {
         label: chosenNodes[currentNodeIndex],
         data: plotData,
         color: "#FF0000"
      }
    ]

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
      var testTimeStamps = [];



      testTimeStamps = Object.keys(data[chosenNodes[currentNodeIndex]][0]);

      //console.log("testTimeStamps: " + testTimeStamps + "\n");

      testTimeStamps.forEach(function(element) {
          //console.log(element + "\n");
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

      var heatMapMin = data[chosenNodes[i]][0][timeStampMin][0];
      var heatMapMax = data[chosenNodes[i]][0][timeStampMax][0];
      var tempVariable = ((heatMapMin + heatMapMax)/2);
      // console.log("tempvar before rounding: "+ tempVariable);
      tempVariable = Math.round(tempVariable);
      // console.log("tempvar after rounding: "+ tempVariable);
      averageHeat[i] = tempVariable;

      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      // console.log("min: " + heatMapMin + "max: "+ heatMapMax);
      // console.log("Updating heatmap reading for node " + (i+1) + ": " + averageHeat[i]);
      }

      initMap();
      /***********   HEATMAP END   **************/

       /***********   GRAPH   **************/


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
                min: 45,
                max: 95,
                tickSize: 5
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
              min: 45,
              max: 95,
              tickSize: 5
          }
        }
      }

      var dataset = [
        {
           label: chosenNodes[currentNodeIndex],
           data: plotData,
           color: "#FF0000"
        }
      ]

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



$('#Temperature').on("change", function(){
  console.log("Temperature radio button selected!\n");
  //temperature radio button event handler
  datatype = 0;
  ticks = 5;

});

$('#Humidity').on("change", function(){
  console.log("Humidity radio button selected!\n");
  //humidity radio button event handler
  datatype = 1;
  ticks = 10;

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
    var i = 0;
    var ComparisonCount = 0;
    var finalstring ='';
    document.getElementById('left').onclick = function()
    {
      //console.log(tmpkeys)
      if (i >=1)
      {
        i = i - 1;
      }
      else
      {
        i = 9;
      }
        document.getElementById('Nodename').innerHTML = jsonarray[i];
    };
    document.getElementById('right').onclick = function()
    {
      if (i <9)
      {
        i = i + 1;
      }
      else
      {
        i = 0;
      }
        document.getElementById('Nodename').innerHTML = jsonarray[i];
    };


    document.getElementById('compare').onclick = function()
    {
      index = contains.call(ComparisonArray, jsonarray[i]); // true
      if (String(index) == 'false')
      {
        console.log("jsonarray: " + jsonarray + " i: " + i);
        ComparisonArray[ComparisonCount] = jsonarray[i];
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
        document.getElementById('ComparisonNode').innerHTML = finalstring;
    };
    document.getElementById('clear').onclick = function()
    {
      ComparisonArray= [];
        document.getElementById('ComparisonNode').innerHTML = ComparisonArray;
        ComparisonCount = 0;
        finalstring = '';
    };
    document.getElementById('Nodename').innerHTML = jsonarray[i];

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
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 19,
      center: {lat: 32.777262, lng: -117.070982},
      mapTypeId: 'satellite'
    });
    marker1 = new google.maps.Marker({
        position: {lat: 32.777756, lng: -117.070581},
        label: '1',
        map: map
    });
    var content1 = '<div id="content">'+
        '<h2>Super Node 1</h2>'+
        '<div><b>Temperature: 75</b><br>'+
        '<b>Humidity: 55</b><br>'+
        '<b>UV Index: 2</b><br>'+
        '<b>Wind Speed: 5 MPH</b><br>'+
        '<b>AQI Level: Good</b><br>'+
        '<b>Deployment Details: Top of engineering building</b><br>'+
        '</div>'+
        '</div>';
    var info1 = new google.maps.InfoWindow({
      content: content1,
      maxWidth: 300
    });
    marker1.addListener('click', function() {
      info1.open(map, marker1);
    });
    marker2 = new google.maps.Marker({
        position: {lat: 32.777003, lng: -117.070759},
        label: '2',
        map: map
    });
    var content2 = '<div id="content">'+
        '<h2>Sub Node 1</h2>'+
        '<div><b>Temperature: 77</b>' +'<br>'+
        '<b>Humidity: 60</b><br>'+
        '<b>UV Index: 3</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info2 = new google.maps.InfoWindow({
      content: content2,
      maxWidth: 300
    });
    marker2.addListener('click', function() {
      info2.open(map, marker2);
    });
    marker3 = new google.maps.Marker({
        position: {lat: 32.777261, lng: -117.070789},
        label: '3',
        map: map
    });
    var content3 = '<div id="content">'+
        '<h2>Sub Node 2</h2>'+
        '<div><b>Temperature: 70</b>' +'<br>'+
        '<b>Humidity: 50</b><br>'+
        '<b>UV Index: 1</b><br>'+
        '<b>Deployment Details: Ziptied on tree</b><br>'+
        '</div>'+
        '</div>';
    var info3 = new google.maps.InfoWindow({
      content: content3,
      maxWidth: 300
    });
    marker3.addListener('click', function() {
      info3.open(map, marker3);
    });
    marker4 = new google.maps.Marker({
        position: {lat: 32.776814, lng: -117.070793},
        label: '4',
        map: map
    });
    var content4 = '<div id="content">'+
        '<h2>Sub Node 3</h2>'+
        '<div><b>Temperature: 73</b>' +'<br>'+
        '<b>Humidity: 58</b><br>'+
        '<b>UV Index: 3</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info4 = new google.maps.InfoWindow({
      content: content4,
      maxWidth: 300
    });
    marker4.addListener('click', function() {
      info4.open(map, marker4);
    });
    marker5 = new google.maps.Marker({
        position: {lat: 32.777381, lng: -117.070581},
        label: '5',
        map: map
    });
    var content5 = '<div id="content">'+
        '<h2>Sub Node 4</h2>'+
        '<div><b>Temperature: 76</b>' +'<br>'+
        '<b>Humidity: 63</b><br>'+
        '<b>UV Index: 4</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info5 = new google.maps.InfoWindow({
      content: content5,
      maxWidth: 300
    });
    marker5.addListener('click', function() {
      info5.open(map, marker5);
    });
    marker6 = new google.maps.Marker({
        position: {lat: 32.776685, lng: -117.070227},
        label: '6',
        map: map
    });
    var content6 = '<div id="content">'+
        '<h2>Super Node 2</h2>'+
        '<div><b>Temperature: 78</b>' +'<br>'+
        '<b>Humidity: 54</b><br>'+
        '<b>UV Index: 3</b><br>'+
        '<b>Wind Direction: 5 MPH</b><br>'+
        '<b>AQI Level: Moderate</b><br>'+
        '<b>Deployment Details: Top of physics building</b><br>'+
        '</div>'+
        '</div>';
    var info6 = new google.maps.InfoWindow({
      content: content6,
      maxWidth: 300
    });
    marker6.addListener('click', function() {
      info6.open(map, marker6);
    });
    marker7 = new google.maps.Marker({
        position: {lat: 32.776912, lng: -117.071473},
        label: '7',
        map: map
    });
    var content7 = '<div id="content">'+
        '<h2>Sub Node 5</h2>'+
        '<div><b>Temperature: 77</b>' +'<br>'+
        '<b>Humidity: 55</b><br>'+
        '<b>UV Index: 1</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info7 = new google.maps.InfoWindow({
      content: content7,
      maxWidth: 300
    });
    marker7.addListener('click', function() {
      info7.open(map, marker7);
    });
    marker8 = new google.maps.Marker({
        position: {lat: 32.777072, lng: -117.070298},
        label: '8',
        map: map
    });
    var content8 = '<div id="content">'+
        '<h2>Sub Node 6</h2>'+
        '<div><b>Temperature: 80</b>' +'<br>'+
        '<b>Humidity: 58</b><br>'+
        '<b>UV Index: 2</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info8 = new google.maps.InfoWindow({
      content: content8,
      maxWidth: 300
    });
    marker8.addListener('click', function() {
      info8.open(map, marker8);
    });
    marker9 = new google.maps.Marker({
        position: {lat: 32.776858, lng: -117.071270},
        label: '9',
        map: map
    });
    var content9 = '<div id="content">'+
        '<h2>Sub Node 7</h2>'+
        '<div><b>Temperature: 79</b>' +'<br>'+
        '<b>Humidity: 53</b><br>'+
        '<b>UV Index: 3</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info9 = new google.maps.InfoWindow({
      content: content9,
      maxWidth: 300
    });
    marker9.addListener('click', function() {
      info9.open(map, marker9);
    });
    marker10 = new google.maps.Marker({
        position: {lat: 32.777088, lng: -117.071203},
        label: '10',
        map: map
    });
    var content10 = '<div id="content">'+
        '<h2>Sub Node 8</h2>'+
        '<div><b>Temperature: 75</b>' +'<br>'+
        '<b>Humidity: 55</b><br>'+
        '<b>UV Index: 1</b><br>'+
        '<b>Deployment Details: Ziptied to light post</b><br>'+
        '</div>'+
        '</div>';
    var info10 = new google.maps.InfoWindow({
      content: content10,
      maxWidth: 300
    });
    marker10.addListener('click', function() {
      info10.open(map, marker10);
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

//---------------------------------------------------------------------------------------
//endregion: End of Philippe's Graph