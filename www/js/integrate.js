/* --------------- CHANGING DATA TYPES --------------- */

var ticks;
var datatype;

//temperature radio button event handler
datatype = 0;
ticks = 5;

//humidity radio button event handler
datatype = 1;
ticks = 10;

//UV radio button event handler
datatype = 2;
ticks = 1;

//wind speed radio button event handler
datatype = 3;
ticks = 5;


/* --------------- END CHANGING DATA TYPES --------------- */







/* --------------- DYNAMIC Y-AXIS --------------- */

//Initializing variables for min and max y-axis points
var ymin;
var ymax;

//Overwrite the min and max points as needed
for(var counter2 = 0; counter2 < timeStampFull.length; counter2++) {

      // Take date in milliseconds
      var datePoint = new Date(timeStampFull[counter2]).getTime();
      var dataPoint1 = data[chosenNodes["node 1"]][0][timeStampFull[counter2]][datatype];
      var dataPoint2 = data[chosenNodes["node 2"]][0][timeStampFull[counter2]][datatype];
      var dataPoint3 = data[chosenNodes["node 3"]][0][timeStampFull[counter2]][datatype];
      var dataPoint4 = data[chosenNodes["node 4"]][0][timeStampFull[counter2]][datatype];
      var dataPoint5 = data[chosenNodes["node 5"]][0][timeStampFull[counter2]][datatype];
      var dataPoint6 = data[chosenNodes["node 6"]][0][timeStampFull[counter2]][datatype];
      var dataPoint7 = data[chosenNodes["node 7"]][0][timeStampFull[counter2]][datatype];
      var dataPoint8 = data[chosenNodes["node 8"]][0][timeStampFull[counter2]][datatype];
      var dataPoint9 = data[chosenNodes["node 9"]][0][timeStampFull[counter2]][datatype];
      var dataPoint10 = data[chosenNodes["node 10"]][0][timeStampFull[counter2]][datatype];

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


      //DETERMINING Y-MIN AND Y-MAX

      /*
     if(data[chosenNodes[currentNodeIndex]][0][timeStampFull[counter2]][0] < ymin)
	{
		ymin = data[chosenNodes[currentNodeIndex]][0][timeStampFull[counter2]][0];
	}
	if(data[chosenNodes[currentNodeIndex]][0][timeStampFull[counter2]][0] > ymax)
	{
		ymax = data[chosenNodes[currentNodeIndex]][0][timeStampFull[counter2]][0];
	}
	*/

    } // END FOR LOOP

//Put in yaxis options on plot function
yaxis:
	{
		min: ymin - ticks,
		max: ymax + ticks,
		ticksize: ticks
	}

	/* --------------- END DYNAMIC Y-AXIS --------------- */



	/* --------------- MULTIPLE NODES --------------- */

//ComparisonArray - NAME OF SELECTION ARRAY
var ComparisonArray = new Array();
var dataset = new Array();

/*
//template for the data formatting
var dataset = [
          {
             label: chosenNodes[currentNodeIndex],
             data: plotData,
             color: "#FF0000"
          }
*/

var data1 =
[
	{
		label: "node 1",
		data: plotData1,
		color: "#000000"
	}
];

var data2 =
[
	{
		label: "node 2",
		data: plotData2,
		color: "#FF0000"
	}
];

var data3 =
[
	{
		label: "node 3",
		data: plotData3,
		color: "#00BB00"
	}
];

var data4 =
[
	{
		label: "node 4",
		data: plotData4,
		color: "#0000FF"
	}
];

var data5 =
[
	{
		label: "node 5",
		data: plotData5,
		color: "#FFBBFF"
	}
];

var data6 =
[
	{
		label: "node 6",
		data: plotData6,
		color: "#00FFFF"
	}
];

var data7 =
[
	{
		label: "node 7",
		data: plotData7,
		color: "#FFFF00"
	}
];

var data8 =
[
	{
		label: "node 8",
		data: plotData8,
		color: "#B0B0B0"
	}
];

var data9 =
[
	{
		label: "node 9",
		data: plotData9,
		color: "#4B0066"
	}
];

var data10 =
[
	{
		label: "node 10",
		data: plotData10,
		color: "#FF8000"
	}
];

var minset = new Array();
var maxset = new Array();


for(var i = 0; i < ComparisonArray.length; i++)
{

	if(ComparisonArray[i] == "node 1")
	{
		dataset.push(data1);
		minset.push(Math.min.apply(null,data1));
		maxset.push(Math.max.apply(null,data1));
	}

	if(ComparisonArray[i] == "node 2")
	{
		dataset.push(data2);
		minset.push(Math.min.apply(null,data2));
		maxset.push(Math.max.apply(null,data2));
	}

	if(ComparisonArray[i] == "node 3")
	{
		dataset.push(data3);
		minset.push(Math.min.apply(null,data3));
		maxset.push(Math.max.apply(null,data3));
	}

	if(ComparisonArray[i] == "node 4")
	{
		dataset.push(data4);
		minset.push(Math.min.apply(null,data4));
		maxset.push(Math.max.apply(null,data4));
	}

	if(ComparisonArray[i] == "node 5")
	{
		dataset.push(data5);
		minset.push(Math.min.apply(null,data5));
		maxset.push(Math.max.apply(null,data5));
	}

	if(ComparisonArray[i] == "node 6")
	{
		dataset.push(data6);
		minset.push(Math.min.apply(null,data6));
		maxset.push(Math.max.apply(null,data6));
	}

	if(ComparisonArray[i] == "node 7")
	{
		dataset.push(data7);
		minset.push(Math.min.apply(null,data7));
		maxset.push(Math.max.apply(null,data7));
	}

	if(ComparisonArray[i] == "node 8")
	{
		dataset.push(data8);
		minset.push(Math.min.apply(null,data8));
		maxset.push(Math.max.apply(null,data8));
	}

	if(ComparisonArray[i] == "node 9")
	{
		dataset.push(data9);
		minset.push(Math.min.apply(null,data9));
		maxset.push(Math.max.apply(null,data9));
	}

	if(ComparisonArray[i] == "node 10")
	{
		dataset.push(data10);
		minset.push(Math.min.apply(null,data10));
		maxset.push(Math.max.apply(null,data10));
	}

}

ymin = Math.min.apply(null,minset);
ymax = Math.max.apply(null,maxset);

	/* --------------- END MULTIPLE NODES --------------- */