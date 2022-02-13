const animal = document.querySelector('.animalName');

document.addCardForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { method, action } = event.target;

  const body = {
    home: event.target.home.value,
    money: event.target.money.value,
    time: event.target.time.value,
    location: event.target.location.value,
  };

  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const soundResponse = await response.json();

  animal.innerText = '';

  if (soundResponse.message.length <= 5) {
    soundResponse.message.forEach((element) => {
      const beastPhoto = document.createElement('img');
      const test = document.createElement('a');
      test.setAttribute('href', `https://ru.wikipedia.org/wiki/${element.name}`);
      test.target = '_blank';
      beastPhoto.setAttribute('src', element.photo);
      const beastName = document.createElement('div');
      beastName.innerText = element.name;
      test.appendChild(beastPhoto);
      animal.appendChild(test);
      animal.appendChild(beastName);
    });
  } else {
    let index;
    const sortArr = [];
    const needLengthArr = 5;
    for (let i = 0; i < needLengthArr; i++) {
      const lengthArr = soundResponse.message.length;
      index = Math.floor(Math.random() * (lengthArr + 1));
      sortArr.push(soundResponse.message[index]);
      soundResponse.message.splice(index, 1);
    }
    sortArr.forEach((element) => {
      const beastPhoto = document.createElement('img');
      const test = document.createElement('a');
      test.setAttribute('href', `https://ru.wikipedia.org/wiki/${element.name}`);
      test.target = '_blank';
      beastPhoto.setAttribute('src', element.photo);
      const beastName = document.createElement('div');
      beastName.innerText = element.name;
      test.appendChild(beastPhoto);
      animal.appendChild(test);
      animal.appendChild(beastName);
    });
  }
});

const deleteSounds = document.querySelectorAll('.buttonDelete');

deleteSounds?.forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const soundId = button.dataset.id;

    const action = `profile/${soundId}`;

    const response = await fetch(action, {
      method: 'DELETE',
    });

    const deletedSound = await response.json();

    document.querySelector('.cart').remove();
    // alert(deletedSound.message);
    window.location.href = deletedSound.url;
  });
});
