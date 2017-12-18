var CROZ0034 = {
    api: "cfa3c3fbd49016da6750569ac081e69c",
    url: "https://api.themoviedb.org/3/",
    imgurl: "http://image.tmdb.org/t/p/",
//    Place holder incase of configData failure
    imgSize: [0,0,0,0,0,0,"w154/",0],
//    Place holder incase of configData failure
    searchresults: 0,
    recresults: 0,
    page: 1,

    init: function () {
        configData();
        let input = document.getElementById('search-input');
        input.focus();
        setTimeout(addHandlers, 1234);
        
        function addHandlers() {
            let btn = document.getElementById('search-button');
            btn.addEventListener('click', runSearch);
            let bak = document.getElementById('back');
            bak.addEventListener('click', flip);
            let enter = document.getElementById('search-input');
            enter.addEventListener('keypress', function(go){
                let char = go.charCode || ev.char || ev.which;
                let str = String(char);
                if (str == 10 || str == 13){
                btn.dispatchEvent(new MouseEvent ('click'));
                }});
        }
        
      function configData(){
          let confURL = `${CROZ0034.url}configuration?api_key=${CROZ0034.api}`;
              fetch(confURL)
                .then(response => response.json())
                .then(data => {
                console.log(data);
                CROZ0034.imgurl = data.images.base_url;
                CROZ0034.imgSize = data.images.poster_sizes;
                })
                .catch(err => {
                console.log(err)
                })
          
      }

        function flip(ev){
            let banner = document.getElementById('results');
            let view = document.getElementById('recommend-results');
            view.classList.toggle('hidden');
            let container = document.querySelector('#search-results');
            container.classList.toggle('hidden'); 
            if(CROZ0034.page == 1) {
            CROZ0034.page = 2;
            let navigation = document.getElementById('back');
            navigation.textContent = `Flip Page (${CROZ0034.page}/2)`;
            banner.textContent = `${CROZ0034.recresults} results`;
            }
            else{
            CROZ0034.page = 1;
            let navigation = document.getElementById('back');
            navigation.textContent = `Flip Page (${CROZ0034.page}/2)`;
            banner.textContent = `${CROZ0034.searchresults} results`;
            }
        }
                       
        function runSearch(ev) {
            ev.preventDefault();
            CROZ0034.page = 1;
            let navigation = document.getElementById('back');
            navigation.textContent = `Flip Page (${CROZ0034.page}/2)`;
            let view = document.getElementById('recommend-results');
            view.classList.add('hidden');
            let container = document.querySelector('#search-results');
            let input = document.getElementById('search-input');
            console.log('search happens')
            
            if (input.value) {
                let url = `${CROZ0034.url}search/movie?api_key=${CROZ0034.api}&query=${input.value}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        showMovies(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            
            setTimeout(function(){container.classList.remove('hidden');}, 40);    
        }
        
        function recs(ev) {
            let choice = this.id;
            let search = document.getElementById('search-results');
            search.classList.add('hidden');
            let container = document.getElementById('recommend-results');
            let df = document.createDocumentFragment();
            let recurl = `${CROZ0034.url}movie/${choice}/recommendations?api_key=${CROZ0034.api}&language=en-US&page=1`;
            CROZ0034.page = 2;
            let navigation = document.getElementById('back');
            navigation.textContent = `Flip Page (${CROZ0034.page}/2)`;

            fetch(recurl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    showMovies(data)
                })
                .catch(err => {
                    console.log(err)
                })
            
            setTimeout(function(){container.classList.remove('hidden');}, 40);
            
        }

        function showMovies(movies) {
            let df = document.createDocumentFragment();
            let incoming = movies.results;
            let banner = document.getElementById('results');
            let container = '';
             if(CROZ0034.page == 1) {
                 container = document.getElementById('search-results');
            CROZ0034.searchresults = incoming.length;
            banner.textContent = `${CROZ0034.searchresults} results`;
             }
            else{
                container = document.getElementById('recommend-results');
            CROZ0034.recresults = incoming.length;
            banner.textContent = `${CROZ0034.recresults} results`;
            }
            container.innerHTML = "";

            movies.results.forEach(function (movie) {
                let div = document.createElement('div');
                div.classList.add('movie');
                div.id = movie['id'];
                df.appendChild(div);
                let poster = document.createElement('img');
                poster.classList.add('poster');
                let posterPath = movie.poster_path;
                poster.src = CROZ0034.imgurl + CROZ0034.imgSize[1] + posterPath;
                poster.alt = "poster for " + movie.title;
                div.appendChild(poster);
                let title = document.createElement('h2');
                title.textContent = movie.title;
                div.appendChild(title);
                let overview = document.createElement('p');
                overview.classList.add('movie-desc');
                overview.textContent = movie.overview;
                div.appendChild(overview);
                let relevence = document.createElement('p');
                relevence.classList.add('released');
                relevence.textContent = movie.release_date;
                div.appendChild(relevence);
                div.addEventListener('click', recs);
                setTimeout(function(){div.classList.add('move');}, 40);
            container.appendChild(df);
            });
        }

        
    }
}
document.addEventListener('DOMContentLoaded', CROZ0034.init)
