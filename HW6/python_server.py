from flask import Flask
from newsapi import NewsApiClient

newsApi = NewsApiClient(api_key='31527b1a768c43eab04c23920fc6627b')

top_headlines = newsApi.get_top_headlines(sources='cnn,fox-news')
everything_headlines = newsApi.get_everything(q='corona virus')

sources = newsApi.get_sources()

app = Flask(__name__)


@app.route('/')
def get_index():
	return app.send_static_file('index.html')


@app.route('/everything')
def get_everything():
	return everything_headlines


@app.route('/top_headlines')
def get_top_headlines():
	return top_headlines


if __name__ == '__main__':
	app.run()
