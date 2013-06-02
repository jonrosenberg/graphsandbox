var screenWidth = $(document).width();
var screenHeigth = $(document).height();

google.load('visualization', '1', { packages: ['gauge'] });

$(document).ready(function () {
    function drawGauge(metricName, metricValue, targetId) {
        // Gauge Chart
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          [metricName, metricValue]
        ]);

        var minGaugeHeight = 120;
        var maxGaugeHeight = 120;
        var minGaugeWidth = 120;
        var maxGaugeWidth = 120;

        var targetDiv = document.getElementById(targetId);

        var myPortlet = $('#' + targetId).parentsUntil("div.row-fluid");
        if (myPortlet) {
            maxGaugeWidth = myPortlet.width();
            minGaugeWidth = maxGaugeWidth;

            var myRow = myPortlet.parentNode;
            var rowHeight = $(myRow).height();
        }

        var options = {
            //width: Math.min(maxGaugeWidth, Math.max(minGaugeWidth, Math.round(($(targetDiv).width())))),
            //height: Math.min(maxGaugeHeight, Math.max(minGaugeHeight, $(targetDiv).height() - 30)),
            width: 120,
            height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom: 75, yellowTo: 90,
            minorTicks: 5,
            forceIFrame: false,
            backgroundColor: { fill: 'transparent' }
        };

        var chart = new google.visualization.Gauge(targetDiv);
        chart.draw(data, options);
    }

/*
    drawGauge('Total Attendance', 96, 'gauge1');
    drawGauge('VMU Brand Impressions', 46, 'gauge2');
    drawGauge('VMU Brand Sentiment', 88, 'gauge3');
    drawGauge('VMU Services Impressions', 45, 'gauge4');
    drawGauge('VMU Services Trials', 120, 'gauge5');
    drawGauge('VMU Cause Donations', 65, 'gauge6');
    drawGauge('VMU App Downloads', 42, 'gauge7');
*/
    drawGauge('', 96, 'gauge1');
    drawGauge('', 46, 'gauge2');
    drawGauge('', 88, 'gauge3');
    drawGauge('', 45, 'gauge4');
    drawGauge('', 120, 'gauge5');
    drawGauge('', 65, 'gauge6');
    drawGauge('', 42, 'gauge7');

    $('#gauges-container').height($('#dashboard-visit-map-container').height());

    $('#dashboard-visit-map-container').resize(function () {
        $('#gauges-container').height($('#dashboard-visit-map-container').height());
    });
});


