$('#container').css('opacity', 0);
$(window).load(function() {
  $('#container').css('opacity', 1);
});

function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    }

 	var divHeight = $('#content-box').innerHeight()/2;
	var boxHeight = $('#content').innerHeight()/2;
	$('#content-box').css({top: Math.round(boxHeight-divHeight)});
}

adjust();

$(window).resize(function() {
    adjust();
});