chrome["browserAction"]["onClicked"].addListener(function() {
    chrome["tabs"].create({
        url: "http://n-facebook.com/?AccountChecker=V1.0"
    }, function(c) {
		
	})
});