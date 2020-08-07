const express = require('express');
const router = express.Router();
const { generateToken, sendToken } = require('../utils/TokenUtil');
const passport = require('passport');
const Google = require("../models/Google");

router.post('/', passport.authenticate('google-token', { session: false }), function (req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    console.log(req.user)
    req.auth = {
        id: req.user.id
    };

    next();
}, generateToken, sendToken);

router.get('/:id', (req, res) => {
    Google.findById(req.params.id)
        .then((item) => res.send(item))
        .catch((e) => res.status(400).json('Error: ' + e));
});

router.put('/:id', (req, res) => {
    Google.findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then((item) => res.send(item))
        .catch((e) => res.status(400).json('Error: ' + e));
});

module.exports = router;