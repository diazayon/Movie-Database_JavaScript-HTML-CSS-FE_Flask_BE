function results() {
    var keyword = document.getElementById('keyword').value;
    var categorytype = document.getElementById('categorytype').value;
    var moviesearch = "http://localhost:5000/moviequery?query=" + keyword;
    var tvsearch = "http://localhost:5000/tvquery?query=" + keyword;
    var multisearch = "http://localhost:5000/multiquery?query=" + keyword;

    if (keyword == '' || categorytype == '') {
        alert("Please enter valid values.");
    }

    if (categorytype == 'Movies'){
        return moviequery(moviesearch);
    }

    if (categorytype == 'TV Shows'){
        return tvquery(tvsearch);
    }
    
    if (categorytype == 'Movies and TV Shows'){
        return multiquery(multisearch);
    }                       
}

function clearout() {
    document.getElementById('keyword').value = "";
    document.getElementById('categorytype').value = "";
    document.getElementById("searchresult").innerHTML = "";
}

function moviequery(x) {
    var moviesearch = x
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
            var obj = JSON.parse(this.responseText)
            
            if (obj.length == 0) {
                document.getElementById("searchresult").innerHTML =  
                '<div class="noResult">No results found.</div>';
            }else {
                var showing = document.createElement('div');
                showing.className = 'showing';
                showing.innerHTML = "Showing results..."

                document.getElementById("searchresult").innerHTML = '';
                document.getElementById("searchresult").appendChild(showing);

                for (var i = 0; i < obj.length; i++) {
                    var movieid = obj[i].id;
                    var movietitle = obj[i].title;
                    var overview = obj[i].overview;
                    var posterpath = obj[i].poster_path;
                    var releasedate = obj[i].release_date;
                    var voteaverage = obj[i].vote_average;
                    var votecount = obj[i].vote_count;
                    var genreids = obj[i].genre_ids;

                    if(releasedate == "" || releasedate == null) {
                        releasedate = "N/A"
                    } else {
                        newdate = new Date(obj[i].release_date);
                        releasedate = newdate.getFullYear();
                    }
                    
                    if(genreids == "" || genreids == null) {
                        genreids = "N/A"
                    } else {
                        genreids = obj[i].genre_ids;
                    }
                    
                    if(votecount == "" || votecount == null) {
                        votecount = "0"
                    } else {
                        votecount = obj[i].vote_count;
                    }

                    if(voteaverage == "" || voteaverage == null) {
                        voteaverage = ""
                    } else {
                        voteaverage = '<span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;'
                    }

                    var badge = document.createElement('div');
                    badge.className = 'card';
                    badge.innerHTML =                    
                    '<div class="searchcard">' + 
                    '<img class="movieposter" src=' + posterpath + '>' +
                    '<h2>' + movietitle + '</h2>' +
                    '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '<br>' +
                    voteaverage + votecount + ' votes</p>' +                        
                    '<p class="ellipsistext" style="font-size:13px;">' + overview + '</p>' +
                    '<button type="button" class="showmore" onclick="moviedeets(' + movieid +')">Show more</button>' +
                    '</div>';
                    document.getElementById("searchresult").appendChild(badge);
                }    
            }
        }
    };
    xhttp.open("GET", moviesearch , true);
    xhttp.send();
}

function tvquery(x) {
    var tvsearch = x
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
            var obj = JSON.parse(this.responseText)
            
            if (obj.length == 0) {
                document.getElementById("searchresult").innerHTML = 
                '<div class="noResult">No results found.</div>';
            } else {
                var showing = document.createElement('div');
                showing.className = 'showing';
                showing.innerHTML = "Showing results..."

                document.getElementById("searchresult").innerHTML = '';
                document.getElementById("searchresult").appendChild(showing);

                for (var i = 0; i < obj.length; i++) {
                    var movieid = obj[i].id;
                    var movietitle = obj[i].name;
                    var overview = obj[i].overview;
                    var posterpath = obj[i].poster_path;
                    var releasedate = obj[i].first_air_date;
                    var voteaverage = obj[i].vote_average;
                    var votecount = obj[i].vote_count;
                    var genreids = obj[i].genre_ids;

                    if(releasedate == "" || releasedate == null) {
                        releasedate = "N/A"
                    } else {
                        newdate = new Date(obj[i].first_air_date);
                        releasedate = newdate.getFullYear();
                    }

                    if(genreids == "" || genreids == null) {
                        genreids = "N/A"
                    } else {
                        genreids = obj[i].genre_ids;
                    }
                    
                    if(votecount == "" || votecount == null) {
                        votecount = "0"
                    } else {
                        votecount = obj[i].vote_count;
                    }

                    if(voteaverage == "" || voteaverage == null) {
                        voteaverage = ""
                    } else {
                        voteaverage = '<span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;'
                    }

                    var badge = document.createElement('div');
                    badge.className = 'card';
                    badge.innerHTML =                    
                    '<div class="searchcard">' + 
                    '<img class="movieposter" src=' + posterpath + '>' +
                    '<h2>' + movietitle + '</h2>' +
                    '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '<br>' +
                    voteaverage + votecount + ' votes</p>' +                        
                    '<p class="ellipsistext" style="font-size:13px;">' + overview + '</p>' +
                    '<button type="button" class="showmore" onclick="tvdeets(' + movieid +')">Show more</button>' +
                    '</div>';
                    document.getElementById("searchresult").appendChild(badge);
                }
            }
        }
    };
    xhttp.open("GET", tvsearch, true);
    xhttp.send();
}

function multiquery(x) {
    var multisearch = x
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
            var obj = JSON.parse(this.responseText)
            
            if (obj.length == 0) {
                document.getElementById("searchresult").innerHTML = 
                '<div class="noResult">No results found.</div>';
            } else {
                var showing = document.createElement('div');
                showing.className = 'showing';
                showing.innerHTML = "Showing results..."

                document.getElementById("searchresult").innerHTML = '';
                document.getElementById("searchresult").appendChild(showing);

                for (var i = 0; i < obj.length; i++) {
                    
                    if(obj[i].media_type == "movie") {
                        var movieid = obj[i].id;
                        var movietitle = obj[i].title;
                        var overview = obj[i].overview;
                        var posterpath = obj[i].poster_path;
                        var releasedate = obj[i].release_date;
                        var voteaverage = obj[i].vote_average;
                        var votecount = obj[i].vote_count;
                        var genreids = obj[i].genre_ids;

                        if(releasedate == "" || releasedate == null) {
                            releasedate = "N/A"
                        } else {
                            newdate = new Date(obj[i].release_date);
                            releasedate = newdate.getFullYear();
                        }

                        if(genreids == "" || genreids == null) {
                            genreids = "N/A"
                        } else {
                            genreids = obj[i].genre_ids;
                        }
                        
                        if(votecount == "" || votecount == null) {
                            votecount = "0"
                        } else {
                            votecount = obj[i].vote_count;
                        }

                        if(voteaverage == "" || voteaverage == null) {
                            voteaverage = ""
                        } else {
                            voteaverage = '<span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;'
                        }
    
                        var badge = document.createElement('div');
                        badge.className = 'card';
                        badge.innerHTML =                    
                        '<div class="searchcard">' + 
                        '<img class="movieposter" src=' + posterpath + '>' +
                        '<h2>' + movietitle + '</h2>' +
                        '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '<br>' +
                        voteaverage + votecount + ' votes</p>' +                        
                        '<p class="ellipsistext" style="font-size:13px;">' + overview + '</p>' +
                        '<button type="button" class="showmore" onclick="moviedeets(' + movieid +')">Show more</button>' +
                        '</div>';
                        document.getElementById("searchresult").appendChild(badge);
                    }
                    
                    if(obj[i].media_type == "tv") {
                        var movieid = obj[i].id;
                        var movietitle = obj[i].name;
                        var overview = obj[i].overview;
                        var posterpath = obj[i].poster_path;
                        var releasedate = obj[i].first_air_date;
                        var voteaverage = obj[i].vote_average;
                        var votecount = obj[i].vote_count;
                        var genreids = obj[i].genre_ids;

                        if(releasedate == "" || releasedate == null) {
                            releasedate = "N/A"
                        } else {
                            newdate = new Date(obj[i].first_air_date);
                            releasedate = newdate.getFullYear();
                        }
                        
                        if(votecount == "" || votecount == null) {
                            votecount = "0"
                        } else {
                            votecount = obj[i].vote_count;
                        }

                        if(voteaverage == "" || voteaverage == null) {
                            voteaverage = ""
                        } else {
                            voteaverage = '<span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;'
                        }
    
                        var badge = document.createElement('div');
                        badge.className = 'card';
                        badge.innerHTML =                    
                        '<div class="searchcard">' + 
                        '<img class="movieposter" src=' + posterpath + '>' +
                        '<h2>' + movietitle + '</h2>' +
                        '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '<br>' +
                        voteaverage + votecount + ' votes</p>' +                        
                        '<p class="ellipsistext" style="font-size:13px;">' + overview + '</p>' +
                        '<button type="button" class="showmore" onclick="tvdeets(' + movieid +')">Show more</button>' +
                        '</div>';
                        document.getElementById("searchresult").appendChild(badge);
                    }
                }
            }
        }
    };
    xhttp.open("GET", multisearch, true);
    xhttp.send();
}