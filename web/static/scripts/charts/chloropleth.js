$(function () {
    var width = 960,
    height = 500;

    var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function (i) { return "q" + i + "-9"; }));

    var path = d3.geo.path();
    var svg = d3.select("#dashboard-audience-map").append("svg").attr("width", width).attr("height", height);
    queue().defer(d3.json, "/scripts/d3/us.json").defer(d3.tsv, "scripts/d3/unemployment.tsv").await(ready);

    function ready(error, us, unemployment) {
        var rateById = {};
        unemployment.forEach(function (d) { rateById[d.id] = +d.rate; });
        svg.append("g").attr("class", "counties").selectAll("path").data(topojson.object(us, us.objects.counties).geometries).enter().append("path").attr("class", function (d) { return quantize(rateById[d.id]); }).attr("d", path);        
        svg.append("path").datum(topojson.mesh(us, us.objects.states, function (a, b) { return a.id !== b.id; })).attr("class", "states").attr("d", path);
    }
});
