// Adjusts main box order, SVG border line path, SVG circle sizes
function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
        $('.border-path').attr('d','M0 2 L' + $('#content').outerWidth(true) + ' 2 Z');
        if( $(this).width() <= 728 ) {
        	$('.img-path').attr('d','M4,55a52,52 0 1,0 104,0a52,52 0 1,0 -104,0');
        	$('.sm-path').attr('d','M8,17a11,11 0 1,0 22,0a11,11 0 1,0 -22,0');
        	$('.sm-path.opp').attr('d','M30,17a11,11 0 1,0 -22,0a11,11 0 1,0 22,0');
        }
        else {
        	$('.img-path').attr('d','M5,85a77,77 0 1,0 154,0a77,77 0 1,0 -154,0');
        	$('.sm-path').attr('d','M5,30a23,23 0 1,0 46,0a23,23 0 1,0 -46,0');
        	$('.sm-path.opp').attr('d','M51,30a23,23 0 1,0 -46,0a23,23 0 1,0 46,0');
        }
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    	$('.border-path').attr('d','M2 0 L2 ' + $('#content').outerHeight(true) + ' Z');
    }

 	var divHeight = $('#content-box').outerHeight(true)/2;
	var boxHeight = $('#content').outerHeight(true)/2;
	if( $(this).width() <= 400 ) {
		$('#content-box').css({top: Math.round(boxHeight-divHeight-20)});
	}
	else {
		$('#content-box').css({top: Math.round(boxHeight-divHeight)});
	}
}

// Run adjust() for the first time 
adjust();

// Show window when it loads and run slider
$(window).load(function() {
	$('#loader').css('background', 'none');
	$('#container').css('opacity', 1);
	$('#slider').leanSlider({
    	directionNav: '#slider-direction-nav',
    	controlNav: '#slider-control-nav'
    });
});

// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// Adjust on smart resize:
$(window).smartresize(function(){
	adjust();
});