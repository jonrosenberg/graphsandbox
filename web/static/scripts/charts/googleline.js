var screenWidth = $(document).width();
var screenHeigth = $(document).height();

google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(function () 
{
    // Line Chart
    var data = google.visualization.arrayToDataTable([
        ['Date', 'Hits', 'Unique'],
        ['Jan', 1000, 400],
        ['Feb', 1170, 460],
        ['Mar', 660, 1120],
        ['Apr', 1030, 540],
		['May', 1330, 540]
    ]);

    var options = {
        title: 'Website Visits',
        forceIFrame: false,
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('dashboard-visit-chart'));
    chart.draw(data, options);
});


