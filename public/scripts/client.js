const mockStories = [
  {
    username: 'ana',
    title: 'hi',
    text: 'asjdfkhasdfjs lkdfjlskdjflksdflksdfkdfl',
  }
]

$(() => {
  const $logout = $('#logout');
  const $login = $('#login');
  const $createButton = $('header .create');
  const $storyForm = $('main #story-form');
  const $cancelButton = $storyForm.find('.cancel');
  const $storyContainer = $('main .story-container');
  const $submitButton = $storyForm.find('.submit');
  let userId = '';

  $logout.on('click', () => {
    $logout.hide();
    $login.show();
  })

  $login.on('submit', (event) => {
    event.preventDefault();

    const $input = $login.find('input');
    const username = $input.val();

    $.post('/login', { username })
      .then((response) => {

         userId = response.id


        $login.hide();
        $logout.show();
        $input.val('');
        return $.get(`/users/${userId}/stories`)
      })
      .then((response) => {
        console.log(response)
        renderStories(response)

      })
      .catch((error) => {
        console.log("Failure");
      })
  });

  $createButton.on('click', () => {
    $storyForm.show();
    $storyContainer.hide();
  })

  $cancelButton.on('click', () => {
    $storyForm.hide();
    $storyContainer.show();
  })

  $storyForm.on('submit', (event) => {
    event.preventDefault();
    const $titleInput = $storyForm.find('input.title');
    const $bodyInput = $storyForm.find('input.body');
    const storyTitle = $titleInput.val();
    const storyBody = $bodyInput.val();

    console.log(userId)
    $.post('/stories', { storyTitle, storyBody, userId })
      .then((response) => {




        $login.hide();
        $logout.show();
        $input.val('');
        return $.get(`/users/${id}/stories`)
      })

      .catch((error) => {
        console.log("Failure");
      })
  });



  $.get('/stories')
    .then((response) => {
      renderStories(mockStories)
    })

});


const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createStoryElement = function ({ username, title, text }) {
  const timestamp = 'tuesday'
  const htmlElement = `
    <article class="story">
    <header>
    <span>
    <span>${title}</span>
    </span>
    <span>${username}</span>
    </header>
    <p>${escapeText(text)}</p>
    <footer>
    <span>${timestamp}</span>
    <span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </span>
    </footer>
    </article>
    `
  return htmlElement;
}


const renderStories = function (stories) {
  const $storiesContainer = $(`#stories-container`)
  $storiesContainer.html("")
  for (const story of stories) {
    const $story = createStoryElement(story);
    $storiesContainer.prepend($story);
  }

}
