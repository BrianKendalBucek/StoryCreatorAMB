const express = require('express');
const router  = express.Router();
const { getUser } = require('../queries')

router('/:id/votes', (req, res) => {
  addVote()
    .then(() => {
      return getVotes();
    })
})

module.exorts = router;

