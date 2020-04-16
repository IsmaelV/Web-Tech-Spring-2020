function change_news(){
    var old_source = document.getElementById("news_source").innerHTML;
    if (old_source == "New York Times"){
        document.getElementById("news_source").innerHTML = "The Guardian";
    }
    else{
        document.getElementById("news_source").innerHTML = "New York Times";
    }
}

function get_top_headlines(category){
    var current_src = document.getElementById("news_source").innerHTML;
    if (current_src == "New York Times"){
        get_nyt_top_headlines(category);
    }
    else{
        get_guardian_top_headlines(category);
    }
}

function get_search_headlines(){
    var current_src = document.getElementById("news_source").innerHTML;
    if (current_src == "New York Times"){
        get_nyt_search_headlines();
    }
    else{
        get_guardian_search_headlines();
    }
}

function get_nyt_top_headlines(category){
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

function get_nyt_search_headlines(){
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

function get_guardian_search_headlines(){
    var search = document.getElementById("search").value
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/guardian_search?q=' + search, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				get_top_stories(JSON.parse(xmlreq.responseText));
			}
		}
	}
	xmlreq.send();
}

function get_guardian_top_headlines(category){
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/guardian_articles?category=' + category, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				get_top_stories(JSON.parse(xmlreq.responseText));
			}
		}
	}
	xmlreq.send();
}