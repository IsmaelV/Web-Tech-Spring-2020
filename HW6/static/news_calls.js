document.getElementById("search_form").addEventListener("submit", (event) => event.preventDefault());

function get_all_sources(){
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/sources', true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				receive_sources(JSON.parse(xmlreq.responseText));
			}
		}
	}
	xmlreq.send();
}
var all_sources;
var business_sources = [];
var entertainment_sources = [];
var general_sources = [];
var health_sources = [];
var science_sources = [];
var sports_sources = [];
var tech_sources = [];
function receive_sources(json_sources){
	all_sources = json_sources.sources;
	console.log("all_sources:")
	console.log(all_sources)
	for(var source_num in all_sources){
		var s = all_sources[source_num]
		if (s.category == "business"){ business_sources.push(s); }
		else if (s.category == "entertainment"){ entertainment_sources.push(s); }
		else if (s.category == "general"){ general_sources.push(s); }
		else if (s.category == "health"){ health_sources.push(s); }
		else if (s.category == "science"){ science_sources.push(s); }
		else if (s.category == "sports"){ sports_sources.push(s); }
		else if (s.category == "technology"){ tech_sources.push(s); }
	}
}

window.onload = function() {
	get_all_sources()
	get_top_headlines('/top_headlines')
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

function get_search_headlines(content_sent) {
	keyword = document.getElementById("keyword").value
	from_date = document.getElementById("from").value
	to_date = document.getElementById("to").value
	category = document.getElementById("category").value
	sources_chosen = document.getElementById("source").value

//	var xmlreq = new XMLHttpRequest();
//	xmlreq.open("POST", url, true);
//
//	xmlreq.onreadystatechange = function () {
//		if (xmlreq.readyState === 4){
//			if (xmlreq.status === 200){
//				specific_search(JSON.parse(xmlreq.responseText))
//			}
//		}
//	}
//	xmlreq.send(content_sent);
}

function specific_search(top_search){
	document.getElementById("top_news_headlines").innerHTML = "";  // Delete everything
	document.getElementById("search_headlines").classList.remove("hide_content")
	document.getElementById("Search").classList.remove("active_button", "inactive_button")
	document.getElementById("Google_News").classList.remove("active_button", "inactive_button")

	document.getElementById("Search").classList.add("active_button")
	document.getElementById("Google_News").classList.add("inactive_button")
}

function add_top_headline_news(top_headlines){
	document.getElementById("top_news_headlines").innerHTML = "";  // Delete everything
	document.getElementById("search_headlines").classList.add("hide_content")
	document.getElementById("Google_News").classList.remove("active_button", "inactive_button")
	document.getElementById("Search").classList.remove("active_button", "inactive_button")

	document.getElementById("Google_News").classList.add("active_button")
	document.getElementById("Search").classList.add("inactive_button")

	var top = document.createElement("div")
	top.id = "top"
	var carousel = document.createElement("div")
	carousel.id = "carousel"
	var word_cloud = document.createElement("div")
	word_cloud.id = "word_cloud"

	top.appendChild(carousel)
	top.appendChild(word_cloud)
	document.getElementById("top_news_headlines").appendChild(top)

	var all_news = document.createElement("div")
	all_news.id = "all_news"
	document.getElementById("top_news_headlines").appendChild(all_news)

	document.getElementById("all_news").innerHTML = "";

	var articles = top_headlines.articles
	var all_articles = get_source_articles(articles)
	var cnn_articles = all_articles[0]
	var fox_articles = all_articles[1]
	var top_articles_top_headlines = all_articles[2]

	create_carousel(top_articles_top_headlines)
	write_word_cloud(top_headlines)

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
	var url_dictionary = {}
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
		description.classList.add("center_content")
		single_article.appendChild(description)

		// Set URL to set onto article later
		url_dictionary[i] = article.url

		// Add cell to container
		articles_container.appendChild(single_article);
	}

	// Set up onclick events for each article
	articles_container.childNodes[0].onclick = function() {
		window.open(url_dictionary[0], "_blank");
	}
	articles_container.childNodes[1].onclick = function() {
		window.open(url_dictionary[1], "_blank");
	}
	articles_container.childNodes[2].onclick = function() {
		window.open(url_dictionary[2], "_blank");
	}
	articles_container.childNodes[3].onclick = function() {
		window.open(url_dictionary[3], "_blank");
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

	return [cnn_arts, fox_articles, top_articles]
}

// Automatically show the slideshow/carousel
var slideIndex = -1;
function autoShowSlides() {
	var slides = document.getElementsByClassName("carousel_slide");
	for (var i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	slideIndex++;
	if(slideIndex >= slides.length) {slideIndex = 0}
	slides[slideIndex].style.display = "block";
	setTimeout(autoShowSlides, 4000); // Changes image every 4 seconds
}
function create_carousel(arts){
	var my_urls = {}
	for(var k = 0; k < 5; k++){
		car_art = arts[k];
		var car_article = document.createElement("div");
		car_article.classList.add("carousel_slide")
		car_article.classList.add("fade")

		var car_img = document.createElement("img")
		car_img.src = car_art.urlToImage
		car_img.classList.add("carousel_img")

		var text_block = document.createElement("div")
		var line_break = document.createElement("br")
		var title_text = document.createElement("div")
		title_text.innerHTML = car_art.title
		title_text.classList.add("title_text_block")
		text_block.appendChild(title_text)
		text_block.appendChild(line_break)
		var description_text = document.createElement("div")
		description_text.innerHTML = car_art.description
		description_text.classList.add("description_text_block")
		text_block.appendChild(description_text)
		text_block.classList.add("text-block")

		my_urls[k] = car_art.url;

		car_article.appendChild(car_img)
		car_article.appendChild(text_block)
		document.getElementById("carousel").appendChild(car_article)
	}

	// Add links to appropriate cards
	var carousel_container = document.getElementById("carousel")
	carousel_container.childNodes[0].onclick = function() {
		window.open(my_urls[0], "_blank");
	}
	carousel_container.childNodes[1].onclick = function() {
		window.open(my_urls[1], "_blank");
	}
	carousel_container.childNodes[2].onclick = function() {
		window.open(my_urls[2], "_blank");
	}
	carousel_container.childNodes[3].onclick = function() {
		window.open(my_urls[3], "_blank");
	}
	carousel_container.childNodes[4].onclick = function() {
		window.open(my_urls[4], "_blank");
	}

	autoShowSlides();
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
	        .style("font-size", function(d) { return d.size + "px"; })
	        .style("fill", "#69b3a2")
	        .attr("text-anchor", "middle")
	        .style("font-family", "Impact")
	        .attr("transform", function(d) {
	          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.text; });
	}
}