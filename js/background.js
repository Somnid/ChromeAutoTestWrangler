chrome.app.runtime.onLaunched.addListener(function() {
	var win = chrome.app.window.create('html/main.html', {
		width: 200,
		height: 200
	});
});