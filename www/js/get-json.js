// when the page has fully loaded
$(document).ready(function () {
   var jsonData = {};

// This is a JQuery shorthand for checking if the button with the id "get-json" was pressed
  $('#get-json').click(function () {

    // The div element where we will display our data
    var showData = $('#show-json');

    // Reading in JSON from the server
    $.getJSON('test-data/test_data_subnodes.json', function (data) {
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


}); // End of $(document).ready