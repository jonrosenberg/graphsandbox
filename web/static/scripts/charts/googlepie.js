var screenWidth = $(document).width();
var screenHeigth = $(document).height();

google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(function () {
    // Pie Chart
    var data = google.visualization.arrayToDataTable([
		['Browser', 'Usage'],
		['Internet Explorer', 11],
		['Google Chrome', 2],
		['Opera', 2],
		['Safari', 2],
		['FireFox', 7]
		]);

    var options = {
        title: 'Browser Usage',
        forceIFrame: false,
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('dashboard-browser-chart'));
    chart.draw(data, options);
});


