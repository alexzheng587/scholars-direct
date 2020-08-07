const router = require('express').Router();
let Question = require('../models/Question');

router.route('/').get((req, res) => {
    Question.find()
        .then((questions) => res.send(questions))
        .catch((e) => res.status(400).json('Error: ' + e));
});

router.route('/').post((req, res) => {
    const title = req.body.title;
    const username = req.body.username;
    const description = req.body.description;
    const time = req.body.time;
    const status = req.body.status;
    const tags = req.body.tags;
    const newQuestion = new Question({
        title,
        username,
        description,
        time,
        status,
        tags
    });
    newQuestion.save()
        .then((q) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(q);
        })
        .catch((e) => res.status(400).json('Error: ' + e));
});

router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(() => res.json('Message deleted successfully!'))
        .catch((e) => res.status(400).json('Error: ' + e));
});

module.exports = router;