// With JQuery
$("#ex18a").slider({
  min: 0,
  max: 10,
  value: 5,
  labelledby: 'ex18-label-1'
});

$("#ex18b").slider({
  min: 0,
  max: 10,
  value: [3, 6],
  labelledby: ['ex18-label-2a', 'ex18-label-2b']
});

$("#timeSlider1").slider({
  min: 0,
  max: 100,
  value: [0, 100],
  labelledby: ['slider1ValLow', 'slider1ValHigh']
});

