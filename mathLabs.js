$(function () {
    var userString;

    var capsLockState;

    function checkCapsLock(e) {
        var s = String.fromCharCode(e.which);
        if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
            console.log('caps is on');
            return true;
        } else {
            console.log('caps is off');
            return false;
        }
    }
    //HACK: In case that the users activate/deactivate CapsLock change the status
    //and display the correct status ONLY if the user already entered any value
    function changeCapsLock(e) {
        //e.keyCode == 20 Caps Lock key
        if (typeof capsLockState != 'undefined' && e.keyCode == 20) {
            capsLockState = !capsLockState;
        }
    }

    function is101usActive(e) {
        //kc = e.keyCode?e.keyCode:e.which;
        //if capslock is active than return true
        if (typeof capsLockState === 'undefined') {
            capsLockState = checkCapsLock(e);
            console.log("is 101 Active: " + capsLockState + " " + e.which + " " + e.keyCode);
        } else if (typeof capsLockState != 'undefined' && e.keyCode == 20) {
            capsLockState = !capsLockState;
            console.log("is 101 Active: " + capsLockState + " " + e.which + " " + e.keyCode);
        }
        
        return capsLockState;
    }

    $(".type-in").keypress(function (e) {


        if (is101usActive(e)) {
            userString = $(".type-in").val() + String.fromCharCode(e.which);
        }
        $(".preview-in").text(userString);


    });
    $(".type-in").keydown(function (e) {
        console.log("event fired: " + e.keyCode);
        is101usActive(e);
        if (e.keyCode === 8) {
            console.log("BACK");
            var temp = userString;
            userString = temp.slice(0, temp.length - 1);
            $(".preview-in").text(userString);
        }
    });
});