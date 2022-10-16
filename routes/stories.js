const express = require('express');
const router  = express.Router();
const userQueries = require('../queries');

router.get('/', (req, res) => {


  userQueries.getStories()
    .then(stories => {
      res.json( stories );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/new', (req, res) => {

})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

module.exports = router;

