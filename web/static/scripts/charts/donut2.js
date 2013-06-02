$(function () {
	
var data = [
	{ label: "Google Search", data: Math.floor (Math.random() * 100 + 650) }, 
	{ label: "Facebook", data: Math.floor (Math.random() * 100 + 250) },
	{ label: "Bing Search", data: Math.floor(Math.random() * 100 + 250) },
	{ label: "Twitter", data: Math.floor(Math.random() * 100 + 250) },
	{ label: "Yahoo Search", data: Math.floor(Math.random() * 100 + 50) },
	{ label: "Other", data: Math.floor(Math.random() * 100 + 50) }
];
			
Charts.donut ('#donut-chart', data);

});
