$(function () {
	
var data = [
	{ label: "iPhone", data: Math.floor (Math.random() * 100 + 650) }, 
	{ label: "Android", data: Math.floor (Math.random() * 100 + 250) },
	{ label: "Blackberry", data: Math.floor(Math.random() * 100 + 250) },
	{ label: "Windows Mobile", data: Math.floor(Math.random() * 100 + 250) },
	{ label: "Other", data: Math.floor(Math.random() * 100 + 50) }
];
			
Charts.donut ('#donut-chart', data);

});
