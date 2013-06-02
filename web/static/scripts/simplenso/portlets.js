
/* portlets.html specific script */
$(document).ready(function(){	
	if($("body").attr("id") == "portlets") {
		var boxHeight = $("#box-4").find('.box-content').height();
		$('.box-content').height(boxHeight);
		
	}
});

