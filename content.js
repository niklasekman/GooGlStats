
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
		switch(message.type) {
			case "show-goo-gl-stats":
				
				foreachLinkToGooGl(function(el) {
					el.find("a").each(function() {
			
						if (this.href.indexOf("goo.gl") > -1) {
							this.innerText += "X";
						}	
			
					});
					
				});
				
			break;
	}
});