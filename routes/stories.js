const express = require('express');
const router  = express.Router();
  const { getUser, getStories, getUserStories, createStory, updateStory } = require('../queries');


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
  let story = { title: storyTitle, content: storyBody, author_id: userId }
  createStory(story)
    .then(response => {
      res.json( {response} );
    })
})

router.post('/:id', (req, res) => {
  updateStory(req.params.id)

  .then(story => {
    console.log('hi')
    res.json({ story })
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;

