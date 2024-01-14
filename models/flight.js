const mongoose = require('mongoose');
const Flight = require('./flight');
const Ticket = require('../models/ticket');

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  }
});

module.exports = {
  show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
      if (err) {
        console.log(err);
        res.redirect(`/flights`);
      } else {
        Ticket.find({flight: flight._id}, function(err, tickets) {
          if (err) {
            console.log(err);
          } else {
            res.render('flights/show', { flight, tickets });
          }
        });
      }
    });
  },
};


module.exports = mongoose.model('Ticket', ticketSchema);
