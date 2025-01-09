// Initialize the map with default options
// Do not Modify
const mapOptions = {
    center: [12.933013, 77.606309],
    zoom: 15,
};
const map = L.map('map', mapOptions);

// Add the base tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '©OpenStreetMap',
}).addTo(map);



// Define custom icons for markers
// Main Icon of the Website
const customIcon = L.icon({
    iconUrl: "../Images/Logos/1080x500logo.svg",
    iconSize: [120, 120],
});

// Image Icon for the User, it maybe your face or any other pic of the user profile
const customIcon2 = L.icon({
    iconUrl: "../Images/Avatar.jpg",
    iconSize: [20, 20],
});


// Add static locations with interactive markers and popups
// Follow the same pattern for all the loc
const locations = [
    {
        id: 1,
        lat: 12.907968,
        long: 77.601305 ,
        src: '../Images/Logos/1080x500logo.svg',
        title: "CINEFLIX Cinemas",
        url: "index.html",
    },
];


// Inbuilt operations, Dont Modify
const popupOptions = {
    closeButton: false,
};

// Iterate through the locations and add markers
locations.forEach((location) => {
    L.marker([location.lat, location.long], { icon: customIcon })
        .addTo(map)
        .on('mouseover', (event) => {
            event.target
                .bindPopup(
                    `<div class="card">
                        <img src="${location.src}" width="180" height="80" alt="${location.title}">
                        <h3>${location.title}</h3>
                    </div>`,
                    popupOptions
                )
                .openPopup();
        })
        .on('mouseout', (event) => {
            event.target.closePopup();
        })
        .on('click', () => {
            if (location.url) {
                window.open(location.url);
            }
        });
});

// Handle user geolocation
let marker, circle, isZoomed = false;

navigator.geolocation.watchPosition(onLocationFound, onLocationError); // onLocationFound is called when the geolocation works perfectly, or else onLocationError Function will be called;


// Function called when geolocation is successful
function onLocationFound(position) {
    const { latitude: lat, longitude: lng, accuracy } = position.coords;

    // Remove existing marker and circle
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    // Add a new marker and circle to show user's location
    marker = L.marker([lat, lng], { icon: customIcon2 }).addTo(map);
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    // Bind a popup to the user's location marker
    // Add the username
    marker.bindPopup("Sridhar N").openPopup();

    // Add a popup for user's location
    L.popup()
        .setLatLng([lat, lng])
        .setContent("<p>You are here</p>")
        .openOn(map);

    // Fit the map view to the user's accuracy circle
    if (!isZoomed) {
        isZoomed = true;
        map.fitBounds(circle.getBounds());
    }

    // Center the map on the user's location
    map.setView([lat, lng], 15); // Adjust the zoom level as needed
}

// Function called when geolocation fails
function onLocationError(error) {
    if (error.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }
}