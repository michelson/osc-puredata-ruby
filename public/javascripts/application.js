function refreshSwatch(obj) {
	val = $(obj).slider("value");
	$.ajax({
	  type: 'POST',
	  url: '/arg',
	  data: { path: "/v", ip: "localhost" , port: "3002" , num: val  },
	  success: console.log("success , hex sended"+ val)
	 // dataType: dataType
	});
	
}
/*
$(function() {
		$("#slider-vertical").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			change: refreshSwatch,
			slide: function(event, ui) {
				$("#amount").val(ui.value);
			}
		});
		$("#amount").val($("#slider-vertical").slider("value"));
});
*/
jQuery(document).ready(
$(function() {
	// change defaults for range, animate and orientation
	$.extend($.ui.slider.defaults, {
		range: "min",
		animate: true,
		min: 0,
		max: 127,
		orientation: "vertical"
	});
	// setup master volume
	$("#master").slider({
		value: 60,
		orientation: "horizontal",
		slide: console.log("master changed!")
	});
	
	// setup graphic EQ
	$("#eq > span").each(function() {
		// read initial values from markup and remove that
		var value = parseInt($(this).text());
		$(this).empty();
		$(this).slider({
		//	value: value,
		min:-1,
		max:1,
		step:0.1,	
			slide: function(event, ui) {$.ajax({type: 'POST', url: '/arg',
			  data: { path: "/v", ip: "localhost" , port: "3002" , num: ui.value },
			  success: console.log("success , hex sended"+ ui.value )})
			}
		})
	});
})
);
