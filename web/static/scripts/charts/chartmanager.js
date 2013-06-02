function ChartManager(config)
{
   // Implement a Singleton pattern
   if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance; else arguments.callee._singletonInstance = this;

   // Static constructor
   (function constructorStatic(self, config)
   {
   })(this, config);
}

ChartManager.prototype.RenderLineChart = function(elementID, dataSet, config)
{
   var config = config || {points: { show: true }, lines: { lineWidth: 2, fill: false } };
   var data = [];
   var seriesSet = dataSet.series;
   for (var i = 0; i < seriesSet.length; i++)
   {
		var labels = (dataSet.labels && (dataSet.labels.length > 0)) ? dataSet.labels[0] : null;
		var dt1 = [];
		var series = seriesSet[i];
		var bIsDate = config && config.xaxis && ((config.xaxis.type == "time") || (config.xaxis.type == "date"));

		for( var j = 0; j < series.length; j++ )
		{
			//var label = (labels && labels.length > j) ? labels[j] : j;
			var lbl = labels ? labels[j] : j;
			if (bIsDate) {
				var d1 = new Date(lbl);
				lbl = d1.getTime();
			}
			else  {
			}
			dt1.push([lbl, series[j]]);
		}
		var seriesName = dataSet.seriesName[i];
		data.push({ data: dt1, label: seriesName, points: { show: false } });
   }
   Charts.line(elementID, data, config);   
}

ChartManager.prototype.RenderBarChart = function (elementID, dataSet, config, mode) {
    var config = config || {};

    var data = [];
    var seriesSet = dataSet.series;
    var labelsSet = dataSet.labels;

    // If this is not a valid data set, return
    if (!(seriesSet && (seriesSet.length > 0) && (seriesSet[0].length > 0))) return;

    // First grab the category values from the first series (other series must use the same ones)
    var categories = [];
    var labels = (dataSet.labels && (dataSet.labels.length > 0)) ? dataSet.labels[0] : null;
    if (labels) {
        for (var i = 0; i < labels.length; i++) { categories.push([i, labels[i]]); }
    } else {
        for (var i = 0; i < seriesSet[0].length; i++) { categories.push([i, i]); }
    }

    // Now extract the data series and create a 2D data point for each Series value.  Example: [ [0, 37.3], [1, 98.2], [2, 17.5] ]
    // The first value for each data point is the index # and it will map to the categories string / label for each in the Ticks
    // array for Flot.js 0.7.  In 0.8, we have support for categorical values in the vector directly so no need for an indexer.
    for (var i = 0; i < seriesSet.length; i++) {
        var dataPoints = [];
        var series = seriesSet[i];
        for (var j = 0; j < series.length; j++) {
            dataPoints.push([j, series[j]]);
        }
        data.push({ data: dataPoints });
    }

    if (mode == "Vertical") 
	{
        Charts.vertical(elementID, data, categories, config);
    }
    else 
	{
        Charts.horizontal(elementID, data, categories, config);
    }
}

ChartManager.prototype.RenderVerticalBarChart = function (elementID, dataSet, config) {
    ChartManager.prototype.RenderBarChart(elementID, dataSet, config, "Vertical");
}


ChartManager.prototype.RenderHorizontalBarChart = function (elementID, dataSet, config) {
    ChartManager.prototype.RenderBarChart(elementID, dataSet, config, "Horizontal");
}


ChartManager.prototype.RenderPieChart = function (elementID, dataSet, config)
{
   var config = config || {};
   var series = dataSet.series[0];
   var data = [];
   for (var i = 0; i < series.length; i++)
   {
      var n = series[i];
      var labeltext = dataSet.labels[0][i];
      var slice = {label: labeltext, data: n};
      data.push(slice);
   } 	
   Charts.pie(elementID, data);
}

ChartManager.prototype.RenderDonutChart = function (elementID, dataSet, config) {
    var config = config || {};
    var series = dataSet.series[0];
    var data = [];
    for (var i = 0; i < series.length; i++) {
        var n = series[i];
        var labeltext = dataSet.labels[0][i];
        var slice = { label: labeltext, data: n };
        data.push(slice);
    }
    Charts.donut(elementID, data);
}

ChartManager.prototype.RenderChoropleth = function (elementID, datafile, config)
{
   var config = config || {};
   
   // Defaults:
   //config.width = config.width || 960;
   //config.height = config.height || 500;
   //config.geoJsonFile = config.geoJsonFile || "/data/shared/datasets/geojson/us.json";

   var datafile = datafile || "/data/shared/datasets/unemployment/unemployment.tsv";
   
   Charts.choropleth(elementID, datafile, config);
}

ChartManager.prototype.RenderBulletCharts = function (elementID, dataSet, config)
{
    var config = config || {};
	config.margin = config.margin || {top: 5, right: 40, bottom: 20, left: 120};
   	config.width = config.width || 960;
   	config.height = config.height || 50;
	
	var measureSeries = dataSet.series[0];
	var rangeSeries = dataSet.series[1];
	var markerSeries = dataSet.series[2];
	var titleLabels = dataSet.labels[0];
	var subtitleLabels = dataSet.labels[1];
    var data = [];
		
	// Every "row" in the data model represents a complex type vector with data for a bullet graph
	// Series #0 holds the measures, Series #1 holds the ranges, and Series #2 optionally holds the markers.
	// Labels #0 holds the title and Labels #1 optionally holds the subtitle.
    for (var i = 0; i < measureSeries.length; i++) {
        var measures = measureSeries[i];
		var ranges = rangeSeries[i];
		var markers = (markerSeries.length > i) ? markerSeries[i] : null;
		var title = titleLabels[i];
		var subtitle = (subtitleLabels.length > i) ? subtitleLabels[i] : null;
        data.push({"title":title,"subtitle":subtitle,"ranges":ranges,"measures":measures,"markers":markers});
    }

    Charts.bullets(elementID, data, config);
}


ChartManager.prototype.RenderWordCloud = function (elementID, dataSet, config)
{
    var config = config || {};
   	config.minWidth = config.minWidth || 100;
   	config.minHeight = config.minHeight || 100;
	config.maxAngle = (config.maxAngle != null) ? config.maxAngle : 60.0; // Might be 0
	config.minWordSize = config.minWordSize || 6.0;
	
	var words = dataSet.labels[0];
	var frequencies = dataSet.series[0];
	var data = [];
	var maxFrequency = _.max(frequencies);
	var minFrequency = _.min(frequencies);
	var frequencyScale = config.maxAngle / (maxFrequency - minFrequency);
	for (var i = 0; i < words.length; i++) {
		var size = (frequencies[i] * frequencyScale) + config.minWordSize;
		data.push({ text: words[i], size: size });
	}
    Charts.wordcloud(elementID, data, config);
}
