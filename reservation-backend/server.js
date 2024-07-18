const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let reservations = [];

// Endpoint to receive reservation data from frontend
app.post('/api/reservations', (req, res) => {
    const reservation = req.body;
    reservations.push(reservation);
    console.log('New Reservation:', reservation);
    res.status(201).send('Reservation received.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
