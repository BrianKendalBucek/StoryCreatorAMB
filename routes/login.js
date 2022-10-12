const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.post('/', (req, res) => {
  const user = req.body.user
  if (!user) return
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

