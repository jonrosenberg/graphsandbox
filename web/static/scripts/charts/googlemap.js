var screenWidth = $(document).width();
var screenHeigth = $(document).height();

google.load('visualization', '1', { packages: ['geochart'] });

$(document).ready(function () 
{
    // Geo Map Chart
    var mapWidth = Math.round(((screenWidth / 12) * 10) * 0.8);
    var mapHeight = Math.round(mapWidth * 0.5);

    $('#dashboard-visit-map').width(mapWidth * 1.1);
    $('#dashboard-visit-map').height(mapHeight * 1.1);

    var data = google.visualization.arrayToDataTable([
		['Country', 'Page Hits'],
		['Germany', 3000],
		['United States', 4500],
		['Brazil', 11000],
		['Canada', 9000],
		['France', 14000],
		['RU', 8700],
		['NL', 20000]
	]);

    var geochart = new google.visualization.GeoChart(
		document.getElementById('dashboard-visit-map'));
    geochart.draw(data, { width: mapWidth, height: mapHeight, backgroundColor: { fill: 'transparent'} });
});




