function adjust() {
	if( $(this).width() <= 1024 ) {
        $('#content').remove().insertAfter($('#visual'));
    }
    else {
    	$('#visual').remove().insertAfter($('#content'));
    }

 	var divH = $('#content-box').innerHeight()/2;
	var pageH = $('#content').innerHeight()/2;
	$('#content-box').css({top: Math.round(pageH-divH)});
}

adjust();

$(window).resize(function() {
    adjust();
});

$(document).ready(function() {
	$(document.body).hide();
});
$(window).load(function() {
	$(document.body).show();
});