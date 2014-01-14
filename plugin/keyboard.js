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
	
	<div id="keyboardContainer">
		<div class="minKeyboard"><div class="minTextKeyboard">-</div></div>
		<div class="keysKeyboard">

		</div>
	</div>

	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>



	<script type="text/javascript" src="keyboard.js"></script>
	<link rel="stylesheet" type="text/css" href="keyboard.css">
*/

//FADE IN REFERENCE KEY AFTER A FEW SECONDS
//SWIPE SIDE TO SIDE FOR DIFFERENT KEYBOARDS
//TRY FADE IN NEXT KEYBOARD

//STUFF THAT HAPPENS BEFORE THE KEYBOARD

//put in html

var bothloaded = 0;

console.log("running ch4t");
//jquery loaded? if not, load it
if(typeof jQuery=='undefined') {
	console.log("no jQuery, loading");
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag1 = document.createElement('script');
    jqTag1.type = 'text/javascript';
    jqTag1.src = 'https://code.jquery.com/jquery-1.10.1.min.js';
    jqTag1.onload = confirmBothLoaded;
    headTag.appendChild(jqTag1);

    var jqTag2 = document.createElement('script');
    jqTag2.type = 'text/javascript';
    jqTag2.src = 'https://code.jquery.com/jquery-migrate-1.2.1.min.js';
    jqTag2.onload = confirmBothLoaded;
    headTag.appendChild(jqTag2);
} else {
	console.log("jQuery loaded, proceeding");
     loadMathJax();
}

function confirmBothLoaded(){
	if(bothloaded == 1){
		loadMathJax();
	}else{
		bothloaded++;
	}
}

function loadMathJax(){
	console.log("loaded jQuery");

	if(typeof MathJax == 'undefined'){
		console.log("no MathJax, loading");
		var headTag = document.getElementsByTagName("head")[0];
		var mjTag = document.createElement('script');
		mjTag.type = 'text/javascript';
		mjTag.src = 'https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=AM_HTMLorMML-full';
		mjTag.onload = main;
		headTag.appendChild(mjTag);
	}else{
		console.log("MathJax loaded, proceeding");
		main();
	}
}

function main(){
console.log("loaded mathjax");

$("body").append('<div id="keyboardContainer"><div class="minKeyboard"><div class="minTextKeyboard">-</div></div><div class="keysKeyboard"></div></div>');


// key code in, string out
var mathMap = {
	// row 																// chars in order of appear on keyboard (not related to shift key in any way)
					0: {"pri": "","sec": "", "func": true}, // 1!
					1: {"pri": "", "sec": "", "func": true}, // 2@
					2: {"pri": "", "sec": "", "func": true}, // 3#
					3: {"pri": "", "sec": "", "func": true}, // 4$
					4: {"pri": "", "sec": "", "func": true}, // 5%
					5: {"pri": "", "sec": "", "func": true}, // 6^
					6: {"pri": "", "sec": "", "func": true}, // 7&
					7: {"pri": "dot", "sec": "", "func": false}, // 8*
					8: {"pri": "", "sec": "", "func": false}, // 9(
					9: {"pri": "", "sec": "", "func": false}, // 0)
					10: {"pri": "bar", "sec": "", "func": true}, // -_
					11: {"pri": "ne", "sec": "", "func": false}, // =+
					// row 2
					12: {"pri": "", "sec": "", "func": false}, // Qq
					13: {"pri": "", "sec": "", "func": false},	// Ww
					14: {"pri": "", "sec": "", "func": false}, // Ee
					15: {"pri": "", "sec": "", "func": false}, // Rr
					16: {"pri": "", "sec": "", "func": false}, // Tt
					17: {"pri": "", "sec": "", "func": false}, // Yy
					18: {"pri": "", "sec": "", "func": false}, // Uu
					19: {"pri": "int", "sec": "", "func": false}, // Ii
					20: {"pri": "infty", "sec": "", "func": false}, // Oo
					21: {"pri": "+-", "sec": "", "func": false}, // Pp
					22: {"pri": "", "sec": "", "func": true}, // {[
					23: {"pri": "", "sec": "", "func": true}, // }]
					//24: {"pri": 124, "sec": 92, "func": false}, // |\ - not in this keyboard
					// row 3
					24: {"pri": "", "sec": "", "func": false}, // Aa
					25: {"pri": "sqrt", "sec": "", "func": true}, // Ss
					26: {"pri": "", "sec": "", "func": false}, // Dd
					27: {"pri": "", "sec": "", "func": false}, // Ff
					28: {"pri": "", "sec": "", "func": false}, // Gg
					29: {"pri": "", "sec": "", "func": false}, // Hh
					30: {"pri": "", "sec": "", "func": false}, // Jj
					31: {"pri": "", "sec": "", "func": false}, // Kk
					32: {"pri": "", "sec": "", "func": false}, // Ll
					33: {"pri": "", "sec": "", "func": false}, // ;:
					34: {"pri": "", "sec": "", "func": false}, // '"
					// row 4
					35: {"pri": "", "sec": "", "func": false}, // Zz
					36: {"pri": "xx", "sec": "", "func": false}, // Xx
					37: {"pri": "", "sec": "", "func": false}, // Cc
					38: {"pri": "", "sec": "", "func": false}, // Vv
					39: {"pri": "", "sec": "", "func": false}, // Bb
					40: {"pri": "", "sec": "", "func": false}, // Nn
					41: {"pri": "", "sec": "", "func": false}, // Mm
					42: {"pri": "le", "sec": "", "func": false}, // <,
					43: {"pri": "ge", "sec": "", "func": false}, // >.
					44: {"pri": "", "sec": "", "func": false}, // ?/
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
			
			/*$('#keyboardContainer').animate({
	      		bottom: '+=342'
	  		}, 500);*/
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
	$(".minKeyboard").toggle(
		function(){
			console.log('toggle');
			
			$('#keyboardContainer').animate({
		      bottom: '+=342'
		  }, 300);
		  keyboard.keysIn("up-down");
		},
		function(){
			console.log('toggle');
			$('#keyboardContainer').animate({
		      bottom: '-=342'
		  }, 300);
		  keyboard.keysOut("down-up");
		}
	);

	// '~' minimize/maximize keyboard
	$(document).keypress(function(e) {



		if (e.which == 126) {
			$('.minKeyboard').click();
		}else if(e.keyCode == 13){
			rerenderMathJax();
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
	
	
	$(document).click(function(e){
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
	var str = ($(".0").hasClass("capslock")) ? mathMap[num].pri : String.fromCharCode(charcode);
	console.log("str: " + str);


	//do we need a buffering space for parsing?
	var bufferchar = "";

	if( $(".0").hasClass("capslock") ){
		if(getCharacterPrecedingCaret() != " " && document.activeElement.value != ""){
			console.log("buffering");
			bufferchar = " ";
		}

		console.log("preceding: " + getCharacterPrecedingCaret());

		

		//is it a function key?
		if(mathMap[num].func){
			str += "()";
		}
	}

	str = bufferchar + str;

	if(isTextSelected()){
		console.log("selected");
		replaceSelected(str);
		if(mathMap[num].func && $(".0").hasClass("capslock")){
			moveCursorBack(1);
		}
	}else{
		console.log("not selected");
		insertAtCaret(document.activeElement, str);
		if(mathMap[num].func && $(".0").hasClass("capslock")){
			moveCursorBack(1);
		}
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
	if(!((txtarea.tagName && txtarea.tagName.toLowerCase() == "textarea") || (txtarea.tagName && ((txtarea.tagName.toLowerCase() == "input" && txtarea.type.toLowerCase() == "text") || txtarea.tagName.toLowerCase() == "div" )  ))){
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

function getSelectedText() {
    var len = document.activeElement.val().length;
    var start = $document.activeElement[0].selectionStart;
    var end = document.activeElement[0].selectionEnd;
    var sel = document.activeElement.val().substring(start, end);
    return sel;
}

function isTextSelected(){
	var input = document.activeElement;
   var startPos = input.selectionStart;
   var endPos = input.selectionEnd;
   var doc = document.selection;

   if(doc && doc.createRange().text.length != 0){
      return true;
   }else if (!doc && input.value.substring(startPos,endPos).length != 0){
      return true;
   }
   return false;
}

function replaceSelected(newText){
	var tmpVal = getSelectedText();
	document.activeElement.val(document.activeElement.val().replace(tmpVal, newText));
}

function getCharacterPrecedingCaret() {
	var pos = getCaretPosition();

	var prec = document.activeElement.value.substring(pos - 1, pos);

	return prec;
}

function getCaretPosition() {
	var ctrl = document.activeElement;
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}

function rerenderMathJax(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function moveCursorBack(spaces){
	var el = document.activeElement;
	var cur_pos = 0;


	if (el.selectionStart) { 
            cur_pos = el.selectionStart; 
        } else if (document.selection) { 
            el.focus(); 
        
            var r = document.selection.createRange(); 
            if (r != null) {
                var re = el.createTextRange(), 
                    rc = re.duplicate(); 
                re.moveToBookmark(r.getBookmark()); 
                rc.setEndPoint('EndToStart', re); 
            
                cur_pos = rc.text.length; 
            }
        }  
        
        if (el.setSelectionRange) {
            el.focus();
            el.setSelectionRange(cur_pos-spaces, cur_pos-spaces);
        }
          else if (el.createTextRange) {
            var range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', cur_pos-spaces);
            range.moveStart('character', cur_pos-spaces);
            range.select();
        }
}
}
