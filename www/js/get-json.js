// when the page has fully loaded
$(document).ready(function () {
  var jsonData = {};
   // if(nodeTimeRA[1]  == "7:40") {
   //    nodeTimeStamp = nodeTimeStamp.replace("7:40", "");
   // }

var nodeTimeStamp22 = "2017-02-19 7:40";

// This is a JQuery shorthand for checking if the button with the id "get-json" was pressed
  $('#get-json').click(function () {

    // The div element where we will display our data
    var showData = $('#show-json');

    // Reading in JSON from the server
    $.getJSON('test-data/test_data_subnodes.json', function (data) {

      console.log("TESTTTT " + data["node 10"][0][nodeTimeStamp22]);
      console.log("TESTTTT " + data["node 10"][0][nodeTimeStamp22]);

      console.log("JSON received from xampp directory test_data_test_data_subnodes.json: " + data["node 10"]);
      console.log("Node 10[0] (Time Stamps): " + data["node 10"][0]);
      console.log("Node 10[0][0] (Readings for selected time): " + data["node 10"][0]["2017-02-19 7:40"]);
      console.log("Node 10[0][0][0] (Temperature): " + data["node 10"][0]["2017-02-19 7:40"][0]);
      console.log("Node 10[0][0][1] (Humidity): " + data["node 10"][0]["2017-02-19 7:40"][1]);
      console.log("Node 10[0][0][2] (UV): " + data["node 10"][0]["2017-02-19 7:40"][2]);
      console.log("Node 10[1] (Latitude): " + data["node 10"][1]);
      console.log("Node 10[2] (Longitude): " + data["node 10"][2]);

      console.log("JSON received from xampp directory test_data_test_data_subnodes.json: " + data["node 11"]);
      console.log("Node 11[0] (Time Stamps): " + data["node 11"][0]);
      console.log("Node 11[0][0] (Readings for selected time): " + data["node 11"][0]["2017-02-21 2:30"]);
      console.log("Node 11[0][0][0] (Temperature): " + data["node 11"][0]["2017-02-21 2:30"][0]);
      console.log("Node 11[0][0][1] (Humidity): " + data["node 11"][0]["2017-02-21 2:30"][1]);
      console.log("Node 11[0][0][2] (UV): " + data["node 11"][0]["2017-02-21 2:30"][2]);
      console.log("Node 11[1] (Latitude): " + data["node 11"][1]);
      console.log("Node 11[2] (Longitude): " + data["node 11"][2]);

      //console.log("JSON received from xampp directory test_data_node10.json: " +);

      /*
      // Print out item's contents in HTML on the webpage
      var items = data.items.map(function (item) {
        return item.key + ': ' + item.value;
      });

      console.log("Printing key value pairs of the 'item' dictionary:");
      // For each object in the items dictionary, print out the key and value pairs
      data.items.forEach(function (item) {
         jsonData.key = item.key;
         jsonData.value = item.value;
         console.log("Key: " + jsonData.key);
         console.log("Value: " + jsonData.value);
      });

      console.log("Printing the 'obj' object:");
      jsonData.object = data.obj
      console.log(jsonData.object);
      console.log("number: " + jsonData.object.number);
      console.log("enabled: " + jsonData.object.enabled);

      console.log("Printing the 'message' key's value:");
      jsonData.message = data.message
      console.log("message: " + jsonData.message);

      // Clears the showdata object before writing into it, so we don't get repeated text
      showData.empty();

      if (items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
*/
    }); // End of $.getJSON

    showData.text('Press F12 to view console output');

  }); // End of $('#get-json').click

}); // End of $(document).ready


// Code for updating webpage without refreshing was based off of this website: http://jsfiddle.net/Low9o0qk/
// Code came from this StackOverFlow answer: http://stackoverflow.com/questions/22577457/update-data-on-a-page-without-refreshing

var i = true;
var refreshSecond = true;
var refreshSecondInterval = 2;
var refreshMinute = false;
var refreshMinuteInterval = 10;
var nodeTimeStamp = "2017-02-21 7:40";
var myDate = new Date(nodeTimeStamp);
var timeDelay;

// Set our timeDelay by the specified seconds
if(refreshSecond == true) {
  // Turn seconds into milliseconds. 1 minute = 1000 milliseconds
  timeDelay = refreshSecondInterval*1000;
}

// Set our timeDelay by the specified minutes
else if(refreshMinute == true) {
  // Turn minutes into milliseconds. 1 minute = 60000 milliseconds
  timeDelay = refreshMinuteInterval*60000;
}

// Use our default interval of 10 minutes
else {
  // Turn 10 minutes into 10 milliseconds. 1 minute = 60000 milliseconds
  timeDelay = 10*60000;
}


// No need to specify document ready
$(function updatePageInfo(){

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

}); // End of $(function updatePageInfo()



/*

  var jsonData2 = {};

  // Get JSON data from the web
  $('#get-data-web').click(function () {
    var showData = $('#show-data-web');

    showData.text('Press F12 and look at console');
    // Reading in JSON data locally
    $.getJSON('https://jsonplaceholder.typicode.com/posts/1', function (data) {
      console.log("JSON received from https://jsonplaceholder.typicode.com/posts/1: " + data);
      console.log("data.userId: " + data.userId);
      console.log("data.id: " + data.id);
      console.log("data.title: " + data.title);
      console.log("data.body: " + data.body);
    });
  });
*/


