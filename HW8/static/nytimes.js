function get_top_headlines(category){
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/nytimes_articles?category=' + category, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				get_top_stories(JSON.parse(xmlreq.responseText));
			}
		}
	}
	xmlreq.send();
}

function get_top_stories(home_top_stories){
    console.log(home_top_stories)
}

function get_search_headlines(search){
    var search = document.getElementById("search").value
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/nytimes_search?q=' + search, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				get_top_stories(JSON.parse(xmlreq.responseText));
			}
		}
	}
	xmlreq.send();
}