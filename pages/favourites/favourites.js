const favoriteList = document.getElementById('favorite-list')

// loads list of favorites from localStorage
function favList() {
    const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    console.log(storedFavoriteMovies)
    favoriteList.innerHTML = ''
    storedFavoriteMovies.forEach(id => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=87ba5778`).then((res) => res.json())
            .then((movie) => {
                const favContainer = document.createElement('div');
                favContainer.className = 'favContainer';
                favContainer.id = id;
                favContainer.innerHTML = `
        <div id="imageContainer"><img src="${movie.Poster}" id="favPoster"></div>
            <div id="favDetails"> 
                <div style="display:flex;justify-content:space-between;">
                    <h3 id="favTitle" style="margin-bottom:10px;color:rgb(19,108,178)">${movie.Title}</h3>
                    <button id="deleteFav" style="background-color:transparent;border:none;" onclick="deletefavourite('${movie.imdbID}')">
                        <i class="fa-solid fa-trash" style="color: white;font-size:18px"></i>
                    </button>
                </div>
                <p style="font-size: 16px;margin-top:0;margin-bottom:0; color:#666666">${movie.Year}  | ${movie.Genre}  </p>
            <p style="font-size: 14px; font-weight: bold;"> ${movie.imdbRating !== 'N/A' ? `<i class="fa fa-star" style="color:rgb(255,166,0);"></i> ${movie.imdbRating}` : 'N/A'}</p>
            <p id="plotDetails">${movie.Plot}</p>
            </div>`

                favoriteList.appendChild(favContainer)

            }).catch((error) => {
                console.log(error)
            })
    })
}

// navigates to homepage upon click of back button
function back() {
    window.location.href = '../../index.html'
}

// deletes the movie from myFavorite list
function deletefavourite(id){
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    if (favoriteMovies && favoriteMovies.length > 0) {
        const index = favoriteMovies.indexOf(id);
        if (index !== -1) {
            favoriteMovies.splice(index, 1);
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            
            console.log('Movie ID', id, 'removed from favorites.');
            const movieElement = document.getElementById(id);
            if (movieElement) {
                movieElement.remove();
            } else {
                console.log('HTML element not found for movie ID', id);
            }
        } else {
            console.log('Movie ID', id, 'not found in favorites.');
        }
    } else {
        console.log('No favorite movies found in localStorage.');
    }
}

favList()
