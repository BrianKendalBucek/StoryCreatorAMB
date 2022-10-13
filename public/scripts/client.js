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

  $logout.on('click', () => {
    $logout.addClass('hidden');
    $login.removeClass('hidden');
  })

  $login.on('submit', (event) => {
    event.preventDefault();

    const $input = $login.find('input');
    const username = $input.val();

    $.post('/login', { username })
      .then((response) => {
        console.log("Success");
        $login.addClass('hidden');
        $logout.removeClass('hidden');
        $input.val('');
        return $.get('/stories')
      })
      .then((response) => {
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
    <article class="tweet">
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
