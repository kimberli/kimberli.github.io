function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
        $('.border-path').attr('d','M0 0 L' + $('#content').outerWidth(true) + ' 0 Z');
        if( $(this).width() <= 728 ) {
        	$('.img-path').attr('d','M4,55a52,52 0 1,0 104,0a52,52 0 1,0 -104,0');
        }
        else {
        	$('.img-path').attr('d','M5,85a77,77 0 1,0 154,0a77,77 0 1,0 -154,0');
        }
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    	$('.border-path').attr('d','M0 0 L0 ' + $('#content').outerHeight(true) + ' Z');
    }

 	var divHeight = $('#content-box').outerHeight(true)/2;
	var boxHeight = $('#content').outerHeight(true)/2;
	$('#content-box').css({top: Math.round(boxHeight-divHeight)});
}

adjust();

$(window).load(function() {
	$('#container').css('opacity', 1);
});

$(window).resize(function() {
    adjust();
});