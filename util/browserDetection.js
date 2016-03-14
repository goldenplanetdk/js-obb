/**
 * Add classes to `<html>` for detected browser and `js` execution state
 */
(function() {

	var $html = $('html');

	// Add JavaScript execution state class
	$html
		.removeClass('no-js')
		.addClass('js')
	;

	// IE
	var userAgent = navigator.userAgent.toString().toLowerCase();

	var match = /(trident)(?:.*rv:([\w.]+))/.exec(userAgent)
				|| /(msie) ([\w.]+)/.exec(userAgent)
				|| ['', null, -1];

	var ieVersion = match[2];

	if (ieVersion != -1) {
		$('html').addClass('ie ie' + parseInt(ieVersion));
	}

	// Android
	if (userAgent.indexOf('mozilla/5.0') > -1
		&& userAgent.indexOf('android') > -1
		&& userAgent.indexOf('applewebkit') > -1
	) {
		$html.addClass('android');

		if (userAgent.indexOf('chrome') == -1) {
			$html.addClass('android-stock');
		}
	}
})();
