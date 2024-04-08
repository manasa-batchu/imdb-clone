
const search = document.getElementById('search');
const favoriteButton = document.getElementById('favorite');
const moviesList = document.getElementById('movies-list');
var favoriteMovies = [];


// get list of fav movies from localstorage
function loadFavoriteMovies() {
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
    if (storedFavoriteMovies) {
        favoriteMovies = JSON.parse(storedFavoriteMovies);
    }

}

// change of input text in search bar
function inputChange(event) {
    const searchValue = encodeURIComponent(event.target.value.trim());
    if (!searchValue) {
        console.log('Search value is empty');
        return;
    }
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=87ba5778`).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.Response === 'False') {
            if (data.Error == "Too many results.") {
                moviesList.innerHTML = `<p style="font-size: 30px; margin: auto; padding:200px;color: rgba(255, 255, 255, 0.7);">Please enter at least 3 characters to search.</p>`;

            }
            if (data.Error === 'Movie not found!') {
                moviesList.innerHTML = `<p style="font-size: 30px; margin: auto; padding:200px;color: rgba(255, 255, 255, 0.7);">${data.Error}</p>`;
            }
            console.log(data.Error);
            return
        }
        else {
            const searchResults = data.Search;

            if (searchResults != undefined) {
                moviesList.innerHTML = ''
                searchResults.forEach((movie) => {
                    const eachMovie = document.createElement('div');
                    eachMovie.className = "movieContainer";
                    eachMovie.id = `movie-${movie.imdbID}`;

                    let moviePoster = '';
                    if (movie.Poster !== 'N/A') {
                        moviePoster = movie.Poster;
                    } else {
                        moviePoster = 'images/No-Image.png'; 
                    }

                    const isFavorite = favoriteMovies.includes(movie.imdbID);
                    eachMovie.innerHTML = `
                        <img src="${moviePoster}" alt="No image" class="moviePoster">
                        <h6 class="movieTitle">${movie.Title}(${movie.Year})</h6>
                        <button id="favButton-${movie.imdbID}" class="addToFavourite" onclick="event.stopPropagation(); favourite('${movie.imdbID}')">
                            <i  id="heartIcon-${movie.imdbID}" class="${isFavorite ? ' fa-solid' : 'fa-regular '} fa-heart"></i>  Add to Favourites
                        </button>`
                    moviesList.appendChild(eachMovie);
                    eachMovie.addEventListener('click', function () {
                        window.location.href = `pages/movies/moviesPage.html?imdbID=${movie.imdbID}`;
                    });

                })
            }
        }

    }).catch((error) => {
        console.log(error);
    })
}

// upon clicking of add to fav, sets the value in local storage
function favourite(id) {
    if (!favoriteMovies.includes(id)) {
        favoriteMovies.push(id);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        const icon=document.getElementById(`heartIcon-${id}`);
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }
}

// upon click of fav buttom favourite button navigates to myFavourite page
function viewFavourites() {
    window.location.href = `pages/favourites/myFavourites.html`;
}

favoriteButton.addEventListener('click', viewFavourites)
search.addEventListener('input', inputChange)
loadFavoriteMovies();



