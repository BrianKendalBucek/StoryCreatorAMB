const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.post('/', (req, res) => {
  const username = req.body.username
  console.log(req.body)
  if (!username) return res.sendStatus(404)
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

