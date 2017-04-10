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
// String variables containing the min and max time stamps
var timeStampMin;
var timeStampMax;

// For Graph
var plotData = new Array();

// Array containing the node names
var chosenNodes = ["node 1", "node 2", "node 3", "node 4", "node 5", "node 6", "node 7", "node 8", "node 9", "node 10"];

// Variable used to select the elements in chosenNodes
var currentNodeIndex = 0;

 // This will contain every timestamp between the slider's chosen minimum
 // and maximum date in string format. This will be in 10 minute increments
var timeStampMid = [];


//================================================================================
// Heatmap Variables
//================================================================================
// Used for the slider ruler text within the slider
var map;
var averageHeat;
  var lat = [32.777262, 32.777003, 32.777261, 32.776814, 32.777381, 32.777599, 32.776912, 32.777072, 32.776858, 32.777088];
  var lng = [-117.070982, -117.070759, -117.070789, -117.070793, -117.070581, -117.070970, -117.071473, -117.070298, -117.071270, -117.071203];
  var marker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//================================================================================
// Slider Variables
//================================================================================
// Used for the slider ruler text within the slider
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var dateMin;
var dateMax;



// region: Brandon's Slider Default Load, Change Slider Button Event Handlers, and Slider Value Changed Event Handler
//---------------------------------------------------------------------------------------



//================================================================================
// Default Constructor for the Slider. Created when the website loads
//================================================================================
$("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 3, 9, 0, 0), max: new Date(2017, 3, 9, 24, 0)},
    defaultValues: {min: new Date(2017, 3, 9, 5, 10), max: new Date(2017, 3, 9, 5, 50)},
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


//================================================================================
// Today Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-today").click(function() {
  $("#dateSlider").dateRangeSlider( {

      //Note, month 0 is January. Month 4, is May.
      bounds: {min: new Date(2017, 3, 9, 0, 0), max: new Date(2017, 1, 3, 9, 0)},
      defaultValues: {min: new Date(2017, 3, 9, 5, 10), max: new Date(2017, 3, 9, 5, 50)},
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

  });
});


//================================================================================
// Day Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-day").click(function() {
  $("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 0, 1), max: new Date(2017, 11, 31)},
    defaultValues: {min: new Date(2017, 0, 10, 0, 0), max: new Date(2017, 3, 20, 0, 0)},
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
      days:1
    },

    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false
  });
});


//================================================================================
// Week Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-week").click(function() {
  $("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 0, 1), max: new Date(2017, 11, 31)},
    defaultValues: {min: new Date(2017, 0, 10), max: new Date(2017, 3, 20)},
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
      weeks:1
    },
    range:{
      min: {days: 7}
    }
  });

});


//================================================================================
// Month Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-month").click(function() {
  $("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 0, 1), max: new Date(2017, 12, 31)},
    defaultValues: {min: new Date(2017, 0, 10), max: new Date(2017, 3, 20)},
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
      months:1
    },
    range:{
      min: {months: 1}
    }
  });
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
    console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

    // Fill Graph array with minimum timestamp
    var timeStampFull = [];
    plotData = [];
    timeStampFull.push(timeStampMin);

    for (var counter = 0; counter < timeStampMid.length; counter++) {

      var tempString = timeStampMid[counter];
      console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);

      // Fill Graph array with middle timestamps
      timeStampFull.push(tempString);
    }

    // Print temp reading for upper bound timestamp
    console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);

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
    // DISPLAY READINGS ON HTML
    //update div element to display new readings
    var div = document.getElementById('temp-demo');

    // For Kevin's Heatmap, this is a single reading. It is the
    var heatMapMin = data[chosenNodes[currentNodeIndex]][0][timeStampMin][0];
    var heatMapMax = data[chosenNodes[currentNodeIndex]][0][timeStampMax][0];
    averageHeat = ((heatMapMin + heatMapMax)/2);
    averageHeat = averageHeat.toInt();
    console.log("Average heat between min and max: " + averageHeat);

    /***********   PLACE HEATMAP UPDATE HERE USING averageHeat   **************/

    /***********   HEATMAP END   **************/


    /***********   PHILIPPE'S GRAPH   **************/
        // var dataset = [
        // {
        //     label: "node 10",
        //     data: plotdata,
        //     color: "#FF0000"
        // },
        // {
        //     label: "node 5",
        //     data: plotdata2,
        //     color: "#0000FF"
        // },
        // {
        //     label: "node 1",
        //     data: plotdata3,
        //     color: "#00FF00"
        // }
        //     ];//End of var dataset declaration


        var dataset = [
          {
             label: chosenNodes[currentNodeIndex],
             data: plotData,
             color: "#FF0000"
          }
        ]

        $.plot($("#placeholder"), dataset, {
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
                max: new Date(dateMax).getTime()
            },

            yaxis:
            {
                min: 45,
                max: 95,
                tickSize: 5
            }
        });

    /***********   END OF GRAPH   **************/

    // Display readings on page
    div.innerHTML = ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]) + "\n";
    for (counter = 0; counter < timeStampMid.length; counter++) {
      var tempString = timeStampMid[counter];
      div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]) + "\n";
    }
    div.innerHTML = div.innerHTML + ("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]) + "\n";

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

    for(var i = 0; i <= 10; i++){
    marker[i] =  new google.maps.Marker({
        position: {lat: lat[i], lng: lng[i]},
        label: (i+1).toString(),
        map: map
    });
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: tempPoints(),
      radius: 50,
      maxIntensity: 100,
      map: map
    });
  }

  function tempPoints(){
    return[
    {location: new google.maps.LatLng(lat[0], lng[0]), weight: averageHeat}
  ]};

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