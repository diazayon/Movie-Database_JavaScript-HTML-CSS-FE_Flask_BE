function moviedeets(x) {
    var movieidquery = x
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
            var obj = JSON.parse(this.responseText)

            var movieid = x;
            var movietitle = obj['details'].title;
            var releasedate = obj['details'].release_date;
            var spokenlanguages = obj['details'].spoken_languages;
            var voteaverage = obj['details'].vote_average;
            var votecount = obj['details'].vote_count;
            var itembackground = obj['details'].backdrop_path;
            var genreids = obj['details'].genres;
            var overview = obj['details'].overview;

            if(releasedate == "" || releasedate == null) {
                releasedate = "N/A"
            } else {
                newdate = new Date(obj['details'].release_date);
                releasedate = newdate.getFullYear();
            }

            if(votecount == "" || votecount == null) {
                votecount = "0"
            } else {
                votecount = obj['details'].vote_count;
            }

            if(voteaverage == "" || voteaverage == null) {
                voteaverage = ""
            } else {
                voteaverage = '<p style="font-size:13px;"><span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;&nbsp;'
            }

            var badge = document.createElement('div');
            badge.className = 'modalcontent';
            badge.innerHTML = 
                '<img src=' + itembackground + ' class="imgcenter">' +
                '<div class="modalcontent"><span style="font-size:30px">' + movietitle + '</span>' + 
                '&nbsp;&nbsp;<a href="https://www.themoviedb.org/movie/' + movieid + '" target="_blank" style="color:red; text-decoration: none;">&#9432;</a>' +
                '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '</p>' +
                voteaverage + votecount + ' votes</p><br>' +                        
                '<p style="font-size:13px;">' + overview + '</p>' +
                '<p style="font-size:13px;"><b><i>Spoken languages: ' + spokenlanguages + '</b></i></p>'
            ;
            document.getElementById("thisone").appendChild(badge);

            var casttitle = document.createElement('div');
            casttitle.className = 'modalcontent';
            casttitle.innerHTML = '<div class="reviewCastheader">Cast</div>';
            document.getElementById("thisone").appendChild(casttitle);

            if(obj['credits'].length == 0 || obj['credits'].length == null) {
                var nocast = document.createElement('div');
                nocast.innerHTML = '<span style="margin-left: 30px;">N/A</span>';
                document.getElementById("thisone").appendChild(nocast);
            } else {
                var badge1 = document.createElement('div');
                badge1.className = 'divTable';
                badge1.setAttribute("id", "table1");
                var badge2 = document.createElement('div');
                badge2.className = 'divTableBody';
                badge2.setAttribute("id", "body1");
                var badge3 = document.createElement('div');
                badge3.className = 'divTableRow';
                badge3.setAttribute("id", "row1");
                var badge4 = document.createElement('div');
                badge4.className = 'divTableRow';
                badge4.setAttribute("id", "row2");

                document.getElementById("thisone").appendChild(badge1);
                document.getElementById("table1").appendChild(badge2);
                document.getElementById("body1").appendChild(badge3);
                document.getElementById("body1").appendChild(badge4);

                for (var i = 0; i < obj['credits'].length; i++) {
                    var name = obj['credits'][i].name;
                    var character = obj['credits'][i].character;
                    var profilepath = obj['credits'][i].profile_path;

                    if(character == "" || character == null) {
                        character = ""
                    } else{
                    character = '<p style="margin:0;padding:0;font-size:13px;">AS</p>' +
                    '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;">' + character + '</p>'
                    }
                    
                    if (i > 3) {
                        var badge = document.createElement('div');
                        badge.className = 'divTableCell';
                        badge.innerHTML =
                        '<img src=' + profilepath + '>' +
                        '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;"><strong>' + name + '</strong></p>' +
                        character;
                        
                        document.getElementById("row2").appendChild(badge);
                    } else {
                    var badge = document.createElement('div');
                    badge.className = 'divTableCell';
                    badge.innerHTML =
                    '<img src=' + profilepath + '>' +
                    '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;"><strong>' + name + '</strong></p>' +
                    character; 
                    document.getElementById("row1").appendChild(badge);
                    }
                }
            }

            var reviewpart = document.createElement('div');
            reviewpart.className = 'modalcontent';
            reviewpart.innerHTML = '<div class="reviewCastheader">Reviews</div>';
            document.getElementById("thisone").appendChild(reviewpart);

            if(obj['reviews'].length == 0 ||obj['reviews'].length == null) {
                var noreviews = document.createElement('div');
                noreviews.innerHTML = '<span style="margin-left: 30px;">N/A</span>';
                document.getElementById("thisone").appendChild(noreviews);

            } else {
                for (var i = 0; i < obj['reviews'].length; i++) {
                    var name = obj['reviews'][i]['author_details'].username;
                    var content = obj['reviews'][i].content;
                    var rating = obj['reviews'][i]['author_details'].rating;
                    var created_at = obj['reviews'][i].created_at;

                    if(rating == null) {
                        rating = '<p style="font-size:13px;">'
                    } else {
                        rating = '<p style="font-size:13px;"><span style="color:#ae271c;">&#9733;' + obj['reviews'][i]['author_details'].rating/2 + '/5</span><br>'
                    }

                    if(created_at == "" || created_at == null) {
                        created_at = ""
                    } else {
                        newDate = new Date(obj['reviews'][i].created_at);
                        created_at = newDate.toLocaleDateString('en-US');
                    }

                    var badge = document.createElement('div');
                    badge.className = 'modalcontent';
                    badge.innerHTML =
                    '<p style="font-size:13px;"><b>' + name  + '</b> on ' + created_at + '</p>' +
                    rating + 
                    '<span class="ellipsistext">' + content + '</span></p>' +
                    '<div class="reviewline"><div>';
                    document.getElementById("thisone").appendChild(badge);
                }
            }
    }

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("thisone").innerHTML = '<span class="close">&times;</span>';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("thisone").innerHTML = '<span class="close">&times;</span>';
        }
    }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/moviepopup?query=" + movieidquery, true);
    xhttp.send();
}

function tvdeets(x) {
    var tvidquery = x;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var obj = JSON.parse(this.responseText)

            var tvid = x;
            var itembackground = obj['details'].backdrop_path;
            var releasedate = obj['details'].first_air_date;
            var genreids = obj['details'].genres;
            var tvtitle = obj['details'].name;
            var overview = obj['details'].overview;
            var spokenlanguages = obj['details'].spoken_languages;
            var voteaverage = obj['details'].vote_average;
            var votecount = obj['details'].vote_count;
            
            if(releasedate == "" || releasedate == null) {
                releasedate = "N/A"
            } else {
                newdate = new Date(obj['details'].first_air_date);
                releasedate = newdate.getFullYear();
            }

            if(votecount == "" || votecount == null) {
                votecount = "0"
            } else {
                votecount = obj['details'].vote_count;
            }

            if(voteaverage == "" || voteaverage == null) {
                voteaverage = ""
            } else {
                voteaverage = '<p style="font-size:13px;"><span style="color:#ae271c;">&#9733; ' + voteaverage/2 + '/5</span> &nbsp;&nbsp;'
            }

            var badge = document.createElement('div');
            badge.className = 'modalcontent';
            badge.innerHTML = 
                '<img src=' + itembackground + ' class="imgcenter">' +
                '<div class="modalcontent"><span style="font-size:30px">' + tvtitle + '</span>' + 
                '&nbsp;&nbsp;<a href="https://www.themoviedb.org/tv/' + tvid + '" target="_blank" style="color:red; text-decoration: none;">&#9432;</a>' +
                '<p style="font-size:13px;">' + releasedate + ' | ' + genreids + '</p>' +
                voteaverage + votecount + ' votes</p><br>' +                        
                '<p style="font-size:13px;">' + overview + '</p>' +
                '<p style="font-size:13px;"><b><i>Spoken languages: ' + spokenlanguages + '</b></i></p>'
            ;
            document.getElementById("thisone").appendChild(badge);

            var castTitle = document.createElement('div');
            castTitle.className = 'modalcontent';
            castTitle.innerHTML = '<div class="reviewCastheader">Cast</div>';
            document.getElementById("thisone").appendChild(castTitle);

            if(obj['credits'].length == 0 || obj['credits'].length == null) {
                var nocast = document.createElement('div');
                nocast.innerHTML = '<span style="margin-left: 30px;">N/A</span>';
                document.getElementById("thisone").appendChild(nocast);
            } else {
                var badge1 = document.createElement('div');
                badge1.className = 'divTable';
                badge1.setAttribute("id", "table1");
                var badge2 = document.createElement('div');
                badge2.className = 'divTableBody';
                badge2.setAttribute("id", "body1");
                var badge3 = document.createElement('div');
                badge3.className = 'divTableRow';
                badge3.setAttribute("id", "row1");
                var badge4 = document.createElement('div');
                badge4.className = 'divTableRow';
                badge4.setAttribute("id", "row2");

                document.getElementById("thisone").appendChild(badge1);
                document.getElementById("table1").appendChild(badge2);
                document.getElementById("body1").appendChild(badge3);
                document.getElementById("body1").appendChild(badge4);
                
                for (var i = 0; i < obj['credits'].length; i++) {
                    var name = obj['credits'][i].name;
                    var profilepath = obj['credits'][i].profile_path;
                    var character = obj['credits'][i].character;

                    if(character == "" || character == null) {
                        character = ""
                    } else{
                        character = '<p style="margin:0;padding:0;font-size:13px;">AS</p>' +
                    '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;">' + character + '</p>'
                    }

                    if (i > 3) {
                        var badge = document.createElement('div');
                        badge.className = 'divTableCell';
                        badge.innerHTML =
                        '<img src=' + profilepath + '>' +
                        '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;"><strong>' + name + '</strong></p>' +
                        character;
                        
                        document.getElementById("row2").appendChild(badge);
                    } else {
                    var badge = document.createElement('div');
                    badge.className = 'divTableCell';
                    badge.innerHTML =
                    '<img src=' + profilepath + '>' +
                    '<p class="ellipsisname" style="margin:0;padding:0;font-size:13px;"><strong>' + name + '</strong></p>' +
                    character;
                    document.getElementById("row1").appendChild(badge);
                    }
                }
            }

            var reviewTitle = document.createElement('div');
            reviewTitle.className = 'modalcontent';
            reviewTitle.innerHTML = '<div class="reviewCastheader" >Reviews</div>';
            document.getElementById("thisone").appendChild(reviewTitle);

            if(obj['reviews'].length == 0 ||obj['reviews'].length == null) {
                var noreviews = document.createElement('div');
                noreviews.innerHTML = '<span style="margin-left: 30px;">N/A</span>';
                document.getElementById("thisone").appendChild(noreviews);

            } else {
                for (var i = 0; i < obj['reviews'].length; i++) {
                    var name = obj['reviews'][i]['author_details'].username;
                    var content = obj['reviews'][i].content;
                    var rating = obj['reviews'][i]['author_details'].rating;
                    var created_at = obj['reviews'][i].created_at;

                    if(rating == null) {
                        rating = '<p style="font-size:13px;">'
                    } else {
                        rating = '<p style="font-size:13px;"><span style="color:#ae271c;">&#9733;' + obj['reviews'][i]['author_details'].rating/2 + '/5</span><br>'
                    }
                    
                    if(created_at == "" || created_at == null) {
                        created_at = ""
                    } else {
                        newDate = new Date(obj['reviews'][i].created_at);
                        created_at = newDate.toLocaleDateString('en-US');
                    }

                    var badge = document.createElement('div');
                    badge.className = 'modalcontent';
                    badge.innerHTML =
                    '<p style="font-size:13px;"><b>' + name  + '</b> on ' + created_at + '</p>' +
                    rating + 
                    '<span class="ellipsistext">' + content + '</span></p>' +
                    '<div class="reviewline"><div>';
                    document.getElementById("thisone").appendChild(badge);
                }
            }
        }
    
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        
        span.onclick = function() {
            modal.style.display = "none";
            document.getElementById("thisone").innerHTML = '<span class="close">&times;</span>';
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById("thisone").innerHTML = '<span class="close">&times;</span>';
            }
        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/tvpopup?query=" + tvidquery, true);
    xhttp.send();
}