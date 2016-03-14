// Extend Modernizr
if (typeof Modernizr != 'undefined') {

	Modernizr.addTest('firefox', function() {

		return !!navigator.userAgent.match(/firefox/i);
	});
}
