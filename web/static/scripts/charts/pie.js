$(function () {
	
var data = [
	 
	{ label: "< 17", data: Math.floor (Math.random() * 100 + 850) }, 
	{ label: "18-25", data: Math.floor (Math.random() * 100 + 650) }, 
	{ label: "26-34", data: Math.floor (Math.random() * 100 + 950) },
	{ label: "35-49", data: Math.floor (Math.random() * 100 + 950) },
        { label: "50+", data: Math.floor (Math.random() * 100 + 350) }
        
];
	
Charts.pie ('#pie-chart', data);
	
});
