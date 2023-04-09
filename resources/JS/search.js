// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    // const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const URL2 = `https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NYSE&apikey=bbc6c7abb96d9e77dd30eaa0088f0bb8`;
    // const res = await fetch(`${URL}`);
    const res2 = await fetch(`${URL2}`);
    // const data = await res.json();
    const data2 = await res2.json();
    // console.log(data);
    // console.log(data2);
    console.log(res2.response)
    // if(data2.Response == "True") 
    displayMovieList(data2);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        // console.log(idx)
        let movieListItem = document.createElement('div');
        // console.log(movieListItem)
        // movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id,
        movieListItem.dataset.id = movies[idx].symbol; // setting movie id in  data-id,
        movieListItem.classList.add('search-list-item');
        // if(movies[idx].Poster != "N/A")
        //     moviePoster = movies[idx].Poster;
        // else 
        //     moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-info">
            <h3>${movies[idx].name}</h3>
            <p>${movies[idx].symbol}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
        // console.log(searchList)
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            // const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            // console.log(movie.dataset.id)
            let urldetails = `https://financialmodelingprep.com/api/v3/profile/${movie.dataset.id}?apikey=bbc6c7abb96d9e77dd30eaa0088f0bb8`
            // console.log(urldetails)
            const result = await fetch(`${urldetails}`) ; 
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
            trigger();
        });
    });
}



function displayMovieDetails(details){
    resultGrid.innerHTML = 
    `<div class= "container-results-side">
        <div class = "container-results-side-header">
            <div class = "movie-poster">
                <img src = "${(details[0].image != "N/A") ? details[0].image : "image_not_found.png"}" alt = "movie poster">
            </div>
            <div class = "stockname">
                <h3 class = "movie-title">${details[0].companyName}</h3>
                <h3 class = "movie-title" id = "inputTicker">${details[0].symbol}</h3>
            </div>  
        </div>
        <div class = "movie-info">
            <ul class = "movie-misc-info">
                <li class = "year">ISIN: ${details[0].isin}</li>
                <li class = "rated">Exchange: ${details[0].exchangeShortName}</li>
                <li class = "released">Industry: ${details[0].industry}</li>
            </ul>
            <p class = "genre"><b>Current Price:</b> ${details[0].price}</p>
            <p class = "writer"><b>Market Cap:</b> ${details[0].mktCap}</p>
            <p class = "actors"><b>Country: </b>${details[0].country}</p>
            <p class = "plot"><b>Description:</b> ${details[0].description}</p>
        </div>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});







async function startLoadDetails(){
    let urldetails = `https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=bbc6c7abb96d9e77dd30eaa0088f0bb8`
    console.log(urldetails)
    const result = await fetch(`${urldetails}`) ; 
    const stockDetails = await result.json();
    startStockDetails(stockDetails);
}

function startStockDetails(details){
    resultGrid.innerHTML = 
    `<div class= "container-results-side">
        <div class = "container-results-side-header">
            <div class = "movie-poster">
                <img src = "${(details[0].image != "N/A") ? details[0].image : "image_not_found.png"}" alt = "movie poster">
            </div>
            <div class = "stockname">
                <h3 class = "movie-title">${details[0].companyName}</h3>
                <h3 class = "movie-title" id = "inputTicker">${details[0].symbol}</h3>
            </div>  
        </div>
        <div class = "movie-info">
            <ul class = "movie-misc-info">
                <li class = "year">ISIN: ${details[0].isin}</li>
                <li class = "rated">Exchange: ${details[0].exchangeShortName}</li>
                <li class = "released">Industry: ${details[0].industry}</li>
            </ul>
            <p class = "genre"><b>Current Price:</b> ${details[0].price}</p>
            <p class = "writer"><b>Market Cap:</b> ${details[0].mktCap}</p>
            <p class = "actors"><b>Country: </b>${details[0].country}</p>
            <p class = "plot"><b>Description:</b> ${details[0].description}</p>
        </div>
    </div>
    `;
}