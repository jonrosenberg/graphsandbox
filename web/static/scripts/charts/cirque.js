//$(function () 
//{
//	
//var data = [
//	{ label: "Manufacturing", data: Math.floor (Math.random() * 100 + 650) }, 
//	{ label: "Finance", data: Math.floor (Math.random() * 100 + 250) }, 
//	{ label: "Energy & Utilities", data: Math.floor (Math.random() * 100 + 50) }
//];
//			
//Charts.donut ('#donut-chart', data);
//});

var CirqueChart = function () 
{
    var chartColors = ['#94BA65', '#2B4E72', '#2790B0', '#777', '#555', '#999', '#bbb', '#ccc', '#eee'];
    function init() { if ($.fn.cirque) { $('.ui-cirque').cirque({}); } }
    return { init: init, chartColors: chartColors};
} ();

$(function () { CirqueChart.init(); });

