//================================================================================
// Global Variables
//================================================================================
var timeStampMin;
var timeStampMax;

// Array containing the node names
var chosenNodes = ["node 1", "node 2", "node 3", "node 4", "node 5", "node 6", "node 7", "node 8", "node 9", "node 10"];
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



// region: Slider Value Changed Event Handler, Slider Default Load, and Change Slider Button Event Handlers
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

  // NOTE: Instead of comparing dates using the operators directly,(dateMin == dateMax),
  // a good practice is to compare the dates but using the milliseconds format.
  // You can obtain milliseconds format using the getTime( ) function.
  // Reference: https://wiki.base22.com/display/btg/How+to+compare+dates+in+JavaScript


  // This will update timeStampMid
  getTimeStamps(dateMin, dateMax);

/* //DEBUG******
  var counter;

  for (counter = 0; counter < timeStampMid.length; counter++) {
    console.log("Reading timeStampMid["+ counter +"]: "+ timeStampMid[counter] + "\n");
  }
*/

  // Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/MasterData.json', function (data) {

    // Make a string of the right format to match the JSON file
    timeStampMin = dateMin.getFullYear() +"-"+ (dateMin.getMonth()+1) +"-"+ dateMin.getDate()  +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
    timeStampMax = dateMax.getFullYear() +"-"+ (dateMax.getMonth()+1) +"-"+ dateMax.getDate() +" "+ dateMax.getHours() +":"+ dateMax.getMinutes();

    console.log("timeStampMin: " + timeStampMin + "\n");
    console.log("timeStampMax: " + timeStampMax + "\n");

    console.log("Node " + (currentNodeIndex+1) + "[0][0][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMin][0]);
    console.log("Node " + (currentNodeIndex+1) + "[0][0][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][0][timeStampMax][0]);
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

  var minCopy = timeMin;
  var maxCopy = timeMax;

  // NOTE: Instead of comparing dates using the operators directly,(dateMin == dateMax),
  // a good practice is to compare the dates but using the milliseconds format.
  // You can obtain milliseconds format using the getTime( ) function.
  // Reference: https://wiki.base22.com/display/btg/How+to+compare+dates+in+JavaScript

/* //DEBUG******
  if(maxCopy.getTime() - minCopy.getTime() > 600000) {
    console.log("Difference is greater than 10 minutes\n");
  }
  else if(maxCopy.getTime() - minCopy.getTime() == 600000) {
    console.log("Difference is exactly 10 minutes");
    minCopy = moment(minCopy).add(10, 'm');
    minCopy.moment().toDate();
    console.log("Added 10 minutes to minCopy: " + minCopy.getMinutes());
  }
*/

  // If the current min and max are the same, simply return
  if(minCopy.getTime() == maxCopy.getTime()) {

    // Clear out timeStampMid
    timeStampMid = [];
    return;
  }

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
    console.log("Calculate inbetween time stamps");

/* //DEBUG******
    // Only loop if the difference in min and max is greater than 10 minutes
    while((maxCopy.getTime() - minCopy.getTime()) > 600000) {

      //timeStampMin = dateMin.getFullYear() +"-"+ (dateMin.getMonth()+1) +"-"+ dateMin.getDate()  +" "+ dateMin.getHours() +":"+ dateMin.getMinutes();
      var tempDate = minCopy;

      tempDate = moment().add(10, 'm');

      minCopy = moment().toDate();

      //minCopy.setMinutes(minCopy.getMinutes() + 10);

      var tempString = minCopy.getFullYear() +"-"+ (minCopy.getMonth()) +"-"+ minCopy.getDate()  +" "+ minCopy.getHours() +":"+ minCopy.getMinutes();

      timeStampMid.push(tempString);
      //minCopy = newDateObj;
    }
*/

    return;
  }

/*
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


