const movies = [{
    name: "Leo",
    image_loc: "Leo.jpg",
    language: "Tamil, Telugu, Hindi, Kannada, Malayalam",
    format: "IMAX 2D, 2D",
    genre: "Action, Crime, Drama, Thriller"
},
{
    name: "Lucky Bhaskar",
    image_loc: "LuckyBhaskar.jpg",
    language: "Telugu, Malayalam, Tamil, Hindi",
    format: "2D",
    genre: "Crime, Drama, Thriller"
},
{
    name: "Transformer One",
    image_loc: "TransformerOne.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Animation, Action, Adventure, Fantasy, Sci-Fi"
},
{
    name: "Minecraft",
    image_loc: "Minecraft.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Animation, Adventure, Fantasy",
},
{
    name: "Pacific Rim",
    image_loc: "PacificRim.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Action, Adventure, Sci-Fi",
},
{
    name: "Amaran",
    image_loc: "Amaran.jpg",
    language: "Tamil",
    format: "2D",
    genre: "Action, Biography, Drama, War"
},
{
    name: "Interstellar",
    image_loc: "Interstellar.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Adventure, Drama, Sci-Fi"
},
{
    name: "Aavesham",
    image_loc: "Aavesham.jpg",
    language: "Malayalam",
    format: "2D",
    genre: "Action, Comedy"
},
{   name: "KGF Chapter 2", 
    image_loc: "KGFChapter2.jpg", 
    language: "Kannada, Tamil, Hindi, Telugu, Malayalam", 
    format: "2D", 
    genre: "Action, Drama" 
}, 
{   
    name: "Avengers Endgame",
    image_loc: "AvengersEndgame.jpg",
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Drama, Sci-Fi" 
}, 
{ 
    name: "Godzilla x Kong: The New Empire", 
    image_loc: "GodzillaxKong.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Sci-Fi" 
}, 
{ name: "Avatar: The Way of Water", 
    image_loc: "Avatar2.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Fantasy, Sci-Fi" 
}, 
{ 
    name: "Cars 3", 
    image_loc: "Cars3.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Comedy, Sport" 
}, 
{ 
    name: "Mission Impossible", 
    image_loc: "MissionImpossible.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Thriller" 
}, 
{ 
    name: "The Wild Robot", 
    image_loc: "WildRobot.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Sci-Fi" 
}, 
{ 
    name: "Mufasa: The Lion King", 
    image_loc: "Mufasa.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Drama" 
}, 
{ 
    name: "Manjummel Boys", 
    image_loc: "ManjummelBoys.jpg", 
    language: "Malayalam", 
    format: "2D", 
    genre: "Comedy, Drama" 
}, 
{ 
    name: "Soorarai Potru", 
    image_loc: "SooraraiPotru.jpg", 
    language: "Tamil", 
    format: "2D", 
    genre: "Biography, Drama" 
}, 
{ 
    name: "Kingdom of the Planet of the Apes", 
    image_loc: "KingdomOfApes.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Drama, Sci-Fi" 
}, 
{ 
    name: "Dune: Part Two", 
    image_loc: "Dune.jpg", 
    language: "English", 
    format: "IMAX 2D, 4DX, 2D", 
    genre: "Adventure, Drama, Sci-Fi" 
},
{
    name: "Alien: Romulus",
    image_loc: "AlienRomulus.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Horror, Sci-Fi, Thriller"
},
{
    name: "Wicked",
    image_loc: "Wicked.jpg",
    language: "English",
    format: "2D",
    genre: "Fantasy, Romance"
},
{
    name: "Ponniyin Selvan: Part Two",
    image_loc: "PS2.jpg",
    language: "Tamil, Hindi, Kannada, Telugu, Malayalam",
    format: "IMAX 2D, 2D",
    genre: "Action, Adevnture, History, Drama"
},
{
    name: "Bullet Train",
    image_loc: "BulletTrain.jpg",
    language: "English",
    format: "IMAX 3D",
    genre: "Action, Comedy, Thriller"
},
{
    name: "How to Train Your Dragon",
    image_loc: "Dragon.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 3D",
    genre: "Action, Adventure, Comedy, Drama, Fantasy"
},
{
    name: "Gladiador II",
    image_loc: "Gladiador.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Action, Adventure, Drama"
},
{
    name: "Oppenheimer",
    image_loc: "Oppenheimer.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Biography, Drama, History",
}
]



    const urlParams = new URLSearchParams(window.location.search);
    const movieName = urlParams.get('movie'); 
    const movieLanguage = urlParams.get('lang');
    const moviePrice = urlParams.get('price');
    const movieSeats = urlParams.get('seats');
    const movieTime = urlParams.get('time');
    const movieDay = urlParams.get('day');
    const movieYear = new Date().getFullYear();
    let movieImageLoc;
    let movieGenre;
    const movieDays = movieDay.split(',');

    movies.forEach(movie => {
       if (movie.name.toLowerCase() === movieName.toLowerCase()) {
        movieImageLoc = movie.image_loc;
        let movieGenres = movie.genre;
        movieGenre = movieGenres.split(",");
        movieGenre = movieGenre.join(" • ");
       }
    })

	const ticket = document.getElementById('ticket');
	const randomNo = Math.round(Math.random() * 100000000);
    const randomScreen = Math.round(Math.random() * 20);

	const ticketHTML = `
    <div class="left">
        <div class="image" id="image">
            <div class="ticket-number">
                <p>
                    #${randomNo}
                </p>
            </div>
        </div>
        <div class="ticket-info">
            <p class="date">
                <span>${movieDays[0]}</span>
                <span class="date-info">${movieDays[1]}</span>
                <span>${movieYear}</span>
            </p>
            <div class="show-name">
                <h1>${movieName} • ${movieLanguage}</h1>
                <p>${movieGenre}</p>
            </div>
            <div class="time main-time">
                <p>TIME<span>: </span> ${movieTime}</p>
                <p>SEAT NO<span>: </span> ${movieSeats}</p>
                <p>SCREEN <span>: </span> ${randomScreen}</p>
            </div>
            <p class="location"><span>Cineflix Director's Cuts</span>
                <span class="separator"><i class="far fa-smile"></i></span><span>Bannerghatta Road, Bengaluru</span>    
            </p>
        </div>
    </div>
    <div class="right">
        <div class="right-info-container">
            <p class="cineflix">
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
            </p>
            <div class="show-name">
                <h1>IMAX 2D</h1>
            </div>
            <div class="time">
                <p>Price<span>: </span> ₹${moviePrice}</p>
                <p>SCAN THE QR FOR SHOW INFO</p>
            </div>
            <div class="barcode">
                <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code">
            </div>
            <p class="ticket-number">
                #${randomNo}
            </p>
        </div>
    </div>
	`;
	ticket.innerHTML = ticketHTML; 


    const element = document.getElementById('image');
    element.style.backgroundImage = `url('./MovieBanner/${movieImageLoc}')`;


    	
    // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname; 
    // window.history.replaceState({}, '', newUrl);

    const canvas = document.getElementById('ticketCanvas');
    const ctx = canvas.getContext('2d');
    const downloadButton = document.getElementById('downloadButton');

    canvas.width = 800;
    canvas.height = 400;

    const renderTicket = () => {
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Image Section
        const img = new Image();
        img.src = `./MovieBanner/${movieImageLoc}`; 
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 250, canvas.height);

            // Text Details
            ctx.fillStyle = '#000';
            ctx.font = '24px Poppins';
            ctx.fillText('Cineflix Cinemas', 280, 50);
            ctx.fillText(`#${randomNo}`, 600, 50);
            ctx.fillText(`Movie: ${movieName}`, 280, 100);
            ctx.fillText(`Seat: ${movieSeats}`, 280, 150);
            ctx.fillText(`Price: ${moviePrice}`, 280, 200);
            ctx.fillText(`Screen: ${randomScreen}`, 280, 250);
            ctx.fillText(`Time: ${movieTime}`, 280, 300);
            ctx.fillText(`Date: ${movieDay}`, 280, 350);
        };
    };

    renderTicket();

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'movie_ticket.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });