window.onload = function() {
	get_top_headlines('http://127.0.0.1:5000/top_headlines')
}

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
	write_word_cloud(top_headlines)
	var articles = top_headlines.articles
	console.log(articles)
	var all_articles = get_source_articles(articles)
	console.log(all_articles)
	var cnn_articles = all_articles[0]
	var fox_articles = all_articles[1]

	var entire_container = document.createElement("div");
	entire_container.appendChild(create_articles_containers(cnn_articles, "CNN"))
	entire_container.appendChild(create_articles_containers(fox_articles, "Fox News"))
	document.getElementById('all_news').appendChild(entire_container);
}

function create_articles_containers(articles, name){
	// Create container that will hold everything to do with a source
	var whole_container = document.createElement("div");

	// Create Header that has the source written at the top
	var heading = document.createElement("div");
	heading.classList.add("header")
	heading.innerHTML = name
	whole_container.appendChild(heading)
	whole_container.appendChild(document.createElement("hr"))

	// Begin iterating through all articles (at most 5)
	var articles_container = document.createElement("div");
	articles_container.classList.add("articles_container");
	for(var i = 0; i < articles.length; i++){
		if (articles_container.childElementCount === 4){
			break;
		}
		var single_article = document.createElement("div");
		single_article.classList.add("single_article")

		var article = articles[i]

		// Add image to cell
		var img = document.createElement("img")
		img.src = article.urlToImage
		img.classList.add("article_img")
		single_article.appendChild(img)

		// Add title to cell
		var title = document.createElement("div")
		title.innerHTML = article.title
		title.classList.add("article_title")
		single_article.appendChild(title)

		single_article.appendChild(document.createElement("br"))

		// Add description to cell
		var description = document.createElement("div")
		description.innerHTML = article.description
		description.classList.add("article_description")
		single_article.appendChild(description)

		single_article.onclick = function() {
			window.open(article.url, "_blank")
		};

		// Add cell to container
		articles_container.appendChild(single_article);
	}
	whole_container.appendChild(articles_container);
	return whole_container
}

function get_source_articles(arts){
	var cnn_arts = []
	var fox_articles = []
	var top_articles = []
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
		if(author === null || description === null || title === null || art_url === null || url_img === null
		 || published_at === null || source.id === null || source.name === null || description == ""){
			continue
		}

		if(source.id == "cnn"){
			cnn_arts.push(article)
		}
		else if (source.id == "fox-news"){
			fox_articles.push(article)
		}
		top_articles.push(article)
	}

	return [cnn_arts, fox_articles]
}

function write_word_cloud(top_headlines) {

	myWords = top_headlines.top_words

	// set the dimensions and margins of the graph
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
	    width = 350 - margin.left - margin.right,
	    height = 350 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#word_cloud").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

	// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
	// Wordcloud features that are different from one word to the other must be here
	var layout = d3.layout.cloud()
	  .size([width, height])
	  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
	  .padding(5)        //space between words
	  .rotate(function() { return ~~(Math.random() * 2) * 90; })
	  .fontSize(function(d) { return d.size*10; })      // font size of words
	  .on("end", draw);
	layout.start();

	// This function takes the output of 'layout' above and draw the words
	// Wordcloud features that are THE SAME from one word to the other can be here
	function draw(words){
	  svg
	    .append("g")
	      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	      .selectAll("text")
	        .data(words)
	      .enter().append("text")
	        .style("font-size", function(d) { return d.size; })
	        .style("fill", "#69b3a2")
	        .attr("text-anchor", "middle")
	        .style("font-family", "Impact")
	        .attr("transform", function(d) {
	          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.text; });
	}
}