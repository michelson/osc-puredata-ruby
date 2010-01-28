function refreshSwatch() {
	val = $("#master").slider("value");
	$.ajax({
	  type: 'POST',
	  url: '/arg',
	  data: { path: "/master",  ip: $('#ip').val() , port: $('#port').val() , num: val  },
	  success: console.log("success , hex sended"+ val)
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
jQuery(document).ready(function(){
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
			change: refreshSwatch,
			slide: console.log("master changed!")
		});
	
		// setup graphic EQ
		$("#eq > span").each(function() {
			// read initial values from markup and remove that
			var value = parseInt($(this).text());
			$(this).empty();
			$(this).slider({
				value: value,
				slide: function(event, ui) {$.ajax({type: 'POST', url: '/arg',
				  data: { path: "/"+$(this).attr("path"), ip: $('#ip').val() , port: $('#port').val() , num: ui.value },
				 // success: console.log("success ,  sended"+ ui.value )
				})
				}
			})
		});
	});
});

