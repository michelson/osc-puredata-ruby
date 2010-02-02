function refreshSwatch() {
	val = $("#master").slider("value");
	$.ajax({
	  type: 'POST',
	  url: '/arg',
	  data: { path: "/master",  ip: $('#ip').val() , port: $('#port').val() , num: val  },
	  success: console.log("success , hex sended"+ val)
	});
	
}

function init_eq(){
	// setup graphic EQ
	$("#eq > span").each(function() {
		// read initial values from markup and remove that
		var value = 0;
		$(this).html();
	
		console.log ('min' + parseInt($(this).attr("min")));
		console.log ('max' + parseInt($(this).attr("max")));
		console.log ('step' + parseFloat($(this).attr("step")));
	
		$(this).slider({
			min: parseInt($(this).attr("min")),
			max: parseInt($(this).attr("max")),
			step: parseFloat($(this).attr("step")),
			// change solo al soltar la wea, "slide" al desplazar (eso es mas intensivo)
			change: function(event, ui) {$.ajax({type: 'POST', url: '/arg',
			  data: { path: "/"+$(this).attr("path"), ip: $('#ip').val() , port: $('#port').val() , num: ui.value },
			})
			}
		})
	});
}

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
	
		init_eq();
	
	});
});

