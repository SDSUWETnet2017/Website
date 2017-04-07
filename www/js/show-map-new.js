  var map, heatmap, marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10;
  var maxtemp = 85;
  var mintemp = 60;
  var lat = [32.777262, 32.777003, 32.777261, 32.776814, 32.777381, 32.777599, 32.776912, 32.777072, 32.776858, 32.777088];
  var lng = [-117.070982, -117.070759, -117.070789, -117.070793, -117.070581, -117.070970, -117.071473, -117.070298, -117.071270, -117.071203];
  var marker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 19,
      center: {lat: 32.777262, lng: -117.070982},
      mapTypeId: 'satellite'
    });

    for(i = 0; i <= 10; i++){
      var j = i + 1;
	  marker[i] =  new google.maps.Marker({
	      position: {lat: lat[i], lng: lng[i]},
	      label: j.toString(),
	      map: map
	  });
  	}
  }

  function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
  }

  function getTemp(latlng, temp){

  	var latlng;

    var heatpoint = [{location: new google.maps.LatLng(latlng), weight: temp}];

    var setheatpoint = new google.maps.visualization.HeatmapLayer({
      data: heatpoint,
      radius: 50,
      map: map
    });

    var rate = (temp - maxtemp)/(maxtemp - mintemp + 1);
     console.log(rate);
    var gradient = [
  	  	'rgba('+Math.round(255*rate)+', 0, 0, 1)',
  		'rgba('+Math.round(255*rate)+', ' + Math.round(255*(1-rate)) + ', 0, 1)'];
    setheatpoint.set('gradient', gradient);
    setheatpoint.setMap(map);
  }

  getTemp("32.777092, -117.070992", 85);