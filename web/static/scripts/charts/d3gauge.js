function Gauge(placeholderName, configuration)
{
	this.placeholderName = placeholderName;

	var self = this; // some internal d3 functions do not "like" the "this" keyword, hence setting a local variable

	this.configure = function(configuration)
	{
		this.config = configuration;

		this.config.size = this.config.size * 0.9;

		this.config.raduis = this.config.size * 0.97 / 2;
		this.config.cx = this.config.size / 2;
		this.config.cy = this.config.size / 2;

		this.config.min = configuration.min || 0; 
		this.config.max = configuration.max || 100; 
		this.config.range = this.config.max - this.config.min;

		this.config.majorTicks = configuration.majorTicks || 5;
		this.config.minorTicks = configuration.minorTicks || 2;

		this.config.greenColor 	= configuration.greenColor || "#109618";		
		this.config.yellowColor = configuration.yellowColor || "#FF9900";		
		this.config.redColor 	= configuration.redColor || "#DC3912";

		this.config.containerDivCssClass = configuration.containerDivCssClass || "span12";
                this.config.description = configuration.description || ""; 
	}

	this.render = function()
	{
                var thediv = d3.select("#" + this.placeholderName)
                                                        .append("div")
                                                        .attr("class", this.config.containerDivCssClass)
                                                        .attr("style", "width:100%;text-align:center;");
                               
                this.body = thediv
							.append("svg:svg")
	   						.attr("class", "gauge")
	   						.attr("width", this.config.size)
	   						.attr("height", this.config.size);

		if (this.config.description.length > 0)
                {
                   thediv.append("br");
                   var t1 = thediv
							.append("span")
                                                        .attr("class", "text-center span12") 
							.text(this.config.description);
                }

		this.body.append("svg:circle")
					.attr("cx", this.config.cx)						
					.attr("cy", this.config.cy)								
					.attr("r", this.config.raduis)
					.style("fill", "#ccc")
					.style("stroke", "#000")
					.style("stroke-width", "0.5px");

		this.body.append("svg:circle")							
					.attr("cx", this.config.cx)						
					.attr("cy", this.config.cy)								
					.attr("r", 0.9 * this.config.raduis)
					.style("fill", "#fff")
					.style("stroke", "#e0e0e0")
					.style("stroke-width", "2px");

		for (var index in this.config.greenZones)
		{
			this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, self.config.greenColor);
		}

		for (var index in this.config.yellowZones)
		{
			this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, self.config.yellowColor);
		}

		for (var index in this.config.redZones)
		{
			this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, self.config.redColor);
		}

		if (undefined != this.config.label)
		{
			var fontSize = Math.round(this.config.size / 9);
			this.body.append("svg:text")								
						.attr("x", this.config.cx)
						.attr("y", this.config.cy / 2 + fontSize / 2)			 			
						.attr("dy", fontSize / 2)
						.attr("text-anchor", "middle")
						.text(this.config.label)
						.style("font-size", fontSize + "px")
						.style("fill", "#333")
						.style("stroke-width", "0px");	
		}

		var fontSize = Math.round(this.config.size / 16);		
		var majorDelta = this.config.range / (this.config.majorTicks - 1);
		for (var major = this.config.min; major <= this.config.max; major += majorDelta)
		{
			var minorDelta = majorDelta / this.config.minorTicks;
			for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta)
			{
				var point1 = this.valueToPoint(minor, 0.75);
				var point2 = this.valueToPoint(minor, 0.85);

				this.body.append("svg:line")
							.attr("x1", point1.x)
							.attr("y1", point1.y)
							.attr("x2", point2.x)
							.attr("y2", point2.y)
							.style("stroke", "#666")
							.style("stroke-width", "1px");
			}

			var point1 = this.valueToPoint(major, 0.7);
			var point2 = this.valueToPoint(major, 0.85);	

			this.body.append("svg:line")
						.attr("x1", point1.x)
						.attr("y1", point1.y)
						.attr("x2", point2.x)
						.attr("y2", point2.y)
						.style("stroke", "#333")
						.style("stroke-width", "2px");

			if (major == this.config.min || major == this.config.max)
			{
				var point = this.valueToPoint(major, 0.63);

				this.body.append("svg:text")
				 			.attr("x", point.x)
				 			.attr("y", point.y)			 			
				 			.attr("dy", fontSize / 3)
				 			.attr("text-anchor", major == this.config.min ? "start" : "end")
				 			.text(major)
				 			.style("font-size", fontSize + "px")
							.style("fill", "#333")
							.style("stroke-width", "0px");
			}
		}		



		var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");		
		this.drawPointer(0);
		pointerContainer.append("svg:circle")								
							.attr("cx", this.config.cx)						
							.attr("cy", this.config.cy)								
							.attr("r", 0.12 * this.config.raduis)
							.style("fill", "#4684EE")
							.style("stroke", "#666")
							.style("opacity", 1);
	}

	this.redraw = function(value)
	{
		this.drawPointer(value);
	}

	this.drawBand = function(start, end, color)
	{
		if (0 >= end - start) return;

		this.body.append("svg:path")
					.style("fill", color)
					.attr("d", d3.svg.arc()
						.startAngle(this.valueToRadians(start))
						.endAngle(this.valueToRadians(end))
						.innerRadius(0.65 * this.config.raduis)
						.outerRadius(0.85 * this.config.raduis))
					.attr("transform", function() { return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(270)" });
	}

	this.drawPointer = function(value)
	{
		var delta = this.config.range / 13;

		var head = this.valueToPoint(value, 0.85);
		var head1 = this.valueToPoint(value - delta, 0.12);
		var head2 = this.valueToPoint(value + delta, 0.12);

		var tailValue = value -  (this.config.range * (1/(270/360)) / 2);
		var tail = this.valueToPoint(tailValue, 0.28);
		var tail1 = this.valueToPoint(tailValue - delta, 0.12);
		var tail2 = this.valueToPoint(tailValue + delta, 0.12);

		var data = [head, head1, tail2, tail, tail1, head2, head];

		var line = d3.svg.line()
							.x(function(d) { return d.x })
							.y(function(d) { return d.y })
							.interpolate("basis");

		var pointerContainer = this.body.select(".pointerContainer");	

		var pointer = pointerContainer.selectAll("path").data([data])										

		pointer.enter()
				.append("svg:path")
					.attr("d", line)
					.style("fill", "#dc3912")
					.style("stroke", "#c63310")
					.style("fill-opacity", 0.7);

		pointer.transition()
					.attr("d", line) 
					//.ease("lineart")
					//.duration(2000);

		var fontSize = Math.round(this.config.size / 10);
		pointerContainer.selectAll("text")
							.data([value])
								.text(Math.round(value))
							.enter()
								.append("svg:text")
									.attr("x", this.config.cx)
									.attr("y", this.config.size - this.config.cy / 4 - fontSize)			 			
									.attr("dy", fontSize / 2)
									.attr("text-anchor", "middle")
									.text(Math.round(value))
									.style("font-size", fontSize + "px")
									.style("fill", "#000")
									.style("stroke-width", "0px");
	}

	this.valueToDegrees = function(value)
	{
		return value / this.config.range * 270 - 45;
	}

	this.valueToRadians = function(value)
	{
		return this.valueToDegrees(value) * Math.PI / 180;
	}

	this.valueToPoint = function(value, factor)
	{
		var point = 
		{
			x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
			y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
		}

		return point;
	}

	this.drawGauges = function(containerSelector, gaugedata)
        {
           var container = $(containerSelector);
           for (var i = 0; i < gaugedata.length; i++)
           {
              var g = gaugedata[i];
              var newSpan = document.createElement("div");
              newSpan.setAttribute("id", g.id + "Gauges"); 
              newSpan.setAttribute("class", "span2"); 
              container.append(newSpan);
              createGauge(g);
           } 
        }

	// initialization
	this.configure(configuration);	
}



function GaugeSet(containerSelector, configuration)
{
   this.containerSelector = containerSelector;
   this.data = null;
   this.gauges = [];

   var self = this; // some internal d3 functions do not "like" the "this" keyword, hence setting a local variable

   
   this.createGauge = function(g)
   {     
      var config = 
      {
         size: 125,
         label: g.unit,
         minorTicks: g.minorTicks,
         majorTicks: g.majorTicks,
         min: g.min,
         max: g.max,           
         description: g.label
      }

      if (g.zones)
      {
         if (g.zones["red"]) config.redZones = g.zones["red"];
         if (g.zones["yellow"]) config.yellowZones = g.zones["yellow"];
         if (g.zones["green"]) config.greenZones = g.zones["green"];
      }
      this.gauges[g.id] = new Gauge(g.id + "Gauges", config); 
      this.gauges[g.id].render(); 
      this.gauges[g.id].redraw(g.value);
   }


  
   this.createGauges = function(data, spanSize)
   {
      this.data = data || this.data;
      var container = $(this.containerSelector);
      container.empty();
      for (var i = 0; i < this.data.length; i++)
      {
         var g = this.data[i];
         var newSpan = document.createElement("div");
         newSpan.setAttribute("id", g.id + "Gauges");
         newSpan.setAttribute("class", "span" + spanSize);
         container.append(newSpan);
         this.createGauge(g);
      }
   }
}
