const express = require('express');
const router  = express.Router();
const { getUser } = require('../queries')


router.post('/', (req, res) => {
  const username = req.body.username
  if (!username) return

  getUser(username)
  .then((response) => {
    const id = response[0].id


    res.json({ id })
   })
});

module.exports = router;

