$(function() {
	$(document).unbind('keydown').bind('keydown', function (event) {
		var doPrevent = false;
		if (event.keyCode === 8) {
			var d = event.srcElement || event.target;
			if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE')) 
				|| d.tagName.toUpperCase() === 'TEXTAREA') {
				doPrevent = d.readOnly || d.disabled;
			}
			else {
				doPrevent = true;
			}
		}
		if (doPrevent) {
			event.preventDefault();
		}
	});


	var textbox = "``";
	$(document).keypress(function(e){
		console.log(e.which, "  ", textbox);
		
		if (textbox.charAt(0) == '`' && textbox.charAt(textbox.length - 1) == '`') {
			textbox = textbox.slice(0, textbox.length - 1);
			textbox += String.fromCharCode(e.which);
			textbox += "`";
		} else {
			textbox = "`";
			textbox += String.fromCharCode(e.which);
			textbox += "`";
		}
	
		$("#math-display").text(textbox);
	});
	$(document).keydown(function(e) {
		if (e.keyCode === 8) {
			console.log("BACK");
			var temp = textbox;
			if (temp.length == 2) {
	
			} else {
				textbox = temp.slice(0, temp.length - 2);
				textbox += temp.slice(temp.length - 1);
			}

			$("#math-display").text(textbox);
		}
	});
});