// when the page has fully loaded
$(document).ready(function () {
   var jsonData = {};

  // Get JSON data from the localhost directory
  $('#get-data').click(function () {
    var showData = $('#show-data');

    // Reading in JSON data locally
    $.getJSON('test-data/example.json', function (data) {
      console.log("JSON received from xampp directory test-data/example.json: " + data);

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
    });

    showData.text('Loading the JSON file.');
  });


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




});