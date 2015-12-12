$j(document).ready(function() {


	// contact form button
	$j('#contactButton').click(function () {
		//$j('#popForm')[0].reset();
		//$j('#contactForm').show();
		$j("#contactModal").modal('show'); //Show the modal
	});


	/* Share link click
	======================================================*/
	$j('#social-share a').click(function( event ) {
		
		event.preventDefault();
		var url2 = '';
		var url = window.location.href;
		var title = $j('.product-name h1').text();
		var desc  = $j('meta[name=description]').attr("content");
		var cute_title = 'Checkout ' + title + ' at thevirginhairfantasy.com';
		var media = $j(this).data('image');
		
		var acct = 'thevirginhair';
		var hash = 'virginhairfantasy';	
				
		var win = $j(this).data('channel');

		switch(win)
		{
			case 'twitter':
				url2 = buildTweetUrl(url, cute_title, acct, hash);
				break;
			case 'pinterest':
				url2 = buildPinUrl(url, media, cute_title);
				break;
			case 'google':
				url2 = buildGoogleUrl(url);
				break;
			case 'facebook':
				url2 = buildFbUrl(url, media, cute_title, desc);
				break;
			case 'email':
				// always need to get this url, post url of the form
				var url2 = $j(this).attr('href');
				break;
			default:
		}
		popWindow(url2, win, '620', '430');
	});

});

/* Utility functions
======================================================*/

function popWindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2)-50;
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,, width='+w+', height='+h+', top='+top+', left='+left);
}

function popup(url) {
    newwindow=window.open(url, 'name', 'height=500,width=600,resizable=yes,scrollbars=yes');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}
function contactLoading(prefix){
	var loading = prefix + 'Loading';
	var cover = prefix + 'Cover';
	Element.appear(loading);
	Element.show(cover);
}
function contactSuccess(response, prefix, formId){

	var loading = prefix + 'Loading';
	var cover = prefix + 'Cover';
	var success = prefix + 'Success';

	if (200 == response.status && response.responseText == "true"){
		Element.hide(loading);
		Element.appear(success);
		var form = document.getElementById(formId);
		form.reset();
		Element.hide(cover);
		setTimeout(function(){Element.fade(success)}, 4000);
    }else{
    	contactFailure(response,prefix);
    }
}
function contactFailure(response, prefix){

	var loading = prefix + 'Loading';
	var cover = prefix + 'Cover';
	var error = prefix + 'Error';

	Element.hide(loading);
	Element.show(error); 
	Element.hide(cover);
	setTimeout(function(){Element.fade(error)}, 4000);
}

/* Share Functions - used on product detail and wishlist list
======================================================*/

function buildPinUrl(url, media, desc) {
    return '//pinterest.com/pin/create/button/?'+
        	'url='+encodeURIComponent(url)+
            '&media='+encodeURIComponent(media)+
            '&description='+encodeURIComponent(desc);
}

function buildTweetUrl(url, desc, acct, hash){
    return 'http://twitter.com/intent/tweet?'+
        	'via='+ acct +
            '&hashtags='+ hash +
            '&text='+encodeURIComponent(desc) +
            '&url=' +encodeURIComponent(url);
}

function buildTumblrUrl(url, title, desc1, desc2){
	var desc = desc1 + ' ' + desc2;
	return 'http://www.tumblr.com/share/link?'+
			'url='+encodeURIComponent(url)+
			'&name='+encodeURIComponent(title)+
			'&description='+encodeURIComponent(desc);
}

function buildGoogleUrl(url){
	return 'https://plus.google.com/share?url='+encodeURIComponent(url);
}

function buildFbUrl(url, media, title, desc){
	//return 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(url);

	return 'http://www.facebook.com/sharer.php?s=100' +
	'&p[url]=' + url +
	'&p[images][0]=' + media +
	'&p[title]=' + title +
	'&p[summary]=' + desc;
}


