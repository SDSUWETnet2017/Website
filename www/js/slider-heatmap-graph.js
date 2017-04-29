//================================================================================
// LEGEND
//================================================================================
// Regions are used to seperate main sections of code ie. slider, graph, map, etc.

// //========= used to specify section within your region to organize topics

// This is used for function definition
// |--------------------------------------------------------------------------
// | Functions
// |--------------------------------------------------------------------------


// region: Initialize Global Variables
//---------------------------------------------------------------------------------------

// Actual timestamps read in dynamically from the JSON file
// This will contain every single time stamp in the JSON file
var MasterDataUnsorted = [];
// This will contain only the time stamps correlating to the slider's selected time frame
var TestMasterDataSorted = [];

// Array used to store all inbetween time stamps desired by the user in the form of actual timestamps in the JSON file
// We will determine which timestamps to snap to for min and max based on sliderSelectedTimeStamps.
// Note that we are pulling these timestamps directly from the JSON file so these timestamps may not be
// perfect 10 minute incrmenets.
var selectedJsonTimeStamps = [];
var selectedJsonMinTimeStamp;
var selectedJsonMaxTimeStamp;

// This will tell us when we should begin filling our selectedJsonTimeStamps array with inbetween timestamps.
// It will be set to 1 once our selectedJsonMinTimeStamp is found and set to 0 once our selectedJsonMaxTimeStamp is found.
var startFilling = 0;
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

// Date object containing the minimum date of the slider
var sliderMinDate;

// Date object containing the maximum date of the slider
var sliderMaxDate;

// All of the timestamp strings currently selected by the slider
// Array used to store all time stamps desired by the user in the form of perfect 10 minute increments
var sliderSelectedTimeStamps = [];
var minimumDate;
var maximumDate;

var superNode1MinImgFilename;
var superNode1MaxImgFilename;

var superNode2MinImgFilename;
var superNode2MaxImgFilename;

// Minimum boundary returned from the time slider
var sliderTimeStampMin;

// This will contain every timestamp between the slider's chosen minimum
// and maximum date in string format. This will be in 10 minute increments
// Used in conjunction with sliderMinDate and sliderMaxDate.
// This is used for timestamps perfectly on 10 minute increments.
// Possibly to be used for graph labels
var sliderTimeStampMid = [];

// Maximum boundary returned from the slider
var sliderTimeStampMax;

// String variables containing the min and max time stamps
var initTimeMin = new Date(2017, 3, 9, 0, 0);
var initTimeMax = new Date(2017, 3, 9, 4, 20);
var todayBoundsMin = new Date(2017, 3, 9);
var todayBoundsMax = new Date(2017, 3, 10);
//---------------------------------------------------------------------------------------
//endregion: Initialize Global Variables


// region: Website Initialization on load
//---------------------------------------------------------------------------------------
$(document).ready(function() {

  // Indicate that this is the very first time the webpage has loaded
  // This will be used by the expand button to first initialize the expnaded
  // view of the side panel
  initialLoad = 0;

  // Initialize collapsed view pictures
  CollapsedViewAverages();

  // Hide super node images on load
  $("#superNode1Images").hide();
  $("#superNode2Images").hide();

  // Reading the .JSON file from the server
  $.getJSON('Node_Json_Data/TestMasterData.json', function (data) {

    // Empty out the master lists
    MasterDataUnsorted = [];
    TestMasterDataSorted = [];

    // This is necessary on load in order to populate the heat map when the website is first loaded
    /***********   Slider Time Stamp Creation   **************/
    // Array used to store all time stamps desired by the user in the form of perfect 10 minute increments
    sliderSelectedTimeStamps = [];

    // Initialize the slider's min and max to the initTime variables. These will be used by the heatmap
    sliderMinDate = new Date(initTimeMin);
    sliderMaxDate = new Date(initTimeMax);

    // ***** Form the time stamps strings for perfect 10 minute increments *****
    // Create a string for the minimum and maximum timestamps
    sliderTimeStampMin = (sliderMinDate.getMonth()+1) +"/"+ sliderMinDate.getDate() +"/"+  sliderMinDate.getFullYear() +" "+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();
    sliderTimeStampMax = (sliderMaxDate.getMonth()+1) +"/"+ sliderMaxDate.getDate() +"/"+ sliderMaxDate.getFullYear() +" "+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();

    // This will update the sliderTimeStampMid array with all of the inbetween timestamps
    getTimeStamps(sliderMinDate, sliderMaxDate);

    // Fill slider array with minimum timestamp
    sliderSelectedTimeStamps.push(sliderTimeStampMin);

    for (var counter = 0; counter < sliderTimeStampMid.length; counter++) {
      var tempString = sliderTimeStampMid[counter];

      // Fill slider array with middle timestamps
      sliderSelectedTimeStamps.push(tempString);
    }

    // Fill slider array with maximum timestamp
    sliderSelectedTimeStamps.push(sliderTimeStampMax);
    /***********   Slider Time Stamp Creation End  **************/

    /***********   JSON Selected Time Stamp Creation  **************/
    // Array used to store all time stamps desired by the user in the form of actual timestamps in the JSON file
    selectedJsonTimeStamps = [];
    startFilling = 0;
    MasterDataUnsorted = Object.keys(data[chosenNodes[currentNodeIndex]]);

    // Cycle through each element of the dynamically read in timestamps and being populating a 0 padded sorted version
    MasterDataUnsorted.forEach(function(element) {
      var tempDate = new Date(element);

      // *** Very important to add 1 to account for month offset! ***
      tempDate.setMonth(tempDate.getMonth() + 1);
      var tempDateString;

      // Add 0 padding so the timestamps can be sorted properly using the .sort function
      // Make sure you add 1 month since month starts at 1
      tempDateString = ('0' + (tempDate.getMonth())).slice(-2) + '/' + ('0' + tempDate.getDate()).slice(-2) + '/' +  tempDate.getFullYear() +" "+ ('0' + tempDate.getHours()).slice(-2) +":"+ ('0' + tempDate.getMinutes()).slice(-2);
      TestMasterDataSorted.push(tempDateString);

    }); // End of cycling through each of the timestamps from the JSON file

    // Now that we have all of the timestamps, sort them. The 0 padding is necessary for this to work properly
    TestMasterDataSorted.sort();

    // Cycle through the sorted master data and begin filling your selectedJsonTimeStamps array with the dynamic timestamps
    // This loop will break once the correlated maximum value of the slider timeframe is selected.
    for(var element of TestMasterDataSorted) {

      // By creating a new date using the 0 padded timestamps, tempDate will become unpadded, which is what we want in order to read the json file
      var tempDate = new Date(element);
      var tempDateString = ((tempDate.getMonth()+1) +"/"+ tempDate.getDate() +"/"+  tempDate.getFullYear() +" "+ tempDate.getHours() +":"+ tempDate.getMinutes());

      // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
      // We take the actual timestamp received from the JSON file and subtract the exact 10 minute increment and populate
      // the selectedJsonMinTimeStamp and selectedJsonMaxTimeStamp if the current timestamp is within 0 and 9 minutes difference.
      if(((tempDate.getTime() - sliderMinDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMinDate.getTime()) < 600000)) {
        startFilling = 1;
        selectedJsonMinTimeStamp = tempDateString;
      }
      // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
      else if(((tempDate.getTime() - sliderMaxDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMaxDate.getTime()) < 600000)) {
        startFilling = 0;

        // Push the last element into the array before breaking out of this loop
        selectedJsonTimeStamps.push(tempDateString);
        selectedJsonMaxTimeStamp = tempDateString;

        // There's no sense in continuing searching our sorted master data since the maximum time stamp has been found
        break;
      }

      // If the minimum was found, begin populating selectedJsonTimeStamps with the timestamp strings
      if(startFilling == 1) {
        selectedJsonTimeStamps.push(tempDateString);
      }
    } // End of for loop
    /***********   JSON Selected Time Stamp Creation End  **************/

    /***********   HEATMAP   **************/
    for(var i=0; i < 10; i++) {

      // For Kevin's Heatmap, this is a single reading. It is the
      var heatMapMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][0];
      var heatMapMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][0];
      var tempVariable = ((heatMapMin + heatMapMax)/2);

      tempVariable = Math.round(tempVariable);
      averageHeat[i] = tempVariable;

      var humidMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][1];
      var humidMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][1];

      tempVariable = ((humidMin + humidMax)/2);
      averageHumidity[i] = Math.round(tempVariable);

      var UVMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][2];
      var UVMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][2];
      averageUV[i] = ((UVMin + UVMax)/2);

      if(i == 0 || i == 5){
        var windspeedMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][4];
        var windspeedMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][4];
        tempVariable = ((windspeedMin + windspeedMax)/2);
        averageWindSpeed[i] = Math.round(tempVariable);
      }
    }

    // Initialize the center of the heat map
    centerMap = {lat: 32.777262, lng: -117.070982};
    initMap();
    /***********   HEATMAP END   **************/
  }); // End of $.getJSON
}); // End of Document.Ready
//---------------------------------------------------------------------------------------
//endregion: Website initialization on load



// region: Brandon's Slider Default Load, Change Slider Button Event Handlers, and Slider Value Changed Event Handler
//---------------------------------------------------------------------------------------

//================================================================================
// Today Change Slider Button Pressed Event Handler
//================================================================================
$("#btn-today").click(function() {

  var todayBoundsMin = new Date(2017, 3, 9);
  var todayBoundsMax = new Date(2017, 3, 10);
  var initTodayMin = new Date(2017, 3, 9, 0, 0);
  var initTodayMax = new Date(2017, 3, 9, 4, 20);

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

  var dayBoundsMin = new Date(2017, 3, 8);
  var dayBoundsMax = new Date(2017, 3, 13);
  var initDayMin = new Date(2017, 3, 9);
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

  /***********   Slider Time Stamp Creation   **************/
  // Array used to store all time stamps desired by the user in the form of perfect 10 minute increments
  sliderSelectedTimeStamps = [];

  // Initialize with the currently selected values
  sliderMinDate = new Date(data.values.min);
  sliderMaxDate = new Date(data.values.max);


  // *** Create file paths for min and max images from raspberry pi camera ***
  superNode1MinImgFilename =(sliderMinDate.getMonth()+1) +"_"+ sliderMinDate.getDate() +"_"+  sliderMinDate.getFullYear() +"_"+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();
  superNode2MinImgFilename =(sliderMinDate.getMonth()+1) +"_"+ sliderMinDate.getDate() +"_"+  sliderMinDate.getFullYear() +"_"+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();

  // var minFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + superNode1MinImgFilename + ".jpg");
  // var minFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + superNode2MinImgFilename + ".jpg");
  var minFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + "yo" + ".png");
  var minFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + "yo" + ".png");
  document.getElementById("superNode1MinImage").src = minFilePath1;
  document.getElementById("superNode2MinImage").src = minFilePath2;

  console.log("superNode1MinImgFilename: "+ superNode1MinImgFilename+"\n");
  console.log("superNode2MinImgFilename: "+ superNode2MinImgFilename+"\n");
  console.log("minFilePath1: "+ minFilePath1+"\n");
  console.log("minFilePath2: "+ minFilePath2+"\n");

  superNode1MaxImgFilename = (sliderMaxDate.getMonth()+1) +"_"+ sliderMaxDate.getDate() +"_"+ sliderMaxDate.getFullYear() +"_"+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();
  superNode2MaxImgFilename = (sliderMaxDate.getMonth()+1) +"_"+ sliderMaxDate.getDate() +"_"+ sliderMaxDate.getFullYear() +"_"+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();
  // var maxFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + superNode1MaxImgFilename + ".jpg");
  // var maxFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + superNode2MaxImgFilename + ".jpg");
  var maxFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + "yo" + ".png");
  var maxFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + "yo" + ".png");
  document.getElementById("superNode1MaxImage").src = maxFilePath1;
  document.getElementById("superNode2MaxImage").src = maxFilePath2;

  console.log("superNode1MaxImgFilename: "+ superNode1MaxImgFilename+"\n");
  console.log("superNode2MaxImgFilename: "+ superNode2MaxImgFilename+"\n");
  console.log("maxFilePath1: "+ maxFilePath1+"\n");
  console.log("maxFilePath2: "+ maxFilePath2+"\n");
  // *** Create file paths for min and max images from raspberry pi camera End ***


  //* Form the time stamps strings for perfect 10 minute increments *
  // Create a string for the minimum and maximum timestamps
  sliderTimeStampMin = (sliderMinDate.getMonth()+1) +"/"+ sliderMinDate.getDate() +"/"+  sliderMinDate.getFullYear() +" "+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();
  sliderTimeStampMax = (sliderMaxDate.getMonth()+1) +"/"+ sliderMaxDate.getDate() +"/"+ sliderMaxDate.getFullYear() +" "+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();

  // This will update the sliderTimeStampMid array with all of the inbetween timestamps
  getTimeStamps(sliderMinDate, sliderMaxDate);

  // Fill slider array with minimum timestamp
  sliderSelectedTimeStamps.push(sliderTimeStampMin);

  for (var counter = 0; counter < sliderTimeStampMid.length; counter++) {
    var tempString = sliderTimeStampMid[counter];

    // Fill slider array with middle timestamps
    sliderSelectedTimeStamps.push(tempString);
  }

  // Fill slider array with maximum timestamp
  sliderSelectedTimeStamps.push(sliderTimeStampMax);
  /***********   Slider Time Stamp Creation End  **************/


  /***********   Reading the .JSON file from the server  **************/
  $.getJSON('Node_Json_Data/TestMasterData.json', function (data) {

      // Empty out the master lists
      MasterDataUnsorted = [];
      TestMasterDataSorted = [];


      /***********   JSON Selected Time Stamp Creation  **************/
      // Array used to store all time stamps desired by the user in the form of actual timestamps in the JSON file
      selectedJsonTimeStamps = [];
      startFilling = 0;
      MasterDataUnsorted = Object.keys(data[chosenNodes[currentNodeIndex]]);

      // Cycle through each element of the dynamically read in timestamps and being populating a 0 padded sorted version
      MasterDataUnsorted.forEach(function(element) {
        var tempDate = new Date(element);

        // *** Very important to add 1 to account for month offset! ***
        tempDate.setMonth(tempDate.getMonth() + 1);
        var tempDateString;

        // Add 0 padding so the timestamps can be sorted properly using the .sort function
        // Make sure you add 1 month since month starts at 1
        tempDateString = ('0' + (tempDate.getMonth())).slice(-2) + '/' + ('0' + tempDate.getDate()).slice(-2) + '/' +  tempDate.getFullYear() +" "+ ('0' + tempDate.getHours()).slice(-2) +":"+ ('0' + tempDate.getMinutes()).slice(-2);
        TestMasterDataSorted.push(tempDateString);

      }); // End of cycling through each of the timestamps from the JSON file

      // Now that we have all of the timestamps, sort them. The 0 padding is necessary for this to work properly
      TestMasterDataSorted.sort();

      // Cycle through the sorted master data and begin filling your selectedJsonTimeStamps array with the dynamic timestamps
      // This loop will break once the correlated maximum value of the slider timeframe is selected.
      for(var element of TestMasterDataSorted) {
        // By creating a new date using the 0 padded timestamps, tempDate will become unpadded, which is what we want in order to read the json file
        var tempDate = new Date(element);
        var tempDateString = ((tempDate.getMonth()+1) +"/"+ tempDate.getDate() +"/"+  tempDate.getFullYear() +" "+ tempDate.getHours() +":"+ tempDate.getMinutes());

        // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
        // We take the actual timestamp received from the JSON file and subtract the exact 10 minute increment and populate
        // the selectedJsonMinTimeStamp and selectedJsonMaxTimeStamp if the current timestamp is within 0 and 9 minutes difference.
        if(((tempDate.getTime() - sliderMinDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMinDate.getTime()) < 600000)) {
          startFilling = 1;
          selectedJsonMinTimeStamp = tempDateString;
        }
        // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
        else if(((tempDate.getTime() - sliderMaxDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMaxDate.getTime()) < 600000)) {
          startFilling = 0;

          // Push the last element into the array before breaking out of this loop
          selectedJsonTimeStamps.push(tempDateString);
          selectedJsonMaxTimeStamp = tempDateString;

          // There's no sense in continuing searching our sorted master data since the maximum time stamp has been found
          break;
        }

        // If the minimum was found, begin populating selectedJsonTimeStamps with the timestamp strings
        if(startFilling == 1) {
          selectedJsonTimeStamps.push(tempDateString);
        }

        //console.log((tempDate.getMonth()+1) +"/"+ tempDate.getDate() +"/"+  tempDate.getFullYear() +" "+ tempDate.getHours() +":"+ tempDate.getMinutes());
      };
      /***********   JSON Selected Time Stamp Creation End  **************/


      /***********   HEATMAP   **************/
      //Set the center of the map to be used by initMap()
      centerMap = {lat: 32.777187, lng: -117.069876};

      for(var i=0; i < 10; i++) {
        var heatMapMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][0];
        var heatMapMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][0];
        var tempVariable = ((heatMapMin + heatMapMax)/2);

        tempVariable = Math.round(tempVariable);
        averageHeat[i] = tempVariable;

        var humidMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][1];
        var humidMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][1];

        tempVariable = ((humidMin + humidMax)/2);
        averageHumidity[i] = Math.round(tempVariable);

        var UVMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][2];
        var UVMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][2];

        averageUV[i] = ((UVMin + UVMax)/2);

        if(i == 0 || i == 5){
          var windspeedMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][4];
          var windspeedMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][4];

          tempVariable = ((windspeedMin + windspeedMax)/2);
          averageWindSpeed[i] = Math.round(tempVariable);
        }
      } // End of for loop

      initMap();
      /***********   HEATMAP END   **************/

      /***********   GRAPH   **************/
      updateGraph();
      /***********   GRAPH END   **************/
  }); // End of $.getJSON
  /***********   Reading the .JSON file from the server End  **************/
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
| fills the sliderTimeStampMid array with every timestamp inbetween in
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

  // If the current min and max are the same, clear out sliderTimeStampMid and return
  if(minCopy.getTime() == maxCopy.getTime()) {

    // Clear out sliderTimeStampMid
    sliderTimeStampMid = [];
    return;
  }

  // NOTE: Instead of comparing dates using the operators directly,(sliderMinDate == sliderMaxDate),
  // a good practice is to compare the dates but using the milliseconds format.
  // You can obtain milliseconds format using the getTime( ) function.
  // Reference: https://wiki.base22.com/display/btg/How+to+compare+dates+in+JavaScript

  // If the current difference between min and max is 600000 milliseconds,
  // (equivalent to 10 minutes), we do not need to calculate inbetween values.
  else if((maxCopy.getTime() - minCopy.getTime()) == 600000) {

    // Clear out sliderTimeStampMid
    sliderTimeStampMid = [];
    return;
  }
  else {

    // Clear out sliderTimeStampMid
    sliderTimeStampMid = [];

    // Only loop if the difference in min and max is greater than 10 minutes
    // This will continue incrementing the minimum by 10 minutes
    // until it becomes 10 minutes away from the maximum timestamp
    while((maxCopy.getTime() - minCopy.getTime()) > 600000) {

      // Increment the minutes by 10
      minCopy.setMinutes(minCopy.getMinutes()+10);

      // Create a new timestamp after incrementing minutes by 10
      var tempString =  (minCopy.getMonth()+1) +"/"+ minCopy.getDate() +"/"+ minCopy.getFullYear() +" "+ minCopy.getHours() +":"+ minCopy.getMinutes();

      // Append the current string into the sliderTimeStampMid array
      sliderTimeStampMid.push(tempString);
    } // End of While loop

    return;
  } // End of else
}; // End of getTimeStamps()

//---------------------------------------------------------------------------------------
//endregion: Slider Value Changed Event Handler, Slider Default Load, and Change Slider Button Event Handlers



// region: Yusuf's Side Panel
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

    // Set initialLoad to 1 so that this never happens again
    initialLoad = 1;

    // Initialize expanded view elements
    superNodesChosen = 1;
    showWindDirection = 0;
    showAqi = 0;

    // Hide AQI and wind Direction on startup
    $('.node1SuperReadings').hide();
    $('.node2SuperReadings').hide();
    $('.windDirectionReadings').hide();
    $('.aqiReadings').hide();

    NodeAlteration();

    //================================================================================
    // Default Constructor for the Slider. Created when the expand button is first pressed
    //================================================================================
    $("#dateSlider").dateRangeSlider( {

        //Note, month 0 is January. Month 4, is May.
        bounds: {min: todayBoundsMin, max: todayBoundsMax},
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

    $.getJSON('Node_Json_Data/TestMasterData.json', function (data) {

      // Empty out the master lists
      MasterDataUnsorted = [];
      TestMasterDataSorted = [];

      /***********   Slider Time Stamp Creation   **************/
      // Array used to store all time stamps desired by the user in the form of perfect 10 minute increments
      sliderSelectedTimeStamps = [];
      sliderMinDate = new Date(initTimeMin);
      sliderMaxDate = new Date(initTimeMax);

      // *** Create file paths for min and max images from raspberry pi camera ***
      // Since we start off on node 1, show node 1 and hide node 6
      $("#superNode1Images").show();
      $("#superNode2Images").hide();

      superNode1MinImgFilename =(sliderMinDate.getMonth()+1) +"_"+ sliderMinDate.getDate() +"_"+  sliderMinDate.getFullYear() +"_"+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();
      superNode2MinImgFilename =(sliderMinDate.getMonth()+1) +"_"+ sliderMinDate.getDate() +"_"+  sliderMinDate.getFullYear() +"_"+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();

      var minFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + superNode1MinImgFilename + ".jpg");
      var minFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + superNode2MinImgFilename + ".jpg");
      // document.getElementById("superNode1MinImage").src = minFilePath1;
      // document.getElementById("superNode2MinImage").src = minFilePath2;

      console.log("superNode1MinImgFilename: "+ superNode1MinImgFilename+"\n");
      console.log("superNode2MinImgFilename: "+ superNode2MinImgFilename+"\n");
      console.log("minFilePath1: "+ minFilePath1+"\n");
      console.log("minFilePath2: "+ minFilePath2+"\n");

      // document.getElementById("superNode1MinImage").src="Node_Json_Data/PIPictures/Node_1/water_drop.png";
      superNode1MaxImgFilename = (sliderMaxDate.getMonth()+1) +"_"+ sliderMaxDate.getDate() +"_"+ sliderMaxDate.getFullYear() +"_"+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();
      superNode2MaxImgFilename = (sliderMaxDate.getMonth()+1) +"_"+ sliderMaxDate.getDate() +"_"+ sliderMaxDate.getFullYear() +"_"+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();
      var maxFilePath1 = ("Node_Json_Data/PIPictures/Node_1/" + superNode1MaxImgFilename + ".jpg");
      var maxFilePath2 = ("Node_Json_Data/PIPictures/Node_6/" + superNode2MaxImgFilename + ".jpg");
      // document.getElementById("superNode1MaxImage").src = maxFilePath1;
      // document.getElementById("superNode2MaxImage").src = maxFilePath2;

      console.log("superNode1MaxImgFilename: "+ superNode1MaxImgFilename+"\n");
      console.log("superNode2MaxImgFilename: "+ superNode2MaxImgFilename+"\n");
      console.log("maxFilePath1: "+ maxFilePath1+"\n");
      console.log("maxFilePath2: "+ maxFilePath2+"\n");
      // *** Create file paths for min and max images from raspberry pi camera End ***


      // * Form the time stamps strings for perfect 10 minute increments *
      // Create a string for the minimum and maximum timestamps
      sliderTimeStampMin = (sliderMinDate.getMonth()+1) +"/"+ sliderMinDate.getDate() +"/"+  sliderMinDate.getFullYear() +" "+ sliderMinDate.getHours() +":"+ sliderMinDate.getMinutes();
      sliderTimeStampMax = (sliderMaxDate.getMonth()+1) +"/"+ sliderMaxDate.getDate() +"/"+ sliderMaxDate.getFullYear() +" "+ sliderMaxDate.getHours() +":"+ sliderMaxDate.getMinutes();

      // This will update the sliderTimeStampMid array with all of the inbetween timestamps
      getTimeStamps(sliderMinDate, sliderMaxDate);

      // Fill Graph array with minimum timestamp
      sliderSelectedTimeStamps.push(sliderTimeStampMin);

      for (var counter = 0; counter < sliderTimeStampMid.length; counter++) {
        var tempString = sliderTimeStampMid[counter];

        // Fill Graph array with middle timestamps
        sliderSelectedTimeStamps.push(tempString);
      }

      // Fill Graph array with maximum timestamp
      sliderSelectedTimeStamps.push(sliderTimeStampMax);
      /***********   Slider Time Stamp Creation End  **************/


      /***********   JSON Selected Time Stamp Creation  **************/
      // Array used to store all time stamps desired by the user in the form of actual timestamps in the JSON file
      selectedJsonTimeStamps = [];
      startFilling = 0;
      MasterDataUnsorted = Object.keys(data[chosenNodes[currentNodeIndex]]);

      // Cycle through each element of the dynamically read in timestamps and being populating a 0 padded sorted version
      MasterDataUnsorted.forEach(function(element) {
        var tempDate = new Date(element);

        // *** Very important to add 1 to account for month offset! ***
        tempDate.setMonth(tempDate.getMonth() + 1);
        var tempDateString;

        // Add 0 padding so the timestamps can be sorted properly using the .sort function
        // Make sure you add 1 month since month starts at 1
        tempDateString = ('0' + (tempDate.getMonth())).slice(-2) + '/' + ('0' + tempDate.getDate()).slice(-2) + '/' +  tempDate.getFullYear() +" "+ ('0' + tempDate.getHours()).slice(-2) +":"+ ('0' + tempDate.getMinutes()).slice(-2);
        TestMasterDataSorted.push(tempDateString);

      }); // End of cycling through each of the timestamps from the JSON file

      // Now that we have all of the timestamps, sort them. The 0 padding is necessary for this to work properly
      TestMasterDataSorted.sort();

      // Cycle through the sorted master data and begin filling your selectedJsonTimeStamps array with the dynamic timestamps
      // This loop will break once the correlated maximum value of the slider timeframe is selected.
      for(var element of TestMasterDataSorted) {
        // By creating a new date using the 0 padded timestamps, tempDate will become unpadded, which is what we want in order to read the json file
        var tempDate = new Date(element);
        var tempDateString = ((tempDate.getMonth()+1) +"/"+ tempDate.getDate() +"/"+  tempDate.getFullYear() +" "+ tempDate.getHours() +":"+ tempDate.getMinutes());

        // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
        // We take the actual timestamp received from the JSON file and subtract the exact 10 minute increment and populate
        // the selectedJsonMinTimeStamp and selectedJsonMaxTimeStamp if the current timestamp is within 0 and 9 minutes difference.
        if(((tempDate.getTime() - sliderMinDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMinDate.getTime()) < 600000)) {
          startFilling = 1;
          selectedJsonMinTimeStamp = tempDateString;
        }
        // Find a timestamp that is within 9.99 minutes of the 10 minute increment.
        else if(((tempDate.getTime() - sliderMaxDate.getTime()) >= 0) && ((tempDate.getTime() - sliderMaxDate.getTime()) < 600000)) {
          startFilling = 0;

          // Push the last element into the array before breaking out of this loop
          selectedJsonTimeStamps.push(tempDateString);
          selectedJsonMaxTimeStamp = tempDateString;

          // There's no sense in continuing searching our sorted master data since the maximum time stamp has been found
          break;
        }

        // If the minimum was found, begin populating selectedJsonTimeStamps with the timestamp strings
        if(startFilling == 1) {
          selectedJsonTimeStamps.push(tempDateString);
        }

        //console.log((tempDate.getMonth()+1) +"/"+ tempDate.getDate() +"/"+  tempDate.getFullYear() +" "+ tempDate.getHours() +":"+ tempDate.getMinutes());
      };
      /***********   JSON Selected Time Stamp Creation End  **************/


      /***********   HEATMAP   **************/
      //Set the center of the map to be used by initMap()
      centerMap = {lat: 32.777187, lng: -117.069876};

      for(var i=0; i < 10; i++) {
        var heatMapMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][0];
        var heatMapMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][0];
        var tempVariable = ((heatMapMin + heatMapMax)/2);

        tempVariable = Math.round(tempVariable);
        averageHeat[i] = tempVariable;

        var humidMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][1];
        var humidMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][1];

        tempVariable = ((humidMin + humidMax)/2);
        averageHumidity[i] = Math.round(tempVariable);

        var UVMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][2];
        var UVMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][2];

        averageUV[i] = ((UVMin + UVMax)/2);

        if(i == 0 || i == 5){
          var windspeedMin = data[chosenNodes[i]][selectedJsonMinTimeStamp][4];
          var windspeedMax = data[chosenNodes[i]][selectedJsonMaxTimeStamp][4];

          tempVariable = ((windspeedMin + windspeedMax)/2);
          averageWindSpeed[i] = Math.round(tempVariable);
        }
      } // End of for

      initMap();
      /***********   HEATMAP END   **************/


      /***********   GRAPH   **************/
      // Initialize graph with node 1 selected on start up
      ComparisonArray[0] = "node 1";
      ComparisonCount = 1;
      finalstring = "Nodes compared: node 1";

      // Initialize temperature datatype and make the temperature radio button selected
      datatype = 0;
      ticks = 5;
      updateGraph();
      /***********   GRAPH END   **************/

    }); // End of getJSON
  } // End of if. This is the event handler for the first time expand button is pressed

  // If this was not the very first time the expand button was pressed
  else {

  }
}); // End of expandButton press

//================================================================================
// Temperature radio button event handler
//================================================================================
$('#temperature').on("change", function(){
  datatype = 0;
  ticks = 5;
  updateGraph();

});

//================================================================================
// Humidity radio button event handler
//================================================================================
$('#humidity').on("change", function(){
  datatype = 1;
  ticks = 10;
  updateGraph();
});

//================================================================================
// UVI radio button event handler
//================================================================================
$('#uvIndex').on("change", function(){
  datatype = 2;
  ticks = .5;
  updateGraph();
});

//================================================================================
// Air Pressure radio button event handler
//================================================================================
$('#pressure').on("change", function(){

  // Initialize the graph with only 1 node
  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  // If Node 1 is currently selected
  if(nodeIndex == 0) {

    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: Node 1";
  }

  // If Node 6 is currently selected
  else if(nodeIndex == 5) {

    // Initialize graph with node 6 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }

  // Air Pressure compared but Sub Node selected, so do nothing
  else {
    return;
  }

  // Set data type to Air Pressure and update graph
  datatype = 3;
  ticks = 100;
  updateGraph();
});

//================================================================================
// Wind Speed radio button event handler
//================================================================================
$('#windSpeed').on("change", function(){

  // Initialize the graph with only 1 node
  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  // If Node 1 is currently selected
  if(nodeIndex == 0) {

    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: node 1";
  }
  // If Node 6 is currently selected
  else if(nodeIndex == 5) {

    // Initialize graph with node 6 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }
  // Wind Speed compared but Sub Node selected, so do nothing
  else {
    return;
  }

  // Set data type to Wind Speed and update graph
  datatype = 4;
  ticks = 5;
  updateGraph();
});

//================================================================================
// Wind Gust radio button event handler
//================================================================================
$('#windGust').on("change", function(){

  // Initialize the graph with only 1 node
  ComparisonCount = 1;

  // Clear the array containing nodes compared
  ComparisonArray = [];

  // If Node 1 is currently selected
  if(nodeIndex == 0) {

    // Initialize graph with node 1 selected on start up
    ComparisonArray[0] = "node 1";
    finalstring = "Nodes compared: node 1";
  }
  // If Node 6 is currently selected
  else if(nodeIndex == 5) {

    // Initialize graph with node 6 selected on start up
    ComparisonArray[0] = "node 6";
    finalstring = "Nodes compared: node 6";
  }
  // Wind Gust compared but Sub Node selected, so do nothing
  else {
    return;
  }

  // Set data type to Wind Gust and update graph
  datatype = 6;
  ticks = 5;
  updateGraph();
});

//================================================================================
// Wind Direction Check Box event handler
//================================================================================
$('#windDirection').on("change", function(){

  // Toggle Wind Direction
  if(showWindDirection == 0) {
    showWindDirection = 1;
    $('.windDirectionReadings').show();
  }
  else {
    showWindDirection = 0;
    $('.windDirectionReadings').hide();
  }

  // Show the Node 1 and Node 6 labels if either the Wind Direction or AQI are selected
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
// AQI Check Box event handler
//================================================================================
$('#aqi').on("change", function(){

  // Toggle AQI
  if(showAqi == 0) {
    showAqi = 1;
    $('.aqiReadings').show();
  }
  else {
    showAqi = 0;
    $('.aqiReadings').hide();
  }

  // Show the Node 1 and Node 6 labels if either the Wind Direction or AQI are selected
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
| NodeAlteration
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
    // $.getJSON('Node_Json_Data/TestMasterData.json', function (data)
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

      // Show Raspberry Pi Images if node 1 or 6 is selected
      if(nodeIndex == 0) {
        console.log("Node 1 chosen\n");
        $("#superNode1Images").show();
        $("#superNode2Images").hide();
      }
      else if(nodeIndex == 5) {
        console.log("Node 6 chosen\n");
        $("#superNode2Images").show();
        $("#superNode1Images").hide();
      }
      else {
        $("#superNode2Images").hide();
        $("#superNode1Images").hide();
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

      // Show Raspberry Pi Images if node 1 or 6 is selected
      if(nodeIndex == 0) {
        console.log("Node 1 chosen\n");
        $("#superNode1Images").show();
        $("#superNode2Images").hide();
      }
      else if(nodeIndex == 5) {
        console.log("Node 6 chosen\n");
        $("#superNode2Images").show();
        $("#superNode1Images").hide();
      }
      else {
        $("#superNode2Images").hide();
        $("#superNode1Images").hide();
      }

      document.getElementById('Nodename').innerHTML = jsonarray[nodeIndex];
    };


    document.getElementById('compare').onclick = function() {

      // If the currently selected node is not a super node and compare is pressed
      // for any of the super node measurements, don't do anything
      if(datatype == 3 || datatype == 4 || datatype == 6) {

        // If node 1 or 6 was chosen, do something.
        if(nodeIndex == 0 || nodeIndex == 5) {

        }

        // If a subnode was selected, do nothing
        else {

          return;
        }
      }

      index = contains.call(ComparisonArray, jsonarray[nodeIndex]); // true
      if (String(index) == 'false') {
        ComparisonArray[ComparisonCount] = jsonarray[nodeIndex];
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


/*
|--------------------------------------------------------------------------
| CollapsedViewAverages
|--------------------------------------------------------------------------
|
| Description of function
|
| Inputs:
| Return:
|
|
*/

function CollapsedViewAverages() {

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

    if (avgtmp > 85) {
      Temperture.src="./img/side-panel/Temp3.png";
    }
    else if (avgtmp > 70) {
      Temperture.src="./img/side-panel/Temp2.png";
    }
    else if(avgtmp > 50) {
      Temperture.src="./img/side-panel/Temp1.png";
    }
    else {
      Temperture.src="./img/side-panel/Temp0.png";
    }

    if (avghumid > 85) {
      Humidity.src="./img/side-panel/HumidityLevel3.png";
    }
    else if (avghumid > 70) {
      Humidity.src="./img/side-panel/HumidityLevel2.png";
    }
    else if (avghumid > 50) {
      Humidity.src="./img/side-panel/HumidityLevel1.png";
    }
    else {
      Humidity.src="./img/side-panel/HumidityLevel0.png";
    }

    if (avgUV > 7) {
      UVIndex.src="./img/side-panel/UV3.png";
    }
    else if (avgUV > 4) {
      UVIndex.src="./img/side-panel/UV2.png";
    }
    else {
      UVIndex.src="./img/side-panel/UV1.png";
    }

}

//---------------------------------------------------------------------------------------
//endregion: End of Yusuf's Side Panel



// region: Kevin's Heatmap
//---------------------------------------------------------------------------------------

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
  $.getJSON('Node_Json_Data/TestMasterData.json', function (data) {
    // Print temp reading for lower bound timestamp
    //console.log("Node " + (currentNodeIndex+1) + "[0]["+ sliderTimeStampMin +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][sliderTimeStampMin][0]);

    // Fill Graph array with minimum timestamp
    sliderSelectedTimeStamps = [];

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

    // Fill Graph array with minimum timestamp
    sliderSelectedTimeStamps.push(sliderTimeStampMin);

    for (var counter = 0; counter < sliderTimeStampMid.length; counter++) {

      var tempString = sliderTimeStampMid[counter];
      //console.log("Node " + (currentNodeIndex+1) + "[0]["+ tempString +"][0] (Temperature): " + data[chosenNodes[currentNodeIndex]][tempString][0]);

      // Fill Graph array with middle timestamps
      sliderSelectedTimeStamps.push(tempString);
    }
    // Fill Graph array with maximum timestamp
    sliderSelectedTimeStamps.push(sliderTimeStampMax);

    for(var counter2 = 0; counter2 < selectedJsonTimeStamps.length; counter2++) {

      var datePoint = new Date(selectedJsonTimeStamps[counter2]).getTime();
      var dataPoint1 = data[chosenNodes[0]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint2 = data[chosenNodes[1]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint3 = data[chosenNodes[2]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint4 = data[chosenNodes[3]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint5 = data[chosenNodes[4]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint6 = data[chosenNodes[5]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint7 = data[chosenNodes[6]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint8 = data[chosenNodes[7]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint9 = data[chosenNodes[8]][selectedJsonTimeStamps[counter2]][datatype];
      var dataPoint10 = data[chosenNodes[9]][selectedJsonTimeStamps[counter2]][datatype];

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
    { label: "node 1",
      data: plotData1,
      color: "#000000"
    };

    var data2 =
    { label: "node 2",
      data: plotData2,
      color: "#FF0000"
    };

    var data3 =
    { label: "node 3",
      data: plotData3,
      color: "#00BB00"
    };

    var data4 =
    { label: "node 4",
      data: plotData4,
      color: "#0000FF"
    };

    var data5 =
    { label: "node 5",
      data: plotData5,
      color: "#FFBBFF"
    };

    var data6 =
    { label: "node 6",
      data: plotData6,
      color: "#00FFFF"
    };

    var data7 =
    { label: "node 7",
      data: plotData7,
      color: "#FFFF00"
    };

    var data8 =
    { label: "node 8",
      data: plotData8,
      color: "#B0B0B0"
    };

    var data9 =
    { label: "node 9",
      data: plotData9,
      color: "#4B0066"
    };

    var data10 =
    { label: "node 10",
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

    for(var i = 0; i < ComparisonArray.length; i++) {
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
    } // End of for loop

    ymin = Math.min.apply(null,minset);
    ymax = Math.max.apply(null,maxset);

    // Setting options variable for plotting graph
    if(selectedJsonTimeStamps.length < ((8*6)+1)) {
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
            //min: ((new Date(sliderMinDate).getTime() - 600000*6*7)),
            //max: ((new Date(sliderMaxDate).getTime() - 600000*6*7))
            min: new Date(sliderMinDate).getTime(),
            max: new Date(sliderMaxDate).getTime(),
            timezone: "browser"
          },
          yaxis:
          {
            min: ymin - ticks,
            max: ymax + ticks,
            ticksize: ticks
          }
      } // End of options
    } // End of if
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
          //min: ((new Date(sliderMinDate).getTime() - 600000*6*7)),
          //max: ((new Date(sliderMaxDate).getTime() - 600000*6*7))
          min: new Date(sliderMinDate).getTime(),
          max: new Date(sliderMaxDate).getTime(),
          timezone: "browser"
        },
        yaxis:
        {
          min: ymin - ticks,
          max: ymax + ticks,
          ticksize: ticks
        }
      } // End of options
    } // End of else

    $.plot($("#dataGraph"), dataset, options);
    /***********   END OF GRAPH   **************/

  }); // End of getJSON
}

//---------------------------------------------------------------------------------------
//endregion: End of Philippe's Graph