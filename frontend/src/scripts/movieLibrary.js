export const loadLibrary = () => {
    
    
    // Loading all the Movies Dynamically
    let moviesDiv = document.getElementById('movies');
    
    function loadMovie(element) {
        let format = element.format.split(',').join(" • ");
        let div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `
            <img src="MovieBanner/${element.image_loc}">
            <h1>${element.name}</h1> 
            <p>${element.language}</p> 
            <p>${format}</p>
            `;
        moviesDiv.appendChild(div);
    }
    
    
    movies.forEach(element => loadMovie(element));
    // Loading Languages Options
    let i = 0;
    let languageDiv = document.getElementById('languageOptions');
    languageList.forEach((language)=> {
        let languageHTML = document.createElement('div');
        languageHTML.className = "option";
        if(i === 0 ) {
        languageChecked = 'checked';
        languageValue = 'All';
    }
        languageHTML.innerHTML = `
            <input id="language${i}" name="language" class="language-btn" value="${i === 0 ? '' : language}" type="radio" ${i === 0 ? 'checked' : ''}>
            <label for="language${i}">${i === 0 ? 'All' : language}</label>
            `;
    
        languageDiv.appendChild(languageHTML);
        i++;
    })
    
    // Loading Various Format Options 
    i = 0;
    let formatDiv = document.getElementById('formatOptions');
    formatList.forEach((format)=> {
        let formatHTML = document.createElement('div');
        formatHTML.className = "option";
        if(i === 0 ) {
        formatChecked = 'checked';
        formatValue = 'All';
    }
        formatHTML.innerHTML = `
            <input id="format${i}" name="format" class="format-btn" value="${i === 0 ? '' : format}" type="radio" ${i === 0 ? 'checked' : ''}>
            <label for="format${i}">${i === 0 ? 'All' : format}</label>
            `;
    
        formatDiv.appendChild(formatHTML);
        i++;
    })
    
    // Loading Genre Button Dynamically
    i = 0;
    let genreDiv = document.getElementById('genreOptions');
    genreList.forEach((genre)=> {
        genreHTML = document.createElement('div');
        genreHTML.className = "option";
        let genreChecked, genreValue = '';
        if(i === 0 ) {
        genreChecked = 'checked';
        genreValue = 'All';
    }
        genreHTML.innerHTML = `
            <input id="genre${i}" name="genre" class="genre-btn" value="${i === 0 ? '' : genre}" type="radio" ${i === 0 ? 'checked' : ''}>
            <label for="genre${i}">${i === 0 ? 'All' : genre}</label>
            `;
    
        genreDiv.appendChild(genreHTML);
        i++;
    })
    
    let languageButton = document.querySelectorAll('.language-btn');
    let formatButtons = document.querySelectorAll('.format-btn');
    let genreButtons = document.querySelectorAll('.genre-btn');
    
    // Sorter
    function filterMovies() {
        const selectedLanguage = document.querySelector('.language-btn:checked')?.value || '';
        const selectedFormat = document.querySelector('.format-btn:checked')?.value || '';
        const selectedGenre = document.querySelector('.genre-btn:checked')?.value || '';
    
        moviesDiv.innerHTML = '';
        let movieFound = false;
    
        movies.forEach((movie) => {
            const languageMatch = selectedLanguage === '' || movie.language.includes(selectedLanguage);
            const formatMatch = selectedFormat === '' || movie.format.includes(selectedFormat);
            const genreMatch = selectedGenre === '' || movie.genre.includes(selectedGenre);
    
            if (languageMatch && formatMatch && genreMatch) {
                loadMovie(movie);
                movieFound = true;
            }
        });
        if(movieFound) {
            showToast('success')
        } else {
            showToast('error');
        }
    }
    
    
    
    // Sorter Caller !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    languageButton.forEach((btn) => btn.addEventListener('change', filterMovies));
    formatButtons.forEach((btn) => btn.addEventListener('change', filterMovies));
    genreButtons.forEach((btn) => btn.addEventListener('change', filterMovies));
    
    // Movie Info Sender
    let selectedMovieName = '';
    let selectedMovieLang = '';
    moviesDiv.addEventListener('click', (event) => {
        const movieElement = event.target.closest('.movie');
        if (movieElement) {
            selectedMovieName = movieElement.querySelector('h1').innerText;
            window.location.href = `movieInfo.html?movie=${encodeURIComponent(selectedMovieName)}`;
        }
    });
    
    // Reset Button
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', () => {
        document.getElementById('language0').checked = true;
        document.getElementById('genre0').checked = true;
        document.getElementById('format0').checked = true;
        filterMovies();
    });
    
    
    // Search Functionality
    let searchButton = document.getElementById('search-query');
    searchButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let MovieName = searchButton.value.toLowerCase();
            let movieFound = false;
            if(MovieName.length !== 0) {
            movies.forEach((movie) => {
                if (MovieName === movie.name.toLowerCase() || movie.name.toLowerCase().includes(MovieName) && MovieName.length > 1) {
                    moviesDiv.innerHTML = '';
                    loadMovie(movie);
                    movieFound = true;
                    showToast('success')
                }
            });
                if (!movieFound) {
                    showToast('error');
                }
            };
        }
    });
    
    
    // Search Cancel Button
    searchButton.addEventListener('input', function(e) {
        if (this.value === '') {
            filterMovies();
        }
    });
    
    
    // Toast Functionality
    function showToast(type) {
        let toast;
        if (type === 'success') {
            toast = document.getElementById("toast");
        } else if (type === 'error') {
            toast = document.getElementById("error-toast");
        }
        toast.className = "toast show";
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
    
    document.getElementById('close-btn').addEventListener("click", () => {
        let toast = document.getElementById("toast");
        toast.className = toast.className.replace("show", "");
    });
    
    document.querySelector('.error__close').addEventListener("click", () => {
        let toast = document.getElementById("error-toast");
        toast.className = toast.className.replace("show", "");
    });
}