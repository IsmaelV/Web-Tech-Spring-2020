var jsonDoc;

function get_top_headlines(url) {
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", url, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				add_news(JSON.parse(xmlreq.responseText))
			}
		}
	}
	xmlreq.send();
}

function add_news(whatever){
	document.getElementById('all_news').innerHTML = whatever.articles;
}