const router = require('express').Router();
let Offer = require('../models/Offer.js');

// get all offers in collection
router.route('/').get((req, res) => {
    Offer.find({})
        .then((result) => res.send(result))
        .catch((e) => res.status(400).json('Error: ' + e));
});

// get all offers related to a user
router.route('/user/:id').get((req, res) => {
    //task: change string type to Object
    // let user = Offer.findById( req.params.id);
    Offer.find({$or: [{from: req.params.id},{to: req.params.id}]})
        .then((result) => res.send(result))
        .catch((e) => res.status(400).json('Error: ' + e));
});

// get one offer by id
router.route('/:id').get((req, res) => {
    Offer.findById(req.params.id)
        .then((item) => res.send(item))
        .catch((e) => res.status(400).json('Error: ' + e));
});

// update an offer
router.route('/:id').put((req, res) => {
    Offer.findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then((item) => res.send(item))
        .catch((e) => res.status(400).json('Error: ' + e));
});


// post a new offer
router.route('/').post((req, res) => {
    const newOffer = new Offer(req.body);
    newOffer.save()
        .then((q) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(q);
        })
        .catch((e) => res.status(400).json('Error: ' + e));
});

module.exports = router;