$('#container').css('opacity', 0);

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
$('#container').css('opacity', 1);

$(window).resize(function() {
    adjust();
});