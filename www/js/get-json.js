// when the page has fully loaded
$(document).ready(function () {
  var jsonData = {};
   // if(nodeTimeRA[1]  == "7:40") {
   //    nodeTimeStamp = nodeTimeStamp.replace("7:40", "");
   // }

var nodeTimeStamp22 = "2017-02-19 7:40";
var nodeTimeStamp12 = "2017-04-20 4:20:20";

// This is a JQuery shorthand for checking if the button with the id "get-json" was pressed
  $('#get-json').click(function () {

    // The div element where we will display our data
    var showData = $('#show-json');

    // Reading in JSON from the server
    $.getJSON('../test-data/test_data_subnodes.json', function (data) {

      console.log("JSON received from xampp directory test_data_test_data_subnodes.json: " + data["node 12"]);
      console.log("Node 12[0] (Time Stamps): " + data["node 12"][0]);
      console.log("Node 12[0][0] (Readings for selected time): " + data["node 12"][0][nodeTimeStamp12]);
      console.log("Node 12[0][0][0] (Temperature): " + data["node 12"][0][nodeTimeStamp12][0]);
      console.log("Node 12[0][0][1] (Humidity): " + data["node 12"][0][nodeTimeStamp12][1]);
      console.log("Node 12[0][0][2] (UV): " + data["node 12"][0][nodeTimeStamp12][2]);
      console.log("Node 12[1] (Latitude): " + data["node 12"][1]);
      console.log("Node 12[2] (Longitude): " + data["node 12"][2]);


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

    //showData.text('Press F12 to view console output');

  }); // End of $('#get-json').click

}); // End of $(document).ready