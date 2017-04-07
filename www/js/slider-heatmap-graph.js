//================================================================================
// Global Variables
//================================================================================
// String variables containing the min and max time stamps
var timeStampMin;
var timeStampMax;

// Array containing the node names
var chosenNodes = ["node 1", "node 2", "node 3", "node 4", "node 5", "node 6", "node 7", "node 8", "node 9", "node 10"];

// Variable used to select the elements in chosenNodes
var currentNodeIndex = 9;

 // This will contain every timestamp between the slider's chosen minimum
 // and maximum date in string format. This will be in 10 minute increments
var timeStampMid = [];


//================================================================================
// Slider Variables
//================================================================================
// Used for the slider ruler text within the slider
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var dateMin;
var dateMax;



// region: Slider Default Load, Change Slider Button Event Handlers, and Slider Value Changed Event Handler
//---------------------------------------------------------------------------------------



//================================================================================
// Default Constructor for the Slider. Created when the website loads
//================================================================================
$("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 1, 17, 0, 0), max: new Date(2017, 1, 17, 24, 0)},
    defaultValues: {min: new Date(2017, 1, 17, 5, 10), max: new Date(2017, 1, 17, 5, 50)},
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
      bounds: {min: new Date(2017, 1, 17, 0, 0), max: new Date(2017, 1, 17, 24, 0)},
      defaultValues: {min: new Date(2017, 1, 17, 5, 10), max: new Date(2017, 1, 17, 5, 50)},
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
  timeStampMin = dateMin.getFullYear() +"-"+ (dateMin.getMonth()+1) +"-"+ dateMin.getDate()  +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
  timeStampMax = dateMax.getFullYear() +"-"+ (dateMax.getMonth()+1) +"-"+ dateMax.getDate() +" "+ dateMax.getHours() +":"+ dateMax.getMinutes();

  // This will update the timeStampMid array with all of the inbetween timestamps
  getTimeStamps(dateMin, dateMax);

  // Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/MasterData.json', function (data) {

    // Print temp reading for lower bound timestamp
    console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);

    var counter;
    for (counter = 0; counter < timeStampMid.length; counter++) {
      var tempString = timeStampMid[counter];
      console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][tempString][0]);
    }

    // Print temp reading for upper bound timestamp
    console.log("Node " + (currentNodeIndex+1) + "[0]["+ timeStampMax +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);


    // DISPLAY READINGS ON HTML
    //update div element to display new readings
    var div = document.getElementById('temp-demo');

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
      var tempString = minCopy.getFullYear() +"-"+ (minCopy.getMonth()+1) +"-"+ minCopy.getDate()  +" "+ minCopy.getHours() +":"+ minCopy.getMinutes();

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
    //console.log(myDate.getFullYear() +"-"+ myDate.getDate() +"-"+ myDate.getMonth() +" "+ myDate.getHours() +":"+ myDate.getMinutes()+":"+ myDate.getSeconds());

    // load() functions
    var loadUrl = myDate.getFullYear() +"-"+ myDate.getDate() +"-"+ myDate.getMonth() +" "+ myDate.getHours() +":"+ myDate.getMinutes()+":"+ myDate.getSeconds();
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


