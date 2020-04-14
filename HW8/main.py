# Guardian Key: 8126d847-7110-45e4-a2fe-52649e661988
# NYTimes Key: PzTs2D8kgMtEJuVIvbJbEfoymayJoGlZ
from nytimesarticle import articleAPI
from topstories import TopStoriesAPI
from flask import Flask, current_app, request, jsonify

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
	category = request.args['category']
	home_articles = nytimes_top_api.get_stories(category)
	return jsonify(home_articles)


@app.route('/nytimes_search')
def get_nytimes_search():
	q = request.args['q']
	search_result = nytimes_search_api.search(q=q)
	return search_result


if __name__ == '__main__':
	app.run()
