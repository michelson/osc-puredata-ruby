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

	DestroyBehave = $.klass({
		initialize: function(){
			element = this.element 
		},
		onclick: function(){
			//destroy table row
			this.element.parent().parent().remove();
			// destroy slider
			console.log("vamos a destruir a #"+this.element.attr('destroy'));
			$("#"+this.element.attr('destroy')).remove();
			return false;
		}
	})



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

	/* MODAL FORM */
	$(function() {
	
	var name = $("#name"),
		channel = $("#channel"),
		min = $("#min"),
		max = $("#max"),
		step = $("#step"),
		allFields = $([]).add(channel).add(min).add(max),
		tips = $("#validateTips");

	function updateTips(t) {
		tips.text(t).effect("highlight",{},1500);
	}

	function checkLength(o,n,min,max) {

		if ( o.val().length > max || o.val().length < min ) {
			o.addClass('ui-state-error');
			updateTips("Length of " + n + " must be between "+min+" and "+max+".");
			return false;
		} else {
			return true;
		}

	}

	function checkRegexp(o,regexp,n) {

		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass('ui-state-error');
			updateTips(n);
			return false;
		} else {
			return true;
		}

	}
	
	$("#dialog").dialog({
		bgiframe: true,
		autoOpen: false,
		height: 500,
		width: 550,
		modal: true,
		buttons: {
			'Create an slider': function() {
				var bValid = true;
				allFields.removeClass('ui-state-error');

			/*	bValid = bValid && checkLength(channel,"channel",3,16);
				bValid = bValid && checkLength(min,"min",6,80);
				bValid = bValid && checkLength(max,"max",5,16);
				//bValid = bValid && checkRegexp(password,/^([0-9a-zA-Z])+$/,"Password field only allow : a-z 0-9");
				bValid = bValid && checkLength(step,"step",5,16);*/
				
				if (bValid) {
					$('#sliders tbody').append('<tr">' +
						'<td>' + channel.val() + '</td>' + 
						'<td>' + min.val() + '</td>' + 
						'<td>' + max.val() + '</td>' +
						'<td>' + step.val() + '</td>' +
						'<td>' + '<a href="#" class="destroy" destroy="'+channel.val()+'">destroy!</a>' + '</td>' +
						'</tr>');
						
							$('#eq').append("<span path='"+channel.val()+"' min='"+min.val()+"' max='"+max.val()+"' step='"+step.val()+"' id='"+channel.val()+"'></span>");
							init_eq();
							$(this).dialog('close');
							// display table
							$('#users-contain').show();
				}
			},
		Cancel: function() {
				$(this).dialog('close');
			 }
		},
		close: function() {
			allFields.val('').removeClass('ui-state-error');
		}
	});
	
	jQuery(function($) {
		$('a.destroy').attach(DestroyBehave);
	});
	
$('#create-slider').click(function() {
		$('#dialog').dialog('open');
	}).hover(
		function(){ 
			$(this).addClass("ui-state-hover"); 
		},
		function(){ 
			$(this).removeClass("ui-state-hover"); 
		}
	).mousedown(function(){
		$(this).addClass("ui-state-active"); 
	})
	.mouseup(function(){
			$(this).removeClass("ui-state-active");
	});

 });
/*end*/
});



