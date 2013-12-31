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

    function is101usActive(e) {
        capsLockState = checkCapsLock(e);
        return capsLockState;
    }

    keyboards = {
        "math": 
            {
                97: "pi",
                65: "sqrt"
            },
        "standard":
            {
                97: "a",
                65: "A"
            }
    };


    $(".type-in").keypress(function (e) {
        console.log("ANSWER:", keyboards.name["math"].e.which);
        if (is101usActive(e)) {
            console.log("NORMAL INPUT");
            userString = $(".type-in").val() + String.fromCharCode(e.which);
        } else {
            userString = 
            console.log("MATH INPUT");
        }
        $(".preview-in").text(userString);


    });
    $(".type-in").keydown(function (e) {
        // console.log("event fired: " + e.keyCode);
        // is101usActive(e);
        if (e.keyCode === 8) {
            console.log("BACK");
            var temp = userString;
            userString = temp.slice(0, temp.length - 1);
            $(".preview-in").text(userString);
        }
    });
});