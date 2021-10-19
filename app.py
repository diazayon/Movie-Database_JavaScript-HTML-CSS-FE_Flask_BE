from flask import Flask, render_template, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


#TV genres
tvids_url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'   
tv_tmdbData = requests.get(tvids_url).content
tv_inforequested = json.loads(tv_tmdbData)
tv_filtered_json = [x for x in tv_inforequested['genres']]

tvkeys ={}
for x in range(len(tv_filtered_json)):
    tvkeys[tv_filtered_json[x]['id']]= tv_filtered_json[x]['name']

#Movie genres
movieids_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'
movie_tmdbData = requests.get(movieids_url).content
movie_inforequested = json.loads(movie_tmdbData)
movies_filtered_json = [x for x in movie_inforequested['genres']]

moviekeys ={}
for x in range(len(movies_filtered_json)):
    moviekeys[movies_filtered_json[x]['id']]= movies_filtered_json[x]['name']

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/trending")
def trending():
        trending_url_req = 'https://api.themoviedb.org/3/trending/movie/week?api_key=1afa3745b922ddd45ad407a3f6ae648d'
        tmdbData = requests.get(trending_url_req).content
        inforequested = json.loads(tmdbData)

        title_req = [inforequested['results'][x]['title'] for x in range(5)]
        
        backdrop_path_req = [inforequested['results'][x]['backdrop_path'] for x in range(5)]

        release_date_req = [inforequested['results'][x]['release_date'] for x in range(5)]

        filtered_json = []
        for i in range(5):
            temp_dict = {}
            temp_dict['title'] = title_req[i]
            temp_dict['backdrop_path'] = backdrop_path_req[i]
            temp_dict['release_date'] = release_date_req[i]
            filtered_json.append(temp_dict)

        json_results = json.dumps(filtered_json)
        return json_results

@app.route("/airingtoday")
def airingToday():
        airing_url_req = 'https://api.themoviedb.org/3/tv/airing_today?api_key=1afa3745b922ddd45ad407a3f6ae648d'
        tmdbData = requests.get(airing_url_req).content
        inforequested = json.loads(tmdbData)

        name_req = [inforequested['results'][x]['name'] for x in range(5)]
        
        backdrop_path_req = [inforequested['results'][x]['backdrop_path'] for x in range(5)]

        first_air_date_req = [inforequested['results'][x]['first_air_date'] for x in range(5)]

        filtered_json = []
        for i in range(5):
            temp_dict = {}
            temp_dict['name'] = name_req[i]
            temp_dict['backdrop_path'] = backdrop_path_req[i]
            temp_dict['first_air_date'] = first_air_date_req[i]
            filtered_json.append(temp_dict)

        json_results = json.dumps(filtered_json)
        return json_results

@app.route("/moviequery")
def movieQuery():

        movie_query = request.args.get('query')
        
        template_url = 'https://api.themoviedb.org/3/search/movie?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US&page=1&include_adult=false&query='

        movie_req_url = template_url + movie_query

        tmdbData = requests.get(movie_req_url).content
        
        inforequested = json.loads(tmdbData)

        filtered_json = [x for x in inforequested['results']]
        
        for x in range((len(filtered_json))):
            newkeys =[]
            #call = movieids()
            if len(filtered_json[x]['genre_ids']) > 0:
                for y in range(len(filtered_json[x]['genre_ids'])):
                    z = ' ' + moviekeys.get(filtered_json[x]['genre_ids'][y])
                    newkeys.append(z)
            else:
                newkeys = []
            
            filtered_json[x].pop('genre_ids')
            filtered_json[x]['genre_ids'] = newkeys

            if filtered_json[x]['poster_path'] is None:
                filtered_json[x]['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
            else:
                filtered_json[x]['poster_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json[x]['poster_path']

        final_filtered_json = []

        if len(filtered_json) <= 10:
            for x in range(len(filtered_json)):
                final_filtered_json.append(filtered_json[x])

        if len(filtered_json) > 10:
            for x in range(10):
                final_filtered_json.append(filtered_json[x])

        json_results = json.dumps(final_filtered_json)

        return json_results

@app.route("/tvquery")
def tvQuery():

        tv_query = request.args.get('query')
        
        template_url = 'https://api.themoviedb.org/3/search/tv?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US&page=1&include_adult=false&query='

        tv_url_req = template_url + tv_query

        tmdbData = requests.get(tv_url_req).content
        
        inforequested = json.loads(tmdbData)

        filtered_json = [x for x in inforequested['results']]

        for x in range((len(filtered_json))):
            newkeys =[]
            #call = tvids()
            if len(filtered_json[x]['genre_ids']) > 0:
                for y in range(len(filtered_json[x]['genre_ids'])):
                    z = ' ' + tvkeys.get(filtered_json[x]['genre_ids'][y])
                    newkeys.append(z)
            else:
                newkeys = []
            
            filtered_json[x].pop('genre_ids')
            filtered_json[x]['genre_ids'] = newkeys

            if filtered_json[x]['poster_path'] is None:
                filtered_json[x]['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
            else:
                filtered_json[x]['poster_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json[x]['poster_path']

        final_filtered_json = []

        if len(filtered_json) <= 10:
            for x in range(len(filtered_json)):
                final_filtered_json.append(filtered_json[x])

        if len(filtered_json) > 10:
            for x in range(10):
                final_filtered_json.append(filtered_json[x])

        json_results = json.dumps(final_filtered_json)

        return json_results


@app.route("/multiquery")
def multiQuery():

        multi_query = request.args.get('query')
        
        template_url = 'https://api.themoviedb.org/3/search/multi?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US&page=1&include_adult=false&query='
        
        tv_url_req = template_url + multi_query

        tmdbData = requests.get(tv_url_req).content
        
        inforequested = json.loads(tmdbData)

        filtered_json = [x for x in inforequested['results'] if x['media_type'] == 'movie' or x['media_type'] == 'tv']

        for x in range((len(filtered_json))):
            if filtered_json[x]['media_type'] =='movie':
                newkeys =[]
                #call = moviekeys
                if len(filtered_json[x]['genre_ids']) > 0:
                    for y in range(len(filtered_json[x]['genre_ids'])):
                        z = ' ' + moviekeys.get(filtered_json[x]['genre_ids'][y])
                        newkeys.append(z)
                else:
                    newkeys = []

                filtered_json[x].pop('genre_ids')
                filtered_json[x]['genre_ids'] = newkeys

                if filtered_json[x]['poster_path'] is None:
                    filtered_json[x]['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
                else:
                    filtered_json[x]['poster_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json[x]['poster_path']

            if filtered_json[x]['media_type'] =='tv':
                newkeys =[]
                #call = tvkeys
                if len(filtered_json[x]['genre_ids']) > 0:
                    for y in range(len(filtered_json[x]['genre_ids'])):
                        z = ' ' + tvkeys.get(filtered_json[x]['genre_ids'][y])
                        newkeys.append(z)
                else:
                    newkeys = []

                filtered_json[x].pop('genre_ids')
                filtered_json[x]['genre_ids'] = newkeys

                if filtered_json[x]['poster_path'] is None:
                    filtered_json[x]['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
                else:
                    filtered_json[x]['poster_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json[x]['poster_path']
                
        final_filtered_json = []

        if len(filtered_json) <= 10:
            for x in range(len(filtered_json)):
                final_filtered_json.append(filtered_json[x])

        if len(filtered_json) > 10:
            for x in range(10):
                final_filtered_json.append(filtered_json[x])

        json_results = json.dumps(final_filtered_json)

        return json_results

@app.route("/moviepopup")
def moviepopup():

        movie_details = request.args.get('query')
        
        details_url = 'https://api.themoviedb.org/3/movie/' + movie_details + '?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'
        credits_url = 'https://api.themoviedb.org/3/movie/' + movie_details + '/credits?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'
        reviews_url = 'https://api.themoviedb.org/3/movie/' + movie_details + '/reviews?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US&page=1'

        final_json = {}

        #details
        tmdbDatadetails = requests.get(details_url).content
        inforequesteddetails = json.loads(tmdbDatadetails)
        genresdetails = []
        if len(inforequesteddetails.get('genres')) == 0:
            inforequesteddetails['genres'] = 'N/A'
        else:
            for x in inforequesteddetails.get('genres'):
                y = x.get('name')
                genresdetails.append(y)
            inforequesteddetails['genres'] = genresdetails

        languagesdetails = []
        if len(inforequesteddetails.get('spoken_languages')) == 0:
            inforequesteddetails['spoken_languages'] = 'N/A'
        else:
            for x in inforequesteddetails.get('spoken_languages'):
                if x == '' or x is None:
                    y = 'N/A'
                    languagesdetails.append(y)
                else:
                    y = x.get('english_name')
                    languagesdetails.append(y)
            inforequesteddetails['spoken_languages'] = languagesdetails

        if inforequesteddetails['poster_path'] is None:
            inforequesteddetails['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
        else:
            inforequesteddetails['poster_path'] = 'https://www.themoviedb.org/t/p/w780' + inforequesteddetails['poster_path']

        if inforequesteddetails['backdrop_path'] is None:
            inforequesteddetails['backdrop_path'] = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg'
        else:
            inforequesteddetails['backdrop_path'] = 'https://www.themoviedb.org/t/p/w780' + inforequesteddetails['backdrop_path']

        final_json['details'] = inforequesteddetails

        #credits
        tmdbDatacredits = requests.get(credits_url).content
        inforequestedcredits = json.loads(tmdbDatacredits)
        filtered_json_credits = [x for x in inforequestedcredits['cast']]
        final_filter_credits = []

        if len(filtered_json_credits) >= 8:
            for x in range(8):
                final_filter_credits.append(filtered_json_credits[x])
        else:
            for x in range(len(filtered_json_credits)):
                final_filter_credits.append(filtered_json_credits[x])
        
        for x in range((len(filtered_json_credits))):
            if filtered_json_credits[x]['profile_path'] is None:
                filtered_json_credits[x]['profile_path'] = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png'
            else:
                filtered_json_credits[x]['profile_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json_credits[x]['profile_path']

        final_json['credits'] = final_filter_credits
        

        #reviews
        tmdbDatareviews = requests.get(reviews_url).content
        inforequestedreviews = json.loads(tmdbDatareviews)
        filtered_json_reviews = [x for x in inforequestedreviews['results']]
        final_filter_reviews = []
        
        if len(filtered_json_reviews) >= 5:
            for x in range(5):
                final_filter_reviews.append(filtered_json_reviews[x])
        else:
            for x in range(len(filtered_json_reviews)):
                final_filter_reviews.append(filtered_json_reviews[x])

        final_json['reviews'] = final_filter_reviews

        json_results = json.dumps(final_json)

        return json_results


@app.route("/tvpopup")
def tvpopup():

        movie_details = request.args.get('query')
        
        details_url = 'https://api.themoviedb.org/3/tv/' + movie_details + '?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'
        credits_url = 'https://api.themoviedb.org/3/tv/' + movie_details + '/credits?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US'
        reviews_url = 'https://api.themoviedb.org/3/tv/' + movie_details + '/reviews?api_key=1afa3745b922ddd45ad407a3f6ae648d&language=en-US&page=1'

        final_json = {}
        
        #details
        tmdbDatadetails = requests.get(details_url).content
        inforequesteddetails = json.loads(tmdbDatadetails)
        genresdetails = []
        if len(inforequesteddetails.get('genres')) == 0:
            inforequesteddetails['genres'] = 'N/A'
        else:
            for x in inforequesteddetails.get('genres'):
                y = x.get('name')
                genresdetails.append(y)
            inforequesteddetails['genres'] = genresdetails

        languagesdetails = []
        if len(inforequesteddetails.get('spoken_languages')) == 0:
            inforequesteddetails['spoken_languages'] = 'N/A'
        else:
            for x in inforequesteddetails.get('spoken_languages'):
                y = x.get('english_name')
                languagesdetails.append(y)
            inforequesteddetails['spoken_languages'] = languagesdetails

        if inforequesteddetails['poster_path'] is None:
            inforequesteddetails['poster_path'] = 'https://cinemaone.net/images/movie_placeholder.png'
        else:
            inforequesteddetails['poster_path'] = 'https://www.themoviedb.org/t/p/w780' + inforequesteddetails['poster_path']

        if inforequesteddetails['backdrop_path'] is None:
            inforequesteddetails['backdrop_path'] = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg'
        else:
            inforequesteddetails['backdrop_path'] = 'https://www.themoviedb.org/t/p/w780' + inforequesteddetails['backdrop_path']
        
        final_json['details'] = inforequesteddetails

        #credits
        tmdbDatacredits = requests.get(credits_url).content
        inforequestedcredits = json.loads(tmdbDatacredits)
        filtered_json_credits = [x for x in inforequestedcredits['cast']]
        final_filter_credits = []

        if len(filtered_json_credits) >= 8:
            for x in range(8):
                final_filter_credits.append(filtered_json_credits[x])
        else:
            for x in range(len(filtered_json_credits)):
                final_filter_credits.append(filtered_json_credits[x])

        for x in range((len(filtered_json_credits))):
            if filtered_json_credits[x]['profile_path'] is None:
                filtered_json_credits[x]['profile_path'] = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png'
            else:
                filtered_json_credits[x]['profile_path'] = "https://www.themoviedb.org/t/p/w185" + filtered_json_credits[x]['profile_path']

        final_json['credits'] = final_filter_credits

        #reviews
        tmdbDatareviews = requests.get(reviews_url).content
        inforequestedreviews = json.loads(tmdbDatareviews)
        filtered_json_reviews = [x for x in inforequestedreviews['results']]
        final_filter_reviews = []
        
        if len(filtered_json_reviews) >= 5:
            for x in range(5):
                final_filter_reviews.append(filtered_json_reviews[x])
        else:
            for x in range(len(filtered_json_reviews)):
                final_filter_reviews.append(filtered_json_reviews[x])

        final_json['reviews'] = final_filter_reviews
        
        json_results = json.dumps(final_json)

        return json_results


if __name__ == "__main__":
    app.run(debug=True)

