//
	//  Use a closure to hide the local variables from the
//  global namespace
//
$(function(){
	var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
	var math = null;                // the element jax for the math output.

	//
	//  Get the element jax when MathJax has produced it.
	//
	QUEUE.Push(function () {
	  math = MathJax.Hub.getAllJax("MathOutput")[0];
	});

	//
	//  The onchange event handler that typesets the
	//  math entered by the user
	//
	window.UpdateMath = function (AM) {
	  QUEUE.Push(["Text",math,AM]);
	}


	
});