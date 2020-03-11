from flask import Flask, current_app, request
from newsapi import NewsApiClient

newsApi = NewsApiClient(api_key='31527b1a768c43eab04c23920fc6627b')

app = Flask(__name__)


@app.route('/')
def get_index():
	return app.send_static_file('index.html')


@app.route('/sources')
def get_sources():
	sources = newsApi.get_sources(language='en')
	return sources


@app.route('/search_headlines')
def get_search_headlines():
	try:
		q = request.args['keyword']
		source = request.args['source']
		from_date = request.args['from_date']
		to_date = request.args['to_date']
		if source == "all":
			search_headlines = newsApi.get_everything(q=q,
														from_param=from_date,
														to=to_date,
														language='en',
														page_size=30)
		else:
			search_headlines = newsApi.get_everything(q=q,
														sources=source,
														from_param=from_date,
														to=to_date,
														language='en',
														page_size=30)
		return search_headlines
	except Exception as e:
		return e.args[0]


@app.route('/top_headlines')
def get_top_headlines():
	try:
		top_headlines = newsApi.get_top_headlines(sources='cnn,fox-news')
		all_top_headlines = newsApi.get_top_headlines(page_size=30)
	except Exception as e:
		return "Error in server", e

	stop_words = []
	with current_app.open_resource('./misc/stopwords_en.txt') as f:
		for word in f:
			stop_words.append(word.rstrip().decode('utf-8'))
	articles = all_top_headlines['articles']
	title_word_counter = dict()
	for a in articles:
		title = a['title']
		title_words = title.split()
		for word in title_words:
			if word.lower() in stop_words or not word.isalnum():
				continue
			if word in title_word_counter:
				title_word_counter[word] += 1
			else:
				title_word_counter[word] = 1
	top_words = sorted(title_word_counter.items(), key=lambda x: x[1], reverse=True)
	top_words_to_display = [{"word": w[0], "size": w[1]} for w in top_words]

	top_headlines['top_words'] = top_words_to_display[0:30]

	return top_headlines


if __name__ == '__main__':
	app.run()
