/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUserStories } = require('../queries');


router.get("/:id/stories", (req, res) => {
  const id = req.params.id


  getUserStories(id)
    .then((stories) => {
      console.log(stories)
      res.json({stories});
    })
    .catch(err => {
      console.log(err)
    });
});



module.exports = router;
