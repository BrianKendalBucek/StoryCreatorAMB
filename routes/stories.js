const express = require('express');
const router  = express.Router();
const userQueries = require('../queries');

router.get('/', (req, res) => {


  userQueries.getStories()
    .then(stories => {
      res.json({ stories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
