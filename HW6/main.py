from flask import Flask, current_app
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


@app.route('/top_headlines')
def get_top_headlines():
	try:
		top_headlines = newsApi.get_top_headlines(sources='cnn,fox-news')
	except Exception as e:
		return "Error in server", e

	stop_words = []
	with current_app.open_resource('./misc/stopwords_en.txt') as f:
		for word in f:
			stop_words.append(word.rstrip().decode('utf-8'))
	articles = top_headlines['articles']
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
