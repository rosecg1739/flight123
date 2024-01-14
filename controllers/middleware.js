router.get('/flights/new', (req, res) => {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
  });

  router.get('/flights', (req, res) => {
    Flight.find({}).sort('departs').exec((err, flights) => {
      res.render('flights/index', { flights });
    });
  });

  router.get('/flights/:id', (req, res) => {
    Flight.findById(req.params.id, (err, flight) => {
      res.render('flights/show', { flight });
    });
  });
  
  router.post('/flights/:id/destinations', (req, res) => {
    Flight.findById(req.params.id, (err, flight) => {
      flight.destinations.push(req.body);
      flight.save(err => {
        res.redirect(`/flights/${flight._id}`);
      });
    });
  });