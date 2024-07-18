// Define a structure to hold seat reservations including time slots
let seats = [
    { available: true, reservation: null },
    { available: true, reservation: null },
    { available: true, reservation: null },
    { available: true, reservation: null },
    { available: true, reservation: null },
    { available: true, reservation: null }
];

// Function to update the seats display based on availability
function updateSeatsDisplay() {
    const seatsDiv = document.getElementById('seats');
    seatsDiv.innerHTML = ''; // Clear existing seats

    seats.forEach((seat, index) => {
        const seatElement = document.createElement('div');
        seatElement.className = seat.available ? 'seat' : 'seat reserved';
        seatElement.textContent = seat.available ? 'Seat ' + (index + 1) : 'Reserved';
        seatElement.onclick = () => {
            if (seat.available) {
                // Prompt user to select a specific time after choosing a seat
                showTimeSelection(index);
            } else {
                cancelReservation(index);
                seatElement.className = 'seat';
                seatElement.textContent = 'Seat ' + (index + 1);
            }
        };
        seatsDiv.appendChild(seatElement);
    });
}

// Function to show time selection options after selecting a seat
function showTimeSelection(seatIndex) {
    const timeDropdown = document.createElement('select');
    timeDropdown.className = 'time-dropdown';
    timeDropdown.innerHTML = `
        <option value="09:00">09:00 AM</option>
        <option value="12:00">12:00 PM</option>
        <option value="15:00">03:00 PM</option>
        <option value="18:00">06:00 PM</option>
        <option value="21:00">09:00 PM</option>
    `;
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.onclick = () => {
        const selectedTime = timeDropdown.value;
        if (selectedTime) {
            makeReservation("Guest", seatIndex, selectedTime); // Replace "Guest" with actual guest name input
            sendReservationToBackend("Guest", seatIndex, selectedTime); // Send reservation data to backend
            updateSeatsDisplay(); // Update seats display after reservation
            document.body.removeChild(timeDropdown); // Remove dropdown after reservation
            document.body.removeChild(confirmButton); // Remove confirm button after reservation
        }
    };

    document.body.appendChild(timeDropdown);
    document.body.appendChild(confirmButton);
}

// Function to make a reservation (local frontend storage)
function makeReservation(name, seatIndex, timeSlot) {
    seats[seatIndex].available = false;
    seats[seatIndex].reservation = {
        name: name,
        timeSlot: timeSlot
    };
    console.log(`Reservation successful! ${name} has reserved Seat ${seatIndex + 1} at ${timeSlot}.`);
}

// Function to cancel a reservation (local frontend storage)
function cancelReservation(seatIndex) {
    seats[seatIndex].available = true;
    seats[seatIndex].reservation = null;
    console.log(`Reservation for Seat ${seatIndex + 1} cancelled.`);
}

// Function to send reservation data to backend server
function sendReservationToBackend(name, seatIndex, timeSlot) {
    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            seatIndex: seatIndex,
            timeSlot: timeSlot
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send reservation data to backend.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Reservation sent to backend:', data);
    })
    .catch(error => {
        console.error('Error sending reservation data to backend:', error);
    });
}

// Initial update of seats display
updateSeatsDisplay();
