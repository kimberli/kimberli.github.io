$(document).ready(function() {
	$(document.body).hide();
});

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
	
	$(document.body).show();
}

adjust();

$(window).resize(function() {
    adjust();
});