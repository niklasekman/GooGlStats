window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button").onclick = function() {
        chrome.extension.sendMessage({
            type: "show-goo-gl-stats",
            data: {
            	visible: true
        	}
        });
    }
}, true);