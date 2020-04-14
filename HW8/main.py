# Guardian Key: 8126d847-7110-45e4-a2fe-52649e661988
# NYTimes Key: PzTs2D8kgMtEJuVIvbJbEfoymayJoGlZ
from nytimesarticle import articleAPI
from topstories import TopStoriesAPI
from flask import Flask, current_app, jsonify
from flask import request as flask_request
import requests

nytimes_key = "PzTs2D8kgMtEJuVIvbJbEfoymayJoGlZ"
guardian_key = "8126d847-7110-45e4-a2fe-52649e661988"

nytimes_search_api = articleAPI(nytimes_key)
nytimes_top_api = TopStoriesAPI(nytimes_key)

app = Flask(__name__)


@app.route('/')
def get_index():
	return app.send_static_file('index.html')


@app.route('/nytimes_articles')
def get_nytimes_articles():
	category = flask_request.args['category']
	home_articles = nytimes_top_api.get_stories(category)
	return jsonify(home_articles)


@app.route('/nytimes_search')
def get_nytimes_search():
	q = flask_request.args['q']
	search_result = nytimes_search_api.search(q=q)
	return search_result


@app.route('/guardian_articles')
def get_guardian_articles():
	section = flask_request.args['category']
	if section == "sports":
		section = "sport"
	elif section == "home":
		section = ""
	search_url = "http://content.guardianapis.com/" + section
	payload = {
		'api-key': guardian_key,
		'page-size': 10,
		'show-editors-picks': 'false',
		'show-elements': 'image',
		'show-fields': 'all'
	}
	response = requests.get(search_url, payload)
	return response.json()


@app.route('/guardian_search')
def get_guardian_search():
	q = flask_request.args['q']
	search_url = "http://content.guardianapis.com/search?q=" + q
	payload = {
		'api-key': guardian_key,
		'page-size': 10,
		'show-editors-picks': 'false',
		'show-elements': 'image',
		'show-fields': 'all'
	}
	response = requests.get(search_url, payload)
	return response.json()


if __name__ == '__main__':
	app.run()
