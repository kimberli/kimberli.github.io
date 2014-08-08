function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
        $('.border-path').attr('d','M0 0 L' + $('#content').innerWidth() + ' 0 Z');
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    	$('.border-path').attr('d','M0 0 L0 ' + $('#content').innerHeight() + ' Z');
    }

 	var divHeight = $('#content-box').innerHeight()/2;
	var boxHeight = $('#content').innerHeight()/2;
	$('#content-box').css({top: Math.round(boxHeight-divHeight)});
}

adjust();

$(window).load(function() {
	$('#container').css('opacity', 1);
});

$(window).resize(function() {
    adjust();
});