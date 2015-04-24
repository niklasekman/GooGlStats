
function foreachLinkToGooGl(fn,$root) {
	if (!$root) $root = $(document);
	var iframes = $root.find('iframe,frame');
	iframes.each(function() {
		fn($root);
		foreachLinkToGooGl(fn, $(this).contents());
	});
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {

		var requests = [];

		setInterval(function() {
		    if(requests.length > 0) {
		        var request = requests.pop();
		        if(typeof request === "function") {
		            request();
		        }
		    }
		}, 1100);

		switch(message.type) {
			case "show-goo-gl-stats":
				
				foreachLinkToGooGl(function(el) {

					el.find("a").each(function() {
						var url = this.href
						var self = this;
						if (url.indexOf("goo.gl") > -1 && url.length < 22) {

							requests.push(function() {
								$.getJSON(
									"https://www.googleapis.com/urlshortener/v1/url?shortUrl="
									+ url
									+ "&projection=FULL&key=AIzaSyBIObSKV0gescBqhMWjIfc6cNmBsLLjQ7w",
									function(data) {
										var clicks = data.analytics.allTime.shortUrlClicks;
										self.innerText += " ("+clicks+")";
								}).fail(function( jqxhr, textStatus, error ) {
    								var err = textStatus + ", " + error;
    								console.log( "Request Failed: " + err );
								});
								
							});
							
						}	
			
					});
					
				});
				
			break;
	}
});