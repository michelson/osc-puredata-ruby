function refreshSwatch() {
	val = $("#master").slider("value");
	$.ajax({
	  type: 'POST',
	  url: '/arg',
	  data: { path: "/master",  ip: $('#ip').val() , port: $('#port').val() , num: val  } //,
	 // success: console.log("success , hex sended"+ val)
	});
	
}

function init_eq(){
	// setup graphic EQ
/*	$("#eq > span").each(function() {
		var value = 0;
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
	}); */
}


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


jQuery(document).ready(function(){

	DestroyBehave = $.klass({
		initialize: function(){
			element = this.element 
		},
		onclick: function(){
			//destroy table row
			this.element.parent().parent().remove();
			// destroy slider
		//	console.log("vamos a destruir a #"+this.element.attr('destroy'));
			$("#"+this.element.attr('destroy')).remove();
			return false;
		}
	})
	
	OpenDialog = $.klass({
		initialize: function(dialog){
			element = this.element 
			 this.dialog = dialog 
				console.log(this.dialog)
		},
		onclick: function(){
			$(this.dialog).dialog('open');
			//console.log("me clickearon");
			//console.log("abrete sesamo:"+ $(this.dialog).html())
		}
	})
	
	BasicButton = $.klass({
		initialize: function(){
			
		},
		onmouseover: function(){ 
			$(this.element).addClass("ui-state-hover"); 
		},
		onmouseout: function(){
			$(this.element).removeClass("ui-state-hover"); 	
		},
		onmousedown: function(){
			$(this.element).addClass("ui-state-active"); 
	    },	
	    onmouseup: function(){
			$(this.element).removeClass("ui-state-active");
		}
		
		
	})
	
	
	
	InitSliders = $.klass({
		initialize: function(){
			console.log("se creo uno!!")
			var value = 0;
			
			console.log('se creo uno con'  +" " + $(this.element).attr("min") +" " + $(this.element).attr("max")  +" " + $(this.element).attr("step"))
			$(this.element).slider({
				min: parseInt($(this.element).attr("min")),
				max: parseInt($(this.element).attr("max")),
				step: parseFloat($(this.element).attr("step")),
				// change solo al soltar la wea, "slide" al desplazar (eso es mas intensivo)
				change: function(event, ui) {
					$.ajax({type: 'POST', url: '/arg',
					  data: { path: "/"+$(this.element).attr("path"), ip: $('#ip').val() , port: $('#port').val() , num: ui.value },
					})
				}
			 })	
				
		}
    })


	InitButtons = $.klass({
		initialize: function(){
			console.log("se creo uno!!")
			var value = 0;
		},
		onclick: function() {
			$.ajax({type: 'POST', url: '/arg',
			   data: { path: "/"+$(this.element).attr("href"), ip: $('#ip').val() , port: $('#port').val() , num: 1 },
			})
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
			change: refreshSwatch //,
			//slide: console.log("master changed!") // genera errores de ejecucion en firefox
		});
	
		init_eq();
	
	});

	/* MODAL FORM */
	$(function() {
		var name = $("#name"),
			channel = $("#channel"),
			btnchannel = $("#btn-channel"),
			min = $("#min"),
			max = $("#max"),
			step = $("#step"),
			allFields = $([]).add(channel).add(min).add(max),
			tips = $("#validateTips");

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
	    $("#button-dialog").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 350,
			width: 550,
			modal: true,
			buttons: {
			'Create an slider': function() {
					var bValid = true;
					allFields.removeClass('ui-state-error');
			
					if (bValid) {
						//console.log(btnchannel.val())
						$('#sliders tbody').append('<tr">' +
							'<td>' + btnchannel.val() + '</td>' + 
							'<td>' + '<a href="#" class="destroy" destroy="'+btnchannel.val()+'">destroy!</a>' + '</td>' +
							'</tr>');
							
							
					
						//$('#eq').append("<input type='checkbox' class='check' path='"+btnchannel.val()+"' /><label for='check'>"+btnchannel.val()+"</label>");
						$('#bt').append("<a href="+btnchannel.val()+" class='ui-button ui-state-default ui-corner-all append-bottom'>"+btnchannel.val()+"</a>");
						
						//$('#bt a').button();
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
	});
		
	// attaches !!
	jQuery(function($) {
		$('a.destroy').attach(DestroyBehave);
		$('#create-slider').attach(OpenDialog, $('#dialog') )
	    $('#create-btn').attach(OpenDialog, $('#button-dialog') )
		$("#eq span").attach(InitSliders);
		$('#bt a.ui-button').attach(InitButtons);
		$('#create-slider, #create-btn, #bt a.ui-button').attach(BasicButton)
	});

/*end*/
});



