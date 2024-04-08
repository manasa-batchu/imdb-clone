const titleNdYear = document.getElementById('titleNdYear');
const selectedMovieTitle = document.getElementById('selectedMovieTitle')
const selectedMovieYr = document.getElementById('selectedMovieYr')
const selectedMoviePoster = document.getElementById('selectedMoviePoster')
const plotDetails = document.getElementById('plotDetails')
const rating = document.getElementById('rating')
const directorDetails = document.getElementById('directorDetails')
const castDetails = document.getElementById('castDetails')
const genreDetails = document.getElementById('genreDetails')
let id = '';


// loads details of selectedMovie
function fetchId() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const url = window.location.href;
    id = url.split('?')[1].split('=')[1]
    console.log(id)
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=87ba5778`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        selectedMoviePoster.src = `${data.Poster}`
        selectedMovieTitle.textContent = `${data.Title}`
        selectedMovieYr.textContent = `${data.Year}`
        plotDetails.textContent = `${data.Plot}`
        directorDetails.textContent = `${data.Director}`
        castDetails.textContent = `${data.Actors}`
        genreDetails.innerHTML = `${data.Genre}`
        rating.innerHTML = `${data.imdbRating !== 'N/A' ? `<i class="fa fa-star" style="color:rgb(255,166,0);"></i> ${data.imdbRating}/10` : 'N/A'}`;

        loader.style.display = 'none';
        overlay.style.display = 'none';
    }).catch((error) => {
        console.log(error)
        loader.style.display = 'none';
        overlay.style.display = 'none';
    })

}

// navigates to homepage upon click of back button
function back() {
    window.location.href = '../../index.html'
}

fetchId()