document.registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { method, action } = event.target;

  const body = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const registrationResponse = await response.json();

    if (registrationResponse.success) {
      // alert(registrationResponse.message);
      window.location.href = registrationResponse.url;
    } else {
      alert(registrationResponse.message);
    }
  } catch (event) {
    alert('Что-то пошло не так');
  }
});

document.loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { method, action } = event.target;
  const body = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const loginResponse = await response.json();

  if (loginResponse.success) {
    // alert(loginResponse.message);
    window.location.href = loginResponse.url;
  } else {
    alert('Не удалось авторизоваться!');
  }
});
