$(() => {
  const $login = $('#login')
  $login.on('submit', (event) => {
    event.preventDefault()
    const username = $login.find('input').val()
    console.log(username)
    $.post('/login', {username})
    .then((response) => {
      console.log(response)
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});
