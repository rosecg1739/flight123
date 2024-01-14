const Ticket = require('../models/ticket');

module.exports = {
  delete(req, res) {
    Ticket.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('back');
    });
  },

};