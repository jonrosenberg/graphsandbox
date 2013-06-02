$(function () {
	
    var ds = [];
	var data = [];
/*
	ds.push([[73, 1], [44, 2], [99, 3], [68, 4], [71, 5], [49, 6], [95, 7], [75, 8], [66, 9], [43, 10], [69, 11], [42, 12], [58, 13], [71, 14], [65, 15], [34, 16], [66, 17], [66, 18], [54, 19], [61, 20], [36, 21], [43, 22]]);
	ds.push([[27, 1], [56, 2], [1, 3], [32, 4], [29, 5], [51, 6], [5, 7], [25, 8], [34, 9], [57, 10], [31, 11], [58, 12], [42, 13], [29, 14], [35, 15], [66, 16], [34, 17], [34, 18], [46, 19], [39, 20], [64, 21], [57, 22]]);

	data.push({ data: ds[0], label: 'Justin Jones', bars: { order: 1} });
	data.push({ data: ds[1], label: 'Allen Stone', bars: { order: 2} });
	data.push({ data: ds[2], label: 'Trampled by Turtles', bars: { order: 3} });
	data.push({ data: ds[3], label: 'Ben Folds Five', bars: { order: 4} });
	data.push({ data: ds[4], label: 'Alabama Shakes', bars: { order: 5} });
	data.push({ data: ds[5], label: 'ZZ Top', bars: { order: 6} });
	data.push({ data: ds[6], label: 'Jack White', bars: { order: 7} });
	data.push({ data: ds[7], label: 'Das Racist', bars: { order: 8} });
	data.push({ data: ds[8], label: 'Future Islands', bars: { order: 9} });
	data.push({ data: ds[9], label: 'Portugal. The Man', bars: { order: 10} });
	data.push({ data: ds[10], label: 'The Dismemberment Plan', bars: { order: 11} });
	data.push({ data: ds[11], label: 'Santigold', bars: { order: 12} });
	data.push({ data: ds[12], label: 'NAS', bars: { order: 13} });
	data.push({ data: ds[13], label: 'M83', bars: { order: 14} });
	data.push({ data: ds[14], label: 'Skrillex', bars: { order: 15} });
	data.push({ data: ds[15], label: 'Volta Bureau', bars: { order: 16} });
	data.push({ data: ds[16], label: 'Penguin Prison', bars: { order: 17} });
	data.push({ data: ds[17], label: 'Alvin Risk', bars: { order: 18} });
	data.push({ data: ds[18], label: 'Nervo', bars: { order: 19} });
	data.push({ data: ds[19], label: 'Thomas Gold', bars: { order: 20} });
	data.push({ data: ds[20], label: 'Porter Robinson & Zedd', bars: { order: 21} });
	data.push({ data: ds[21], label: 'Above & Beyond', bars: { order: 22} });



	ds.push ([[25, 1],[34, 2],[37, 3],[45, 4],[56, 5]]);
	ds.push ([[13, 1],[29, 2],[25, 3],[23, 4],[31, 5]]);
//	ds.push ([[8, 1],[13, 2],[19, 3],[15, 4],[14, 5]]);
    						
	data.push ({data: ds[0],  label: 'Manufacturing',  bars: { order: 1 } });
	data.push ({data: ds[1], label: 'Energy & Utilities', bars: {order: 2}});
//	data.push ({data: ds[2],  label: 'Professional Services',  bars: { order: 3}});

*/	


	ds.push ([[25, 1]]);
	ds.push ([[199, 2]]);
	ds.push ([[37, 3]]);
	ds.push ([[95, 4]]);
	ds.push ([[125, 5]]);
    						
	data.push ({data: ds[0], label: 'Like 1', bars: {order: 1}});
	data.push ({data: ds[1], label: 'Like 2', bars: {order: 2}});
	data.push ({data: ds[2], label: 'Like 3', bars: {order: 3}});
	data.push ({data: ds[3], label: 'Like 4', bars: {order: 4}});
	data.push ({data: ds[4], label: 'Like 5', bars: {order: 5}});
	
				
	Charts.horizontal ('#horizontal-chart', data);

});