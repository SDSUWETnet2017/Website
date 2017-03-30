var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

// Default constructor
$("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 0, 1), max: new Date(2017, 5, 31)},
    defaultValues: {min: new Date(2017, 0, 10), max: new Date(2017, 3, 20)},
    scales: [{
      first: function(value){ return value; },
      end: function(value) {return value; },
      next: function(value){
        var next = new Date(value);

        // For some reason, if we don't have +1 for month, it will break EVERYTHING
        // WE NEED TO MAKE IT THIS WAY!
        return new Date(next.setMonth(value.getMonth() + 1));
      },
      label: function(value){
        return months[value.getMonth()];
      },
      format: function(tickContainer, tickStart, tickEnd){
        tickContainer.addClass("myCustomClass");
      }
    }]

});


/*

$("#btn-hour").click(function() {
  $("#dateSlider").dateRangeSlider( {
    step: {
      hours: 1
    },
    formatter:function(val){
      var days = val.getDate(),
        month = val.getMonth() + 1,
        year = val.getFullYear(),
        hours = val.getHours();
      return days + "/" + month + "/" + year + " " + hours;
    }
  });
});

*/

$("#btn-day").click(function() {
  $("#dateSlider").dateRangeSlider( {
    step: {
      days: 1
    }});
});

$("#btn-week").click(function() {
  $("#dateSlider").dateRangeSlider( {
    step: {
      weeks: 1
    }});

});

$("#btn-month").click(function() {
  $("#dateSlider").dateRangeSlider( {
    step: {
      months: 1
    }});

});