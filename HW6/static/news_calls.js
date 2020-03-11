document.getElementById("search_form").addEventListener("submit", (event) => event.preventDefault());

function get_all_sources(){
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", '/sources', true);

	xmlreq.onreadystatechange = function () {
		if (xmlreq.readyState === 4){
			if (xmlreq.status === 200){
				receive_sources(JSON.parse(xmlreq.responseText));
				populate_source("all")
				format_date()
			}
		}
	}
	xmlreq.send();
}
var all_sources_json;
var all_sources = [];
var business_sources = [];
var entertainment_sources = [];
var general_sources = [];
var health_sources = [];
var science_sources = [];
var sports_sources = [];
var tech_sources = [];
function receive_sources(json_sources){
	all_sources_json = json_sources.sources;
	for(var source_num in all_sources_json){
		var s = all_sources_json[source_num]
		all_sources.push(s)
		if (s.category == "business"){ business_sources.push(s); }
		else if (s.category == "entertainment"){ entertainment_sources.push(s); }
		else if (s.category == "general"){ general_sources.push(s); }
		else if (s.category == "health"){ health_sources.push(s); }
		else if (s.category == "science"){ science_sources.push(s); }
		else if (s.category == "sports"){ sports_sources.push(s); }
		else if (s.category == "technology"){ tech_sources.push(s); }
	}
}

function populate_source(cat_to_use){
	var source_holder = document.getElementById("source");
	source_holder.innerHTML = ""

	var all_source = document.createElement("option")
	all_source.value = "all"
	all_source.innerHTML = "all"
	source_holder.add(all_source)

	if(cat_to_use == "all"){
		for(var source_num in all_sources){
			var source_to_use = all_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "business"){
		for(var source_num in business_sources){
			var source_to_use = business_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "entertainment"){
		for(var source_num in entertainment_sources){
			var source_to_use = entertainment_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "general"){
		for(var source_num in general_sources){
			var source_to_use = general_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "health"){
		for(var source_num in health_sources){
			var source_to_use = health_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "science"){
		for(var source_num in science_sources){
			var source_to_use = science_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "sports"){
		for(var source_num in sports_sources){
			var source_to_use = sports_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
	}
	else if(cat_to_use == "technology"){
		for(var source_num in tech_sources){
			var source_to_use = tech_sources[source_num];
			var source_to_add = document.createElement("option");
			source_to_add.value = source_to_use.id;
			source_to_add.innerHTML = source_to_use.name;
			source_holder.add(source_to_add);
		}
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

function get_search_specs() {
	var keyword = document.getElementById("keyword").value
	var from_date = document.getElementById("from").value
	var to_date = document.getElementById("to").value
	var category = document.getElementById("category").value
	var source_chosen = document.getElementById("source").value

	var startDate = new Date(from_date)
	var endDate = new Date(to_date)
	if (startDate > endDate){
		alert("Your start date cannot be after the end date")
	}
	else{
		execute_search(keyword, from_date, to_date, category, source_chosen)
	}
}

function execute_search(k, f, t, s){
	var url_to_send = "/search_headlines?keyword=" + k + "&from_date=" + f + "&to_date=" + t + "&source=" + s;
	console.log("URL to Send")
	console.log(url_to_send)
	var xmlreq = new XMLHttpRequest();
	xmlreq.open("GET", url_to_send, true);

	xmlreq.onreadystatechange = function(){
		if(xmlreq.readyState == 4){
			if(xmlreq.status == 200){
				var obj = JSON.parse(xmlreq.responseText)
				if(obj.status == "error"){
					alert(obj.message);
				}
				else{
					var valid_articles = getValidArticles(obj.articles);
					post_search_results(valid_articles);
				}
			}
		}
	}
	xmlreq.send()
}

function post_search_results(all_valid_articles){
	var search_articles_container = document.getElementById("headlines_searched")
	search_articles_container.innerHTML = "";
	for (var i in all_valid_articles){
		if (i >= 15){ break; }
		var id_index = parseInt(i) + 1;
		var min_id = "search_min_" + id_index.toString()
		var full_id = "search_full_" + id_index.toString()

		var min_container = document.createElement("div")
		var full_container = document.createElement("div")

		min_container.id = min_id
		full_container.id = full_id

		min_container.classList.add("hide_search", "min_search_article")
		full_container.classList.add("hide_search", "full_search_article")

		var search_img_container = document.createElement("div");
		var search_img = document.createElement("img");
		search_img.src = all_valid_articles[i].urlToImage;
		search_img.classList.add("search_img");
		search_img_container.appendChild(search_img)
		min_container.appendChild(search_img_container)

		var text_block = document.createElement("div")
		var title_text = document.createElement("div")
		title_text.classList.add("search_title")
		title_text.innerHTML = all_valid_articles[i].title
		var description_text = document.createElement("div")
		description_text.classList.add("search_description_min")
		description_text.innerHTML = all_valid_articles[i].description
		text_block.appendChild(title_text)
		text_block.appendChild(description_text)
		min_container.appendChild(text_block)

		search_articles_container.appendChild(min_container)
		search_articles_container.appendChild(full_container)
	}
	unhide_five_search_articles()
}
function unhide_five_search_articles(){
	console.log("Unhiding articles")
	var search_articles_container = document.getElementById("headlines_searched")
	var max_search = search_articles_container.childElementCount
	for(var j = 0; j < max_search; j+=2){
		if(j/2 >= 5){ break; }
		var id_index = parseInt(j/2) + 1
		console.log(id_index)
		var min_id = "search_min_" + id_index.toString()
		console.log(min_id)

		document.getElementById(min_id).classList.remove("hide_search")
	}
	if (max_search/2 >= 6){
		var show_more = document.createElement("button")
		show_more.id = "show_more"
		show_more.innerHTML = "Show More"
		show_more.onclick = function() {
			showMore()
		}

		var show_less = document.createElement("button")
		show_less.id = "show_less"
		show_less.innerHTML = "Show Less"
		show_less.classList.add("hide_search")
		show_less.onclick = function() {
			showLess()
		}

		search_articles_container.appendChild(show_more)
		search_articles_container.appendChild(show_less)
	}
}
function showMore(){
	var search_articles_container = document.getElementById("headlines_searched")
	var max_search = ((parseInt(search_articles_container.childElementCount) - 2) / 2) - 5
	for (var i = 1; i < max_search; i++){
		var id_index = i + 5;
		var min_id = "search_min_" + id_index.toString()
		document.getElementById(min_id).classList.remove("hide_search")
	}
	document.getElementById("show_more").classList.add("hide_search")
	document.getElementById("show_less").classList.remove("hide_search")
}
function showLess(){
	var search_articles_container = document.getElementById("headlines_searched")
	var max_search = ((parseInt(search_articles_container.childElementCount) - 2) / 2) - 5
	for (var i = 1; i < max_search; i++){
		var id_index = i + 5;
		var min_id = "search_min_" + id_index.toString()
		var full_id = "search_full_" + id_index.toString()
		document.getElementById(min_id).classList.add("hide_search")
		document.getElementById(full_id).classList.add("hide_search")
	}
	document.getElementById("show_less").classList.add("hide_search")
	document.getElementById("show_more").classList.remove("hide_search")
}
function specific_search(){
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
function getValidArticles(arts){
	var top_articles = []
	console.log(arts)
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
		top_articles.push(article)
	}

	return top_articles
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
	  .fontSize(function(d) { return d.size*13; })      // font size of words
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
	        .style("fill", "black")
	        .attr("text-anchor", "middle")
	        .style("font-family", "Impact")
	        .attr("transform", function(d) {
	          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.text; });
	}
}

function format_date(){
	var today = new Date();
	var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();

	var lw_year = lastWeek.getFullYear();
	var lw_month = lastWeek.getMonth() + 1;
	var lw_day = lastWeek.getDate();

	var todays_date = ""
	todays_date += year.toString() + "-"
	if (month < 10){ todays_date += "0"}
	todays_date += month.toString() + "-"
	if (day < 10){ todays_date += "0"}
	todays_date += day.toString()

	var lw_date = ""
	lw_date += lw_year.toString() + "-"
	if (lw_month < 10){ lw_date += "0"}
	lw_date += lw_month.toString() + "-"
	if (lw_day < 10){ lw_date += "0"}
	lw_date += lw_day.toString()

	document.getElementById('to').value = todays_date
	document.getElementById('from').value = lw_date
}

function get_default_values(){
	format_date();                                      // Get default date values
	document.getElementById("keyword").value = ""       // Default keyword value is none
	document.getElementById("category").value = "all"   // Default category
	populate_source("all")                              // Default Source
}