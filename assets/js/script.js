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
	$('#content-box').css({top: Math.round(boxHeight-divHeight)});
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
  setTimeout(function() {
    $('<img src="assets/img/java.gif"/>');
  }, 500);
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

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

/**
 * svganimations2.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

	'use strict';

	window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	window.cancelAnimFrame = function(){
		return (
			window.cancelAnimationFrame       || 
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			window.oCancelAnimationFrame      || 
			window.msCancelAnimationFrame     || 
			function(id){
				window.clearTimeout(id);
			}
		);
	}();
	
	var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) ),
		hidden = Array.prototype.slice.call( document.querySelectorAll( '.hide' ) ),
		hidden_box = Array.prototype.slice.call( document.querySelectorAll( '.hide-bg' ) ),
		current_frame = 0,
		total_frames = 60,
		path = new Array(),
		length = new Array(),
		handle = 0;

	function init() {
		[].slice.call( document.querySelectorAll( 'path' ) ).forEach( function( el, i ) {
			path[i] = el;
			var l = path[i].getTotalLength();
			length[i] = l;
			path[i].style.strokeDasharray = l + ' ' + l; 
			path[i].style.strokeDashoffset = l;
		} );

	}

	function draw() {
		var progress = current_frame/total_frames;
		if (progress > 1) {
			window.cancelAnimFrame(handle);
			showPage();
		} else {
			current_frame++;
			for(var j=0; j<path.length;j++){
				path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
			}
			handle = window.requestAnimFrame(draw);
		}
	}

	function showPage() {
		svgs.forEach( function( el, i ) {
			el.setAttribute( 'class', el.getAttribute('class') + ' hide' );
		} );
		hidden.forEach( function( el, i ) {
			classie.remove( el, 'hide' );
			classie.add( el, 'show' );
		} );
		hidden_box.forEach( function( el, i ) {
			classie.remove( el, 'hide-bg' );
			classie.add( el, 'show-bg' );
		} );
	}

	init();
	$(window).load(function() {
		draw();
	});

})();

/*
 * Lean Slider v1.0
 * http://dev7studios.com/lean-slider
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {

    $.fn.leanSlider = function(options) {
    
        // Defaults
        var defaults = {
            pauseTime: 5000,
            pauseOnHover: true,
            startSlide: 0,
            directionNav: '',
            directionNavPrevBuilder: '',
            directionNavNextBuilder: '',
            controlNav: '',
            controlNavBuilder: '',
            prevText: 'Prev',
            nextText: 'Next',
            beforeChange: function(){},
            afterChange: function(){},
            afterLoad: function(){}
        };
        
        // Set up plugin vars
        var plugin = this,
            settings = {},
            slider = $(this),
            slides = slider.children(),
            currentSlide = 0,
            timer = 0;
        
        var init = function() {
            // Set up settings
            settings = $.extend({}, defaults, options);
                
            // Add inital classes
            slider.addClass('lean-slider');
            slides.addClass('lean-slider-slide');
            
            currentSlide = settings.startSlide;
            if(settings.startSlide < 0 || settings.startSlide >= slides.length) currentSlide = 0;
            $(slides[currentSlide]).addClass('current');
            
            // Set up directionNav
            if(settings.directionNav && $(settings.directionNav).length){
                var prevNav = $('<a href="#" class="lean-slider-prev">'+ settings.prevText +'</a>'),
                    nextNav = $('<a href="#" class="lean-slider-next">'+ settings.nextText +'</a>');
                if(settings.directionNavPrevBuilder) prevNav = $(settings.directionNavPrevBuilder.call(this, settings.prevText));
                if(settings.directionNavNextBuilder) nextNav = $(settings.directionNavNextBuilder.call(this, settings.nextText));
                    
                prevNav.on('click', function(e){
                    e.preventDefault();
                    plugin.prev();
                });
                nextNav.on('click', function(e){
                    e.preventDefault();
                    plugin.next();
                });
        
                $(settings.directionNav).append(prevNav);
                $(settings.directionNav).append(nextNav);
            }
            
            // Set up controlNav
            if(settings.controlNav && $(settings.controlNav).length){
                slides.each(function(i){
                    var controlNav = $('<a href="#" class="lean-slider-control-nav">'+ (i + 1) +'</a>');
                    if(settings.controlNavBuilder) controlNav = $(settings.controlNavBuilder.call(this, i, $(slides[i])));
                    
                    controlNav.on('click', function(e){
                        e.preventDefault();
                        plugin.show(i);
                    });
                    
                    $(settings.controlNav).append(controlNav);
                });
            }
            
            // Set up pauseOnHover
            /*if(settings.pauseOnHover && settings.pauseTime && settings.pauseTime > 0){
                slider.hover(
                    function () {
                        clearTimeout(timer);
                    },
                    function () {
                        doTimer();
                    }
                );
            }*/
            
            // Initial processing
            updateControlNav();
            doTimer();
            
            // Trigger the afterLoad callback
            settings.afterLoad.call(this);
            
            return plugin;
        };

        // Process timer
        var doTimer = function(){
            if(settings.pauseTime && settings.pauseTime > 0){
                clearTimeout(timer);
                timer = setTimeout(function(){ plugin.next(); }, settings.pauseTime);
            }
        };
        
        // Update controlNav
        var updateControlNav = function(){
            if(settings.controlNav){
                $('.lean-slider-control-nav', settings.controlNav).removeClass('active');
                $($('.lean-slider-control-nav', settings.controlNav).get(currentSlide)).addClass('active');
            }  
        };
        
        // Prev
        plugin.prev = function(){
            // Trigger the beforeChange callback
            settings.beforeChange.call(this, currentSlide);
        
            currentSlide--;
            if(currentSlide < 0) currentSlide = slides.length - 1;
            slides.removeClass('current');
            $(slides[currentSlide]).addClass('current');
            updateControlNav();
            doTimer();
            
            // Trigger the afterChange callback
            settings.afterChange.call(this, currentSlide);
        };
        
        // Next
        plugin.next = function(){
            // Trigger the beforeChange callback
            settings.beforeChange.call(this, currentSlide);
            
            currentSlide++;
            if(currentSlide >= slides.length) currentSlide = 0;
            slides.removeClass('current');
            $(slides[currentSlide]).addClass('current');
            updateControlNav();
            doTimer();
            
            // Trigger the afterChange callback
            settings.afterChange.call(this, currentSlide);
        };
        
        // Show
        plugin.show = function(index){
            // Trigger the beforeChange callback
            settings.beforeChange.call(this, currentSlide);
            
            currentSlide = index;
            if(currentSlide < 0) currentSlide = slides.length - 1;
            if(currentSlide >= slides.length) currentSlide = 0;
            slides.removeClass('current');
            $(slides[currentSlide]).addClass('current');
            updateControlNav();
            doTimer();
            
            // Trigger the afterChange callback
            settings.afterChange.call(this, currentSlide);
        };
        
        // Call constructor
        return init();
    };
    
})(jQuery);