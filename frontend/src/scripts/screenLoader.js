let cinemaInfo = document.getElementById('showCinemaInfo');
let dayInfo = document.getElementById('showDayInfo');
let dateInfo = document.getElementById('showDateInfo');
let movieInfo = document.getElementById('movieInfo');
let timeInfo = document.getElementById('showTimeInfo');

const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('movie'); 
const movieLang = urlParams.get('lang');

movieInfo.innerHTML = movieName + ' • ' + movieLang;

cinemaInfo.textContent = "Cineflix Director's Cuts, Near Bannerghatta Road, Bengaluru";

let seats = document.querySelector(".all-seats");
const totalSeats = 240;
const halfseats = totalSeats / 2;
let ticketPrice = 700;
const rows = 20; // Number of seats in each row
const columns = Math.ceil(totalSeats / rows); // Calculate total columns to fit all seats
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (let col = 1; col <= columns; col++) {
    let alpha = alphabet[col - 1];
    seats.insertAdjacentHTML(
        "beforeend",
        `<label class="seatAlpha">${alpha}</label>`
    );
    for (let row = 1; row <= rows; row++) {
        let seatLabel = row;
        let seatId = `${row}`;
        let randint = Math.floor(Math.random() * 2);
        let booked = randint === 1 ? "booked" : "";
        if (row === 11) {
            seats.insertAdjacentHTML("beforeend", `<label style="grid-column: span 1"></label>`);
        }
        seats.insertAdjacentHTML(
            "beforeend",
            `<input type="checkbox" value="${ticketPrice}" name="tickets" id="${alpha}${seatId}" />
             <label for="${alpha}${seatId}" class="seat ${booked}">${seatLabel}</label>`
        );
    }
    if (col == 2) {
        seats.insertAdjacentHTML("beforeend", `<span style="grid-column: span 21;position: relative; bottom: -10px">Rs. 500 Premium </span><div class="hr-divider"></div>`);
        ticketPrice = 500;
    }
    if (col === Math.ceil(columns / 2)) {
        seats.insertAdjacentHTML("beforeend", `<span style="grid-column: span 21;position: relative; bottom: -10px">Rs. 300 Executive </span><div class="hr-divider"></div>`);
        ticketPrice = 300;
    }
    if (col === (columns - 3)) {
        seats.insertAdjacentHTML("beforeend", `<span style="grid-column: span 21;position: relative; bottom: -10px">Rs. 250 Normal </span><div class="hr-divider"></div>`);
        ticketPrice = 250;
    }
}

let bookedSeats = document.querySelectorAll('.seat.booked');
bookedSeats.forEach(seat => {
    seat.addEventListener('click', (event) => {
        event.preventDefault();
    });
});

let tickets = seats.querySelectorAll("input");
let ticketsBooked = [];
let amount = document.querySelector(".amount").innerHTML;
let count = document.querySelector(".count").innerHTML;
document.getElementById('seatsBooked').innerHTML = 'Seats:' + ticketsBooked.join(', ');
tickets.forEach((ticket) => {
    ticket.addEventListener("change", (event) => {
        let seatLabel = event.target.nextElementSibling;
        if (seatLabel.classList.contains('booked')) {
            event.preventDefault();
            return;
        }

        amount = Number(amount);
        count = Number(count);

        if (count === 10 && ticket.checked) {
            alert('10 is the limit');
            event.preventDefault();
            ticket.checked = false;
            return;
        }

        if (ticket.checked) {
            count += 1;
            amount += Number(ticket.value);
            ticketsBooked.push(ticket.id);
        } else {
            count -= 1;
            amount -= Number(ticket.value);
            ticketsBooked = ticketsBooked.filter(id => id !== ticket.id);
        }

        document.getElementById('seatsBooked').innerHTML = 'Seats: ' + ticketsBooked.join(', ');
        document.querySelector(".amount").innerHTML = amount;
        document.querySelector(".count").innerHTML = count;
    });
});

function updateDates() {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const datesContainer = document.getElementById('dates-container');

    // Clear existing dates
    datesContainer.innerHTML = '';

    // Add dates for the next 20 days
    for (let i = 0; i < 20; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Incrementing The Date Daily as i Increases

        const day = days[date.getDay()]; // Taking the Day From Days Array
        const dateNumber = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'date';
        input.id = `d${i + 1}`;
        if (i === 0) input.checked = true;
        if (i > 8) {
            input.disabled = true;
            input.classList.add('disabled');
        }

        const label = document.createElement('label');
        label.className = 'dates-item';
        label.htmlFor = `d${i + 1}`;
        if (i > 8) label.classList.add('disabled');

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;
        if (i > 8) dayDiv.classList.add('disabled');

        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.innerText = dateNumber;
        if (i > 8) dateDiv.classList.add('disabled');

        label.appendChild(dayDiv);
        label.appendChild(dateDiv);

        if(i === 0 ) {
            dateInfo.textContent = `${day}, ${month} ${dateNumber}`;
        }

        datesContainer.appendChild(input);
        datesContainer.appendChild(label);
        

        // Add event listener to update dateInfo and dayInfo
        input.addEventListener('change', () => {
            dateInfo.textContent = `${day}, ${month} ${dateNumber}`;
            if (i === 0) {
                dayInfo.textContent = 'Today,';
            } else if (i === 1) {
                dayInfo.textContent = 'Tomorrow,';
            } else {
                dayInfo.textContent = '';
            }
        });
    }
}

// Function to update the times based on the system time with random increments
function updateTimes() {
    const timesContainer = document.getElementById('times-container');
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0); // Start time at 9:00 AM

    // Clear existing times
    timesContainer.innerHTML = '';

    // Array to store time slots
    const timeSlots = [];

    // Add time slots with random increments of 15, 30, or 45 minutes
    for (let i = 0; i < 18; i++) {
        const time = new Date(startTime);
        const increments = [15, 30, 45];
        const randomIncrement = increments[Math.floor(Math.random() * increments.length)];
        time.setMinutes(startTime.getMinutes() + i * randomIncrement);
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        timeSlots.push(timeString);
    }

    // Sort time slots in ascending order
    timeSlots.sort();

    // Add sorted time slots to the container
    timeSlots.forEach((timeString, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'time';
        input.id = `t${index + 1}`;
        if (index === 0) input.checked = true;

        const label = document.createElement('label');
        label.className = 'time';
        label.htmlFor = `t${index + 1}`;
        label.innerText = timeString;
        
        if(index === 0) {
            timeInfo.textContent = timeString;
        }

        timesContainer.appendChild(input);
        timesContainer.appendChild(label);

        input.addEventListener('change', () => {
          timeInfo.textContent = timeString;
      });
    });
}

// Call the functions to update the dates and times
updateDates();
updateTimes();

// go to ticket page
const bookButton = document.getElementById('book');
bookButton.addEventListener('click', () => {
            window.location.href = `ticket.html?movie=${encodeURIComponent(movieName)}&lang=${encodeURIComponent(movieLang)}&seats=${encodeURIComponent(ticketsBooked)}&price=${encodeURIComponent(document.querySelector(".amount").innerHTML)}&time=${encodeURIComponent(timeInfo.textContent)}&day=${encodeURIComponent(dateInfo.textContent)}`;
});