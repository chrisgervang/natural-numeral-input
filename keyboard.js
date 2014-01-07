//dynamically creates and inserts a visual keyboard 
//to the bottom of the screen

//keyboard layout defined by 
/*	
	keyboard.init({
		[# in row 0, offset],
		[# in row 1, offset],
		[# in row 2, offset],
		[# in row 3, offset]
    });

    keyboard.createLayout(
		name,
		{values}
    );

    keyboard.switchLayoutTo(
    	name
    );
	
	//takes in unicode
	keyboard.keyPress(key);
	//returns actual layout's value
	
	
*/

//FADE IN REFERENCE KEY AFTER A FEW SECONDS
//SWIPE SIDE TO SIDE FOR DIFFERENT KEYBOARDS
//TRY FADE IN NEXT KEYBOARD

//STUFF THAT HAPPENS BEFORE THE KEYBOARD

//jquery loaded? if not, load it
if(typeof jQuery=='undefined') {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'http://code.jquery.com/jquery-latest.min.js';
    jqTag.onload = loadMathJax;
    headTag.appendChild(jqTag);
} else {
     loadMathJax();
}

function loadMathJax(){
	console.log("loaded jQuery");

	if(typeof MathJax == 'undefined'){
		var headTag = document.getElementsByTagName("head")[0];
		var mjTag = document.createElement('script');
		mjTag.type = 'text/javascript';
		mjTag.src = 'https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=AM_HTMLorMML-full';
		mjTag.onload = main;
		headTag.appendChild(mjTag);
	}else{
		main();
	}
}

function main(){
console.log("loaded mathjax");


// key code in, string out
var mathMap = {
	// row 																// chars in order of appear on keyboard (not related to shift key in any way)
					0: {"pri": "","sec": "", "sb": true}, // 1!
					1: {"pri": "", "sec": "", "sb": true}, // 2@
					2: {"pri": "", "sec": "", "sb": true}, // 3#
					3: {"pri": "", "sec": "", "sb": true}, // 4$
					4: {"pri": "", "sec": "", "sb": true}, // 5%
					5: {"pri": "", "sec": "", "sb": true}, // 6^
					6: {"pri": "", "sec": "", "sb": true}, // 7&
					7: {"pri": "dot", "sec": "", "sb": true}, // 8*
					8: {"pri": "", "sec": "", "sb": true}, // 9(
					9: {"pri": "", "sec": "", "sb": true}, // 0)
					10: {"pri": "bar", "sec": "", "sb": true}, // -_
					11: {"pri": "ne", "sec": "", "sb": true}, // =+
					// row 2
					12: {"pri": "", "sec": "", "sb": false}, // Qq
					13: {"pri": "", "sec": "", "sb": false},	// Ww
					14: {"pri": "", "sec": "", "sb": false}, // Ee
					15: {"pri": "", "sec": "", "sb": false}, // Rr
					16: {"pri": "", "sec": "", "sb": false}, // Tt
					17: {"pri": "", "sec": "", "sb": false}, // Yy
					18: {"pri": "", "sec": "", "sb": false}, // Uu
					19: {"pri": "int", "sec": "", "sb": false}, // Ii
					20: {"pri": "infty", "sec": "", "sb": false}, // Oo
					21: {"pri": "+-", "sec": "", "sb": false}, // Pp
					22: {"pri": "", "sec": "", "sb": true}, // {[
					23: {"pri": "", "sec": "", "sb": true}, // }]
					//24: {"pri": 124, "sec": 92, "sb": false}, // |\ - not in this keyboard
					// row 3
					24: {"pri": "", "sec": "", "sb": false}, // Aa
					25: {"pri": "sqrt", "sec": "", "sb": false}, // Ss
					26: {"pri": "", "sec": "", "sb": false}, // Dd
					27: {"pri": "", "sec": "", "sb": false}, // Ff
					28: {"pri": "", "sec": "", "sb": false}, // Gg
					29: {"pri": "", "sec": "", "sb": false}, // Hh
					30: {"pri": "", "sec": "", "sb": false}, // Jj
					31: {"pri": "", "sec": "", "sb": false}, // Kk
					32: {"pri": "", "sec": "", "sb": false}, // Ll
					33: {"pri": "", "sec": "", "sb": true}, // ;:
					34: {"pri": "", "sec": "", "sb": true}, // '"
					// row 4
					35: {"pri": "", "sec": "", "sb": false}, // Zz
					36: {"pri": "xx", "sec": "", "sb": false}, // Xx
					37: {"pri": "", "sec": "", "sb": false}, // Cc
					38: {"pri": "", "sec": "", "sb": false}, // Vv
					39: {"pri": "", "sec": "", "sb": false}, // Bb
					40: {"pri": "", "sec": "", "sb": false}, // Nn
					41: {"pri": "", "sec": "", "sb": false}, // Mm
					42: {"pri": "le", "sec": "", "sb": true}, // <,
					43: {"pri": "ge", "sec": "", "sb": true}, // >.
					44: {"pri": "", "sec": "", "sb": true}, // ?/
}

var standardKeys = {
				"config": {
					"charFamily": "standard",
					"setMargin": false
				},
				"mapping": {
					// row 																// chars in order of appear on keyboard (not related to shift key in any way)
					0: {"pri": 33,"sec": 49, "sb": true}, // 1!
					1: {"pri": 64, "sec": 50, "sb": true}, // 2@
					2: {"pri": 35, "sec": 51, "sb": true}, // 3#
					3: {"pri": 36, "sec": 52, "sb": true}, // 4$
					4: {"pri": 37, "sec": 53, "sb": true}, // 5%
					5: {"pri": 94, "sec": 54, "sb": true}, // 6^
					6: {"pri": 38, "sec": 55, "sb": true}, // 7&
					7: {"pri": 42, "sec": 56, "sb": true}, // 8*
					8: {"pri": 40, "sec": 57, "sb": true}, // 9(
					9: {"pri": 41, "sec": 48, "sb": true}, // 0)
					10: {"pri": 95, "sec": 45, "sb": true}, // -_
					11: {"pri": 43, "sec": 61, "sb": true}, // =+
					// row 2
					12: {"pri": 81, "sec": 113, "sb": false}, // Qq
					13: {"pri": 87, "sec": 119, "sb": false},	// Ww
					14: {"pri": 69, "sec": 101, "sb": false}, // Ee
					15: {"pri": 82, "sec": 114, "sb": false}, // Rr
					16: {"pri": 84, "sec": 116, "sb": false}, // Tt
					17: {"pri": 89, "sec": 121, "sb": false}, // Yy
					18: {"pri": 85, "sec": 117, "sb": false}, // Uu
					19: {"pri": 73, "sec": 105, "sb": false}, // Ii
					20: {"pri": 79, "sec": 111, "sb": false}, // Oo
					21: {"pri": 80, "sec": 112, "sb": false}, // Pp
					22: {"pri": 91, "sec": 123, "sb": true}, // {[
					23: {"pri": 93, "sec": 125, "sb": true}, // }]
					//24: {"pri": 124, "sec": 92, "sb": false}, // |\ - not in this keyboard
					// row 3
					24: {"pri": 65, "sec": 97, "sb": false}, // Aa
					25: {"pri": 83, "sec": 115, "sb": false}, // Ss
					26: {"pri": 68, "sec": 100, "sb": false}, // Dd
					27: {"pri": 70, "sec": 102, "sb": false}, // Ff
					28: {"pri": 71, "sec": 103, "sb": false}, // Gg
					29: {"pri": 72, "sec": 104, "sb": false}, // Hh
					30: {"pri": 74, "sec": 106, "sb": false}, // Jj
					31: {"pri": 75, "sec": 107, "sb": false}, // Kk
					32: {"pri": 76, "sec": 77, "sb": false}, // Ll
					33: {"pri": 59, "sec": 58, "sb": true}, // ;:
					34: {"pri": 39, "sec": 34, "sb": true}, // '"
					// row 4
					35: {"pri": 90, "sec": 122, "sb": false}, // Zz
					36: {"pri": 88, "sec": 120, "sb": false}, // Xx
					37: {"pri": 67, "sec": 99, "sb": false}, // Cc
					38: {"pri": 86, "sec": 118, "sb": false}, // Vv
					39: {"pri": 66, "sec": 98, "sb": false}, // Bb
					40: {"pri": 78, "sec": 110, "sb": false}, // Nn
					41: {"pri": 77, "sec": 109, "sb": false}, // Mm
					42: {"pri": 44, "sec": 60, "sb": true}, // <,
					43: {"pri": 46, "sec": 62, "sb": true}, // >.
					44: {"pri": 47, "sec": 63, "sb": true}, // ?/
			}
		}

$(function() {
	

	keyboard = {
		init: function (objArray) {
			var boxID = 0;
			jQuery.each(objArray, function(row, rowArray) {
	  			
	  			var numOfKeys = rowArray[0];
	  			var offset = rowArray[1];
	  			$(".keysKeyboard").append('<div class="keyRow-' + row + '"/>');	
	  			for (var col = 0; col < numOfKeys; col++) {
  					$(".keyRow-" + row).append('<div class="key ' + boxID + '"/>');
  					var box = "." + boxID;
  					$(box).css({left: offset, top: row * 70}).hide();
  					//changes space between square
  					offset += squareSize + 15;
  					boxID++;
	  			}
			});
			
			keyCount = boxID;
			
			$('#keyboardContainer').animate({
	      		bottom: '+=342'
	  	}, 500);
	  	keyboard.keysIn("up-down");	
		},
		strobe: function () {
			setInterval(function(){
				$(".keysKeyboard").css("visibility", function(){
						var poop = $(".key").css("visibility");
						if (poop == "hidden") {
							return "visible";
						} else {
							return "hidden";
						}
					})
			}, 50);
		},
		keysIn: function(direction) {
			keyCollection = $(".key");
			if (direction == "up-down") {
				$(".key").each(function(i){
					$(this).delay(4* i).fadeIn('fast');
				});
			} else if(direction == "down-up") {
				$($(".key").get().reverse()).each(function(i){
					$(this).delay(4* i).fadeIn('slow');
				});
			}

			
			// for (var i = 0; i < keyCollection.length; i++) {
			// 	setTimeout(function() {
			// 		$(keyCollection[i]).css("visibility", "visible");
			// 	}, 50);
			// };

		},
		keysOut: function(direction) {
			keyCollection = $(".key");
			if (direction == "up-down") {
				$(".key").each(function(i){
					$(this).delay(4* i).fadeOut('fast');
				});
			} else if(direction == "down-up") {
				$($(".key").get().reverse()).each(function(i){
					$(this).delay(4* i).fadeOut('fast');
				});
			}
		},
		layouts: {},
		currentLayout: "",
		keyCount: 0,
		//map notes:
		//{1st value (primary), 2nd value (secondary), show both?, margin-top (only if type is )} - if sb != true, then show one.
		createLayout: function(layoutName, keyJSON) {
			/////this.layouts[layoutName] = values;
			//put values (unicode's) in proper postion, and then add it to layouts object.
			//make a reference map for unicode -> proper "key" div
			//there can 2 keys for each "key" div
			/*
			map {
				"key" div: [1st value, 2nd value, display both?]
				12: [65,97, false]
			}
			*/
			//sort the new layout

/*
			keyCount
			for (var i = 0; i < keyCount; i++) {
				map.push(i:[])
			};
*/
			this.layouts[layoutName] = keyJSON;
			currentLayout = layoutName;

		},
		switchMainLayoutTo: function(layoutName) {
			var keyDivs = $(".key").get();
			var layoutValues = this.layouts[layoutName]
			var count = 0;
			
			// /var keys = Object.keys(layoutName).sort();
			$(".key").each(function(){
					
					
					if($(".0").hasClass("capslock")){
						var primary = mathMap[count].pri;
						var showBoth = mathMap[count].sb;
						var secondary = mathMap[count].sec;
						var keyValue;
						if (!showBoth) {
							keyValue = '<div class="keyValue math">`'+ primary +'`</div>';
						} else {
							keyValue = '<div class="keyValue math">`' + primary + '`<br>`' + secondary + '`</div>';
						}
					}else{
						var primaryChar = layoutValues.mapping[count].pri;
						var showBoth = layoutValues.mapping[count].sb;
						var secondaryChar = layoutValues.mapping[count].sec;
						var keyValue;
						if (!showBoth) {
							keyValue = '<div class="keyValue standard">'+ String.fromCharCode(primaryChar) +'</div>';
						} else {
							keyValue = '<div class="keyValue show-both">' + String.fromCharCode(primaryChar) + '<br>' + String.fromCharCode(secondaryChar) + '</div>';
						}
					}
					$(this).html(keyValue);
					count++;
				

			});
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		},
		switchReferenceLayout: function(layoutName) {

		},
		findKeyFromCharCode: function(keyCode, keyCodeMap) {
			//console.log("KEY MAP", keyCodeMap, keyCode);
			var returnKey = -1;
			jQuery.each(keyCodeMap, function(key, value){
				var pri = value.pri;
				var sec = value.sec;
				//console.log(pri, sec, key);
				
				if (pri == keyCode || sec == keyCode) {
					//console.log("YAY");
					returnKey = key;
				} 
			});
			return returnKey; //if no match
		}
	};


	//builds keyboard
	var obj = {
		//row: [keys, leftbuffer]
		0: [12,60],
		1: [12, 95],
		2: [11, 115],
		3: [10, 150]
	};
	
	/////////INITIALIZE///////////
	
	//width/height of each square
	var squareSize = 55;
	keyboard.init(obj);
	//keyboard.keysIn("up-down");
	keyboard.createLayout("US101", standardKeys);
	keyboard.switchMainLayoutTo("US101");

	
	//Centering style notes for each key: 
	// - we can center anything width wise easy: text-align: center; line-height: 55px;
	// - vertical centering for normal text: vertical-align: middle;
	// - vertical centering for MathJax: margin-top: #%;

	//////////////EVENTS///////////////
	$(".minKeyboard").toggle(function(){
		console.log('toggle');
		$('#keyboardContainer').animate({
	      bottom: '-=342'
	  }, 300);
	  keyboard.keysOut("down-up");
	},function(){
		console.log('toggle');
		return;
		$('#keyboardContainer').animate({
	      bottom: '+=342'
	  }, 300);
	  keyboard.keysIn("up-down");
	});

	// '~' minimize/maximize keyboard
	$(document).keypress(function(e) {
		if (e.which == 126) {
			$('.minKeyboard').click();
		}
		
		console.log(e.which);
		var whichKey = keyboard.layouts[currentLayout].mapping;
		var key = keyboard.findKeyFromCharCode(e.which, whichKey);
		console.log("KEY: ", key);

		active(e.which, key);

		//console.log(whichKey);
		$("." + key).addClass("active");
		setTimeout(function(){
			$("." + key).removeClass("active")
		},30);

		return false;
	});

	$(document).keydown(function(e){
		if(e.which == 20 && !$(".0").hasClass("capslock")){
			for(var i = 0; i <= 44; i++){
				$("." + i).addClass("capslock");
			}

			keyboard.switchMainLayoutTo("US101");
		}

		if(e.which == 16){
			for(var i = 0; i <= 44; i++){
				$("." + i).addClass("shifted");
			}
		}
	});
	
	$(document).keyup(function(e){
		if(!capLock(e) && e.which == 20 && $(".0").hasClass("capslock")){
			for(var i = 0; i <= 44; i++){
				$("." + i).removeClass("capslock");
			}

			keyboard.switchMainLayoutTo("US101");
		}

		if(e.which == 16){
			for(var i = 0; i <= 44; i++){
				$("." + i).removeClass("shifted");
			}
		}
	});
	
	
	$(document).mousedown(function(e){
		if(e.target.id == "keyboardContainer" || e.target.className == "keysKeyboard"){
			e.preventDefault();
		}
	});


	$('.key').mousedown(function(e){
		var num = $(this).attr('class').split(' ')[1]
		console.log("Click: " + num);
	 	var keyNum = "." + num;
	 	$(keyNum)

	 	if(e.shiftKey){
	 		active(standardKeys.mapping[num].pri, num);
	 	}else{
	 		active(standardKeys.mapping[num].sec, num);
	 	}

	 	e.preventDefault();
	 });
});

/*
In any text box one can insert and delete text at the cursor point.
The cursor position is the only other significant thing.
Write three melthods:
- change cursor position
- insert @ cursor position 
- delete @ cursor position
*/ 

//fired when button is clicked or key is pressed
function active(charcode, num){
	if($(".0").hasClass("capslock")){
		insertAtCaret(document.activeElement, " "+mathMap[num].pri);
	}else{
		insertAtCaret(document.activeElement, String.fromCharCode(charcode));
	}
	
}

//check if capslock is held when event e is fired
function capLock(e){
 kc = e.keyCode?e.keyCode:e.which;
 sk = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
 return ((kc >= 65 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk);
}

//insert text into textarea at cursor position
function insertAtCaret(txtarea,text) {
	if(!((txtarea.tagName && txtarea.tagName.toLowerCase() == "textarea") || (txtarea.tagName && txtarea.tagName.toLowerCase() == "input" && txtarea.type.toLowerCase() == "text"))){
		return;
	}

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
    	"ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	range.moveStart ('character', strPos);
    	range.moveEnd ('character', 0);
    	range.select();
    }
    else if (br == "ff") {
    	txtarea.selectionStart = strPos;
    	txtarea.selectionEnd = strPos;
    	txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}
}
