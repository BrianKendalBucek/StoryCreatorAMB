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
  const $storiesContainer = $('main .stories-container');
  const $intro = $('header .intro');
  const $slogan = $('header #slogan');
  const $logo = $('header .shorties-link');
  let userId = '';


  $logout.on('click', () => {
    $logout.hide();
    $login.show();
    $myProfile.hide();
    $createStory.hide();
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
        return renderUserStories(userId);

      })
      .catch((error) => {
        console.log("Failure");
      })
  });

  $logo.on('click', () => {
    renderAllStories();
    $storyForm.addClass('hidden');
  })

  $myProfile.on('click', () => {
    renderUserStories(userId);
    $storyForm.addClass('hidden');
  })

  $createStory.on('click', () => {
    $storyForm.removeClass('hidden');
    $storiesContainer.hide();
  })

  $cancelButton.on('click', () => {
    $storyForm.addClass('hidden');
    $storiesContainer.show();
  })

  $storiesContainer.on('click', '.story header', function(event)  {
    console.log('hi')
    const $thisStory = $(this).closest('.story')
    console.log($thisStory)
    $storiesContainer.find('.story').hide()
    $thisStory.show();
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


  renderAllStories();


});


const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createStoryElement = function ({ username, title, content, completed, votes, created }) {
  const htmlElement = `
    <article class="story">
    <header>
      <span>${escapeText(title)} by ${escapeText(username)}</span>
      </header>

      <p class="story-content">${escapeText(content)}</p>

      <footer>
      <span>${created}</span>
      <span>Completed ${completed}</span>
      <div class="thumbs-container">
      <span>Votes ${votes}</span>
      <div>
      <i class="fa-regular fa-thumbs-up"></i>
      <i class="fa-regular fa-thumbs-down"></i>
      </div>
      </div>
      </footer>
      </article>
      `
      return htmlElement;
    }


const renderStories = function (stories) {
  const $storiesContainer = $('main .stories-container');
  $storiesContainer.html("")
  for (const story of stories) {
    const $story = createStoryElement(story);
    $storiesContainer.prepend($story);
  }

}
function renderAllStories() {
  $.get('/stories')
    .then((response) => {

      const { stories } = response;
      renderStories(stories);
    });
}


function renderUserStories(id) {
  return $.get(`/users/${id}/stories`)

    .then(({ stories }) => {
      renderStories(stories)

    })
}
