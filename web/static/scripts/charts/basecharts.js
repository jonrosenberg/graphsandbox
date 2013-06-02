var Charts = function () 
{
    var graphColors = 
    {
        "Bluish": ['#997DA1', '#312254', '#48637E', '#518DAE', '#62C3CE', '#B0C4C9', '#67868E', '#324247', '#2B383C'],
        "Scott": ['#010F27', '#031F4F', '#042E76', '#0645B1', '#0854D9', '#1366F6', '#3A80F8', '#6299F9', '#9DBFFB'],
        "Austin": ['#5F9B43', '#DB7D1F', '#BA4139', '#777','#555','#999','#bbb','#ccc','#eee'],
        "OldDefault": ['#94BA65', '#2B4E72', '#2790B0', '#777', '#555', '#999', '#bbb', '#ccc', '#eee'],
        "BlackAndOrange": ["#FF9900", "#333", "#777", "#BBB", "#555", "#999", "#CCC"],
        "Fire Starter": ['#750000', '#F90', '#777', '#555','#002646','#999','#bbb','#ccc','#eee'],
        "Mean Green": ['#5F9B43', '#DB7D1F', '#BA4139', '#777', '#555', '#999', '#bbb', '#ccc', '#eee'],
        "Demo1": ['#FCAF17', '#DF6D27', '#1D59A0', '#00A5C7', '#008C44', '#A46E08', '#B03823', '#0076A3', '#ff0000'],
        "Happy": ['#1860A8','#ea7613', '#3F7C20', '#F06078', '#F0C000', '#903060', '#F09000','#55BF3B', '#DF5353']
    }
    
    var colors = graphColors.Demo1;
	
	//var colors = Theme.chartColors;
	
	return { 
		vertical: vertical,
		horizontal: horizontal,
		pie: pie,
		donut: donut,
		line: line,
        choropleth: choropleth,
		bullets: bullets,
		wordcloud: wordcloud
	};
	
	function timeFormatter(t)
	{
	    var time=new Date();
	    time.setTime(t);
	    hours = time.getHours();
	    minutes = time.getMinutes();
	    if (minutes<10)minutes="0"+minutes
	    return hours+":"+minutes;
	};

	function integerFormatter(v)
	{
		var v2 = addCommas(v);
	    return v2;
	};
	
	function dateFormatter(t)
	{
		var time = new Date();
		time.setTime(t);
		var day = time.getDate();
		//var f = (time.getMonth() + 1) + "/" + ((day < 10) ? "0" : "") + day + "/" + (time.getYear() - 100);
		var f = (time.getMonth() + 1) + "/" + ((day < 10) ? "0" : "") + day + " " + timeFormatter(t);
		return f;
	};

	function memoryFormatter(val, axis) 
	{
	    if (val > 1000000)
	        return (val / 1000000).toFixed(axis.tickDecimals) + " MB";
	    else if (val > 1000)
	        return (val / 1000).toFixed(axis.tickDecimals) + " kB";
	    else
	        return val.toFixed(axis.tickDecimals) + " B";
	}

	function percentFormatter(val, axis) 
	{
		return (val*100).toFixed(axis.tickDecimals) + "%";
	}
	
	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}	
	
	function applyConfigToChart(options, config)
	{
		var xaxisConfig = config && config.xaxis;
		var yaxisConfig = config && config.yaxis;

		
		if (xaxisConfig && xaxisConfig.type) {
			options.xaxis = options.xaxis || {};

			if (xaxisConfig.type == "time") { options.xaxis.mode = "time"; options.xaxis.tickFormatter = timeFormatter; }
			else if (xaxisConfig.type == "date") { options.xaxis.mode = "time"; options.xaxis.tickFormatter = dateFormatter; }
			else if (xaxisConfig.type == "percent") { 
				options.xaxis.tickFormatter = percentFormatter; 
				options.xaxis.tickDecimals = 0;
				options.xaxis.ticks = [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
			}
		}

		if (yaxisConfig && yaxisConfig.type) {
			options.yaxis = options.yaxis || {};

			if (yaxisConfig.type == "percent") { 
				options.yaxis.tickFormatter = percentFormatter; 
				options.yaxis.tickDecimals = 0;
				options.yaxis.ticks = [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
			}
			else if (yaxisConfig.type == "memory") {
				options.yaxis.tickFormatter = memoryFormatter;
			}
			else if (yaxisConfig.type == "time") {
				options.yaxis.tickFormatter = timeFormatter;
			}
			else if (yaxisConfig.type == "integer") {
				options.yaxis.tickFormatter = integerFormatter;
			}
		}
	}
	
	function vertical (target, data, categories, config) {
	    var options =
        {
			colors: colors,	
			grid: {
			    minBorderMargin: 5, // in pixels, null means taken from points radius
			    hoverable: true,
			    borderWidth: 2 // in pixels
			},
			series:
            {
                bars:
                {
			        horizontal: false,
			        show: true,
			        align: 'center',
                    barWidth: 0.6,
			        fillColor: { colors: [{ opacity: 1 }, { opacity: 0.5 }] }
			    }
			},
			xaxis: 
            {
                mode: "categories",
                tickLength: 0,
                ticks: categories
			},
			legend: { show: false },			
			tooltip: true,
			tooltipOpts: {content: '%y'}
		};
		
		applyConfigToChart(options, config);
	
		var el = $(target);		
		if (el.length) {
			$.plot(el, data, options);
		}
	}
	
	function horizontal (target, data, categories, config) {
		var options = {
			colors: colors,

			grid: {
				hoverable: true, 
				borderWidth: 2
			}, 
			bars: {
				horizontal: true, 
				show: true, 
				align: 'center', 
				barWidth: .2,
				lineWidth: 0,
				fillColor: { colors: [ { opacity: 1 }, { opacity: 1} ] }
			}, 
			legend: {
				show: true
			},
	
			tooltip: true,
			tooltipOpts: {
				content: '%s: %y'
			}
		};
		
		applyConfigToChart(options, config);
	
		var el = $(target);
		if (el.length) { $.plot(el, data, options ); }
	}
	
	function pie (target, data, donutRadius) {
	    var inRadius = donutRadius || 0;
	    var options = {
			colors: colors,			
			series: {
				pie: {
				    show: true,
				    label: {show: true},
                    radius: 0.9,
                    innerRadius: inRadius,
                    startAngle: 0,
                    tilt: 1,
					stroke: { width: 4 },
                    offset: { top: 0, left: 'auto' },
                    highlight: { opacity: 0.5 }
				}
			}, 				
			legend: { show: false, position: 'ne', width: 100 }, 
			tooltip: true,
			tooltipOpts: { content: '%s: %y' },
			grid: { hoverable: true }
		};
		var el = $(target);				
		if (el.length) { $.plot(el, data, options ); }
	}


	function donut(target, data) {
	    pie(target, data, 0.5);
	}
	
	function line (target, data, config) {
		var options = {
				colors: colors,
				series: {
					lines: { 
						show: true, 
						fill: true, 
						lineWidth: 2, 
						steps: false, 
						fillColor: { colors: [{opacity: 0.4}, {opacity: 0}] } 
					},
					points: { 
						show: true, 
						radius: 3, 
						fill: true
					}
				}, 
				legend: {
					position: 'ne'
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				},
				grid: { borderWidth: 2, hoverable: true }
			};
			
			applyConfigToChart(options, config);
						
			var el = $(target);
			if (el.length) { $.plot(el, data, options ); }
	}

   function choropleth (target, datafile, config)
   {
	   var config = config || {};
	   config.width = config.width || 960;
	   config.height = config.height || 500;
	   config.geoJsonFile = config.geoJsonFile || "/scripts/d3/us.json";

	  var geoJsonFile = config.geoJsonFile;
	  var width = config.width;
	  var height = config.height;

      var quantize = d3.scale.quantize()
      .domain([0, .15])
      .range(d3.range(9).map(function (i) { return "q" + i + "-9"; }));

      var path = d3.geo.path();

      var svg = d3.select(target).append("svg").attr("width", width).attr("height", height);
      queue().defer(d3.json, geoJsonFile).defer(d3.tsv, datafile).await(ready);

      // This only works with US counties for now
      function ready(error, us, data) {
         var valById = {};
         data.forEach(function (d) { valById[d.id] = +d.rate; });
         svg.append("g").attr("class", "counties").selectAll("path").data(topojson.object(us, us.objects.counties).geometries).enter().append("path").attr("class", function (d) { return quantize(valById[d.id]); }).attr("d", path);        
         svg.append("path").datum(topojson.mesh(us, us.objects.states, function (a, b) { return a.id !== b.id; })).attr("class", "states").attr("d", path);
      }
   }    


   function bullets (target, data, config)
   {
	   	var config = config || {};
		var me = $(target);

		function randomize(d) {
		  if (!d.randomizer) d.randomizer = randomizer(d);
		  d.ranges = d.ranges.map(d.randomizer);
		  d.markers = d.markers.map(d.randomizer);
		  d.measures = d.measures.map(d.randomizer);
		  return d;
		}

		function randomizer(d) {
		  var k = d3.max(d.ranges) * .2;
		  return function(d) {
		    return Math.max(0, d + k * (Math.random() - .5));
		  };
		}

		function renderBulletChart(id, data, config)
		{
			var me = $(id);
			var maxWidth = Math.min(me.width(), config.width);
			var maxHeight = config.height;
			
			me.select("svg").empty();
			
			var margin = config.margin;
		    var width = maxWidth - margin.left - margin.right;
		    var height = maxHeight - margin.top - margin.bottom;
		
			var chart = d3.bullet()
		    .width(width)
		    .height(height);

		  var svg = d3.select(id).selectAll("svg")
		      .data(data)
		    .enter().append("svg")
		      .attr("class", "bullet")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		      .call(chart);

		  var title = svg.append("g")
		      .style("text-anchor", "end")
		      .attr("transform", "translate(-6," + height / 2 + ")");

		  title.append("text")
		      .attr("class", "title")
		      .text(function(d) { return d.title; });

		  title.append("text")
		      .attr("class", "subtitle")
		      .attr("dy", "1em")
		      .text(function(d) { return d.subtitle; });

			svg.datum(randomize).call(chart.duration(config.transitionDuration || 1000)); // TODO automatic transition
		}

		$(target).on("resize", function() { renderBulletChart(target, data, config); });
		$(target).ready(function() { renderBulletChart(target, data, config); });
			
		      //var svg = d3.select(target).append("svg").attr("width", width).attr("height", height);
		      //queue().defer(d3.json, geoJsonFile).defer(d3.tsv, datafile).await(ready);

		      // This only works with US counties for now
		      //function ready(error, us, data) {
		        // var valById = {};
		        // data.forEach(function (d) { valById[d.id] = +d.rate; });
   }    



   function wordcloud(target, data, config)
   {
		window.wordCloudTimer = null;
	   	var config = config || {};
		var fill = d3.scale.category20();

		function draw(words, dimensions) {
			var actualWidth = dimensions[1].x - dimensions[0].x;
			var actualHeight = dimensions[1].y - dimensions[0].y;
			var halfwidth = actualWidth / 2;
			var halfheight = actualHeight / 2;
			d3.select(target).append("svg")
				.attr("width", actualWidth)
				.attr("height", actualHeight)
				.attr("style", "display:block;overflow:hidden; max-width:" + actualWidth + "px; max-height:" + actualHeight + "px; margin-left:auto; margin-right:auto;")
			  .append("g")
				.attr("transform", "translate(" + halfwidth + "," + halfheight + ")")
			  .selectAll("text")
			  .data(words)
		      .enter().append("text")
		        .style("font-size", function(d) { return d.size + "px"; })
		        .style("font-family", "Impact")
		        .style("fill", function(d, i) { return fill(i); })
		        .attr("text-anchor", "middle")
		        .attr("transform", function(d) {
		          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		        })
		        .text(function(d) { return d.text; });
		}

		function renderWordGraph(id, data, config)
		{
			if (window.wordCloudTimer) {
				clearTimeout(window.wordCloudTimer);
				window.wordCloudTimer = null;
			}
			var maxAngle = config.maxAngle;
			var me = $(id);
			var maxWidth = Math.max(Math.min(me.width(), config.maxWidth || 4096), config.minWidth || 100);
			var maxHeight = Math.max(Math.min(me.height(), config.maxHeight || 4096), config.minHeight || 100);
			me.select("svg").empty();		
		    var width = maxWidth;
		    var height = maxHeight;
	
	   	    d3.layout.cloud().size([width,height])
			.words(data)
		    .rotate(function() { return ~~(Math.random() * 5) * (config.maxAngle/2) - config.maxAngle; })
		    .font("Impact")
		    .fontSize(function(d) { return d.size; })
		    .on("end", draw)
		    .start();
		};
		
		$(target).on("resize", function() { if (window.wordCloudTimer) clearTimeout(window.wordCloudTimer); window.wordCloudTimer = setTimeout(function(){ renderWordGraph(target, data, config); }, 600); });
		$(target).ready(function() { renderWordGraph(target, data, config); });
	}    
}();
