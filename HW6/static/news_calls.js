var jsonDoc;

function get_top_headlines(url) {
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", url, true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				add_top_headline_news(JSON.parse(xmlreq.responseText))
			}
		}
	}
	xmlreq.send();
}

function add_top_headline_news(top_headlines){
	document.getElementById("all_news").innerHTML = "";
	var articles = top_headlines.articles
	console.log(articles)
	var all_articles = get_source_articles(articles)
	console.log(all_articles)
	var cnn_articles = all_articles[0]
	var fox_articles = all_articles[1]

	var entire_holder = document.createElement("div");
	cnn_divs = create_cnn(cnn_articles)
	entire_holder.appendChild(cnn_divs)
	document.getElementById('all_news').appendChild(entire_holder);
}

function create_cnn(articles){
	var whole_holder = document.createElement("div");
	var heading = document.createElement("div");
	heading.innerHTML = "CNN"
	whole_holder.appendChild(heading)

	return whole_holder
}

function get_source_articles(arts){
	var cnn_arts = []
	var fox_articles = []
	for (var art_num in arts){
		var article = arts[art_num]

		// Begin Error Checking
		var author = article.author
		var description = article.description
		var title = article.title
		var art_url = article.url
		var url_img = article.urlToImage
		var published_at = article.publishedAt
		var source = article.source
		if(author === null | description === null | title === null | art_url === null | url_img === null
		 | published_at === null | source.id === null | source.name === null){
			continue
		}

		if(source.id == "cnn"){
			cnn_arts.push(article)
		}
		else if (source.id == "fox-news"){
			fox_articles.push(article)
		}
	}

	return [cnn_arts, fox_articles]
}