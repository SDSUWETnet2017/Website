var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


// Date slider
var dateValues;
var values;
var nodeTimeStamp = "2017-02-21 7:40";
var timeMax;
var timeMin;
var myDate = new Date(nodeTimeStamp);


$("#dateSlider").bind("valuesChanged", function(e, data){
  dateValues = data;
  timeMax = new Date(data.values.max);
  timeMin = new Date(data.values.min);
  console.log(timeMax.getMonth() +"/"+ timeMax.getDate() +"/"+ timeMax.getFullYear() +" "+ timeMax.getHours() +":"+ timeMax.getMinutes()+":"+ timeMax.getSeconds() + "\n");
  console.log(timeMin.getMonth() +"/"+ timeMin.getDate() +"/"+ timeMin.getFullYear() +" "+ timeMin.getHours() +":"+ timeMin.getMinutes()+":"+ timeMin.getSeconds() + "\n");
  //console.log("Values just changed. min: " + dateValues.values.min + " max: " + dateValues.values.max + "\n");

/* // THIS IS EQUIVALENT TO THIS
  values = $("#dateSlider").dateRangeSlider("values");

  console.log(values.min.toString() + " " + values.max.toString() + "\n");
*/
});


// Default constructor
$("#dateSlider").dateRangeSlider( {

    //Note, month 0 is January. Month 4, is May.
    bounds: {min: new Date(2017, 2, 30, 0, 0), max: new Date(2017, 2, 30, 24, 0)},
    defaultValues: {min: new Date(2017, 2, 30, 0, 0), max: new Date(2017, 2, 30, 4, 20)},
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
        var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
          return month + "/" + day + "/" + year;
      },
      format: function(tickContainer, tickStart, tickEnd){
        tickContainer.addClass("myCustomClass");
      }
    }],
/*
    formatter: function(value){
      var days2 = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
      return days2 + "-" + month + "-" + year + " " + hour + ":" + min;
    },*/

    step: {
      minutes:10
    },


    formatter: function(value){
      var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
      return month + "/" + day + "/" + year + " " + hour + ":" + min;
    },

    wheelMode: "scroll",
    wheelSpeed: 1,

    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false

});



$("#btn-current").click(function() {
  $("#dateSlider").dateRangeSlider( {

      //Note, month 0 is January. Month 4, is May.
      bounds: {min: new Date(2017, 2, 30, 0, 0), max: new Date(2017, 2, 30, 24, 0)},
      defaultValues: {min: new Date(2017, 2, 30, 0, 0), max: new Date(2017, 2, 30, 4, 20)},
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
          var day = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
          return month + "/" + day + "/" + year;
        },
        format: function(tickContainer, tickStart, tickEnd){
          tickContainer.addClass("myCustomClass");
        }
      }],
/*
      formatter: function(value){
        var days2 = value.getDate(), month = value.getMonth() + 1, year = value.getFullYear(), hour = value.getHours(), min = value.getMinutes();
        return days2 + "-" + month + "-" + year + " " + hour + ":" + min;
      },*/

      step: {
        minutes:10
      },
    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false

  });
});



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
    }],
    step: {
      days:1
    },

    // Deactivate ranges in case if the user switches between weeks, months, etc
    range:false

  });
});

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
    }],
    step: {
      weeks:1
    },
    range:{
      min: {days: 7}
    }

  });

});

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
    }],
    step: {
      months:1
    },
    range:{
      min: {months: 1}
    }

  });

});