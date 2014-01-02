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
	13: "\n",
	32: " ",
	33: "!",
	34: "\"",
	35: "#",
	36: "$",
	37: "%",
	38: "&",
	39: "\'",
	40: "\(",
	41: "\)",
	42: "*",
	43: "+",
	44: ",",
	45: "-",
	46: ".",
	47: "/",
	48: "0",
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	55: "7",
	56: "8",
	57: "9",
	58: ":",
	59: ";",
	60: "<",
	61: "=",
	62: ">",
	63: "?",
	64: "@",
	65: "A",
	66: "B",
	67: "C",
	68: "D",
	69: "E",
	70: "F",
	71: "G",
	72: "H",
	73: "I",
	74: "J",
	75: "K",
	76: "L",
	77: "M",
	78: "N",
	79: "O",
	80: "P",
	81: "Q",
	82: "R",
	83: "S",
	84: "T",
	85: "U",
	86: "V",
	87: "W",
	88: "X",
	89: "Y",
	90: "Z",
	91: "[",
	92: "\\",
	93: "]",
	94: "^",
	95: "_",
	96: "`",
	97: "a",
	98: "b",
	99: "c",
	100: "d",
	101: "e",
	102: "f",
	103: "g",
	104: "h",
	105: "i",
	106: "j",
	107: "k",
	108: "l",
	109: "m",
	110: "n",
	111: "o",
	112: "p",
	113: "q",
	114: "r",
	115: "s",
	116: "t",
	117: "u",
	118: "v",
	119: "w",
	120: "x",
	121: "y",
	122: "z",
	123: "{",
	124: "|",
	125: "}",
	126: "~"
};

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
		map: {
				0: [49, 33, true],
				1: [50, 64, true],
				2: [51, 35, true],
				3: [52, 36, true],
				4: [53, 37, true],
				5: [54, 94, true],
				6: [55, 38, true],
				7: [56, 42, true],
				8: [57, 40, true],
				9: [48, 42, true],
				10: [45, 95, true],
				11: [43, 61, true],
				12:
			};
		createLayout: function(layoutName, values) {
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


			keyCount
			for (var i = 0; i < keyCount; i++) {
				map.push(i:[])
			};


		},
		switchMainLayoutTo: function(layoutName) {
			var keyDivs = $(".key").get();
			var layoutValues = this.layouts[layoutName]
			
			// /var keys = Object.keys(layoutName).sort();
			console.log(layoutValues, keyDivs);
			$(".key").each(function(){
				
				var keyValue = '<div class="keyValue">'+ layoutName +'</div>';
				$(this).append(keyValue);
				// this.layouts[layoutName].
			});
		},
		switchReferenceLayout: function(layoutName) {

		}
	};

	var obj = {
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
		
});