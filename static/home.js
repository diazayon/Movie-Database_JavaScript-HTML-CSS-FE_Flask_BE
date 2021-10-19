//trending
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
    var obj = JSON.parse(this.responseText)

    for (var i = 0; i < obj.length; i++) {
        var trendtitle = obj[i].title;
        var trending = obj[i].backdrop_path;
        var releasedate = obj[i].release_date;

        if (trending == null) {
            trending = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg"
        } else {
            trending = "https://www.themoviedb.org/t/p/w780" + obj[i].backdrop_path;
        }

        if(releasedate == "" || releasedate == null) {
            releasedate = "N/A"
        } else {
            newdate = new Date(obj[i].release_date);
            releasedate = newdate.getFullYear();
        }

        var badge = document.createElement('div');
        badge.className = 'mySlides';
        badge.innerHTML =                    
            '<div class="hometitles" style="font-size:20px;">Trending Movies</div>' +
            '<img class="fade" src="'+trending +'">' +
            '<div class="pictext fade" style="font-size:18px;">' + trendtitle + ' (' + releasedate + ')' +'</div>';
        document.getElementById("trending").appendChild(badge);
    }

    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2000);
    }
}
};
xhttp.open("GET", "http://127.0.0.1:5000/trending", true);
xhttp.send();

//airing today
var axhttp = new XMLHttpRequest();
axhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
    var obj = JSON.parse(this.responseText)

    for (var i = 0; i < obj.length; i++) {
        var airname = obj[i].name;
        var airimg = obj[i].backdrop_path;
        var releasedate = obj[i].first_air_date;

        if (airimg == null) {
            airimg = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg"
        }  else {
            airimg = "https://www.themoviedb.org/t/p/w780" + obj[i].backdrop_path;
        }

        if(releasedate == "" || releasedate == null) {
            releasedate = "N/A"
        } else {
            newdate = new Date(obj[i].first_air_date);
            releasedate = newdate.getFullYear();
        }

        var badge = document.createElement('div');
        badge.className = 'mySlides2';
        badge.innerHTML =                    
            '<div class="hometitles"  style="font-size:20px;">TV Shows On-Air Today</div>' +
            '<img class="fade" src="'+airimg +'">' +
            '<div class="pictext fade" style="font-size:18px;">' + airname + ' (' + releasedate + ')' +'</div>';
        document.getElementById("ontoday").appendChild(badge);
    }

    var slideIndex = 0;
    showSlides();

    function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides2");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000);
    }
}
};

axhttp.open("GET", "http://127.0.0.1:5000/airingtoday", true);
axhttp.send();