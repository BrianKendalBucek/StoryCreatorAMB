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
  const $createStory = $('header .create');
  const $myProfile = $('header .profile')
  const $storyForm = $('main .story-form');
  const $cancelButton = $storyForm.find('.cancel');
  const $storyContainer = $('main .story-container');
  let userId = '';
  const $intro = $('header .intro');
  const $slogan = $('header #slogan');


  $logout.on('click', () => {
    $logout.hide();
    $login.show();
    $myProfile.hide();
    $intro.removeClass('hidden');
    $slogan.addClass('hidden');
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
        $myProfile.show();
        $createStory.show();
        $intro.addClass('hidden');
        $slogan.removeClass('hidden');
        return $.get(`/users/${userId}/stories`)
      })
      .then(({ stories }) => {
        renderStories(stories)

      })
      .catch((error) => {
        console.log("Failure");
      })
  });

  $createStory.on('click', () => {
    $storyForm.removeClass('hidden');
    $storyContainer.hide();
  })

  $cancelButton.on('click', () => {
    $storyForm.addClass('hidden');
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
    Completed ${completed}
    </span>
    <div class="thumbs-container">
    <span>
    <span>
    Votes ${votes}
    </span>
          <i class="fa-regular fa-thumbs-up"></i>
          <i class="fa-regular fa-thumbs-down"></i>
        </span>
      </div>
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
