const express = require('express');
const router = express.Router(); // Define router
const app = express();
const port = 3000;

// Require the tickets controller
const ticketsCtrl = require('./controllers/tickets');

// New flight route
router.get('/flights/new', (req, res) => {
    res.render('flights/new');
});

// Create flight route
router.post('/flights', (req, res) => {
    Flight.create(req.body.flight, (err, newFlight) => {
        res.redirect('/flights');
    });
});

router.post('/', ticketsCtrl.create);

app.use('/', router); // Use router in your app

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = router;