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
                // Simulate a time reservation by selecting a time slot (e.g., morning, afternoon, evening)
                const timeSlot = prompt(`Select a time slot for Seat ${index + 1} (e.g., morning, afternoon, evening):`);
                if (timeSlot) {
                    makeReservation("Guest", index, timeSlot); // Replace "Guest" with actual guest name input
                    seatElement.className = 'seat reserved';
                    seatElement.textContent = `Reserved (${timeSlot})`;
                }
            } else {
                cancelReservation(index);
                seatElement.className = 'seat';
                seatElement.textContent = 'Seat ' + (index + 1);
            }
        };
        seatsDiv.appendChild(seatElement);
    });
}

// Function to make a reservation
function makeReservation(name, seatIndex, timeSlot) {
    seats[seatIndex].available = false;
    seats[seatIndex].reservation = {
        name: name,
        timeSlot: timeSlot
    };
    console.log(`Reservation successful! ${name} has reserved Seat ${seatIndex + 1} (${timeSlot}).`);
    updateSeatsDisplay();
}

// Function to cancel a reservation
function cancelReservation(seatIndex) {
    seats[seatIndex].available = true;
    seats[seatIndex].reservation = null;
    console.log(`Reservation for Seat ${seatIndex + 1} cancelled.`);
    updateSeatsDisplay();
}

// Initial update of seats display
updateSeatsDisplay();
