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

      const { stories } = response
      renderStories(stories)
    })

});


const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createStoryElement = function ({ username, title, content, completed, votes, created  }) {
  const htmlElement = `
    <article class="story">
    <header>
    <span>
    <span>${escapeText(title)} by ${escapeText(username)}</span>
    </span>
    </header>
    <p class="story-content">${escapeText(content)}</p>
    <footer>
    <span>${created}</span>
    <span>
    Votes ${votes}
    </span>
    <span>
    Completed ${completed}
    </span>
    </footer>
    </article>
    `
  return htmlElement;
}


const renderStories = function (stories) {
  console.log(stories)
  const $storiesContainer = $(`.stories-container`)
  $storiesContainer.html("")
  for (const story of stories) {
    const $story = createStoryElement(story);
    $storiesContainer.prepend($story);
  }

}
