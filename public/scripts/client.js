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

    $.post('/login', {username})
    .then((response) => {
      $login.addClass('hidden');
      $logout.removeClass('hidden');
      $input.val('');
      });
    });
  });

