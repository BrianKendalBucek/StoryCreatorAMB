const express = require('express');
const router  = express.Router();
  const { getUser, getStories, getUserStories } = require('../queries');


router.get('/', (req, res) => {


  getStories()
    .then(stories => {
      console.log(stories)
      res.json( { stories } );
    })
    .catch(err => {
     console.log(err)
    });
});



router.get('/new', (req, res) => {

})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
  const { storyTitle, storyBody, userId} = req.body;

  createStory()
  .then(response => {

  })



})

module.exports = router;

