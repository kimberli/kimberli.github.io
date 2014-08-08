function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    	//$('#visual').width($(window).width()-416);
    }

 	var divH = $('#content-box').innerHeight()/2;
	var pageH = $('#content').innerHeight()/2;
	$('#content-box').css({top: Math.round(pageH-divH)});
}

adjust();

$(window).resize(function() {
    adjust();
});

$(window).keypress(function(e) {
  if (e.keyCode == 0) {
    console.log('Space pressed');
  }
});