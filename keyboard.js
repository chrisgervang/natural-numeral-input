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

var standardKeys = {
				"config": {
					"charFamily": "standard",
					"setMargin": false
				},
				"mapping": {
					// row 																// chars in order of appear on keyboard (not related to shift key in any way)
					0: {"pri": 49,"sec": 33, "sb": true}, // 1!
					1: {"pri": 50, "sec": 64, "sb": true}, // 2@
					2: {"pri": 51, "sec": 35, "sb": true}, // 3#
					3: {"pri": 52, "sec": 36, "sb": true}, // 4$
					4: {"pri": 53, "sec": 37, "sb": true}, // 5%
					5: {"pri": 54, "sec": 94, "sb": true}, // 6^
					6: {"pri": 55, "sec": 38, "sb": true}, // 7&
					7: {"pri": 56, "sec": 42, "sb": true}, // 8*
					8: {"pri": 57, "sec": 40, "sb": true}, // 9(
					9: {"pri": 48, "sec": 41, "sb": true}, // 0)
					10: {"pri": 45, "sec": 95, "sb": true}, // -_
					11: {"pri": 61, "sec": 43, "sb": true}, // =+
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
					22: {"pri": 91, "sec": 219, "sb": true}, // {[
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
			console.log(layoutValues, keyDivs);
			$(".key").each(function(){
					
					var primaryChar = layoutValues.mapping[count].pri;
					var showBoth = layoutValues.mapping[count].sb;
					var secondaryChar = layoutValues.mapping[count].sec;
					var keyValue;
					if (!showBoth) {
						keyValue = '<div class="keyValue standard">'+ String.fromCharCode(primaryChar) +'</div>';
					} else {
						keyValue = '<div class="keyValue show-both">' + String.fromCharCode(secondaryChar) + '<br>' + String.fromCharCode(primaryChar) + '</div>';
					}
					$(this).append(keyValue);
					count++;
				

			});
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
	
	/////////INITILIZE///////////
	
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
		$('#keyboardContainer').animate({
	      bottom: '-=342'
	  }, 300);
	  keyboard.keysOut("down-up");
	},function(){
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
		
	});
	
	$(document).keydown(function(e){
		console.log(e.which);
		var whichKey = keyboard.layouts[currentLayout].mapping;
		var key = keyboard.findKeyFromCharCode(e.which, whichKey);
		console.log("KEY: ", key);

		//console.log(whichKey);
		$("." + key).addClass("active");
	});
	$(document).keyup(function(e){
		var whichKey = keyboard.layouts[currentLayout].mapping;
		var key = keyboard.findKeyFromCharCode(e.which, whichKey);
		console.log("KEY: ", key);

		//console.log(whichKey);
		$("." + key).removeClass("active");
	});
	
	




	// $('.key').mousedown(function(){
	// 	console.log($(this).attr('class').split(' ')[1]);
	// 	var keyNum = "." + $(this).attr('class').split(' ')[1];
	// 	$(keyNum).
	// });
});

/*
In any text box one can insert and delete text at the cursor point.
The cursor position is the only other significant thing.
Write three melthods:
- change cursor position
- insert @ cursor position 
- delete @ cursor position
*/ 


function insertAtCaret(areaId,text) {
    var txtarea = document.getElementById(areaId);
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