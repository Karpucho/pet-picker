const animal = document.getElementById('animalName');

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

  // console.log(soundResponse.message[0].name, soundResponse.message[1].name, 'на клиент');
  animal.innerText = '';
  

let index;

  
  
  const sortArr = [];
  const needLengthArr = 5;
  for (let i = 0; i < needLengthArr; i++) {
    let lengthArr = soundResponse.message.length;
    console.log(lengthArr, 'до цикла');
    index = Math.floor(Math.random() * (lengthArr + 1));
    sortArr.push(soundResponse.message[index]);
    soundResponse.message.splice(index, 1);
    console.log(lengthArr, 'после цикла');
  }
  console.log(sortArr, 'МАССИВ');
  sortArr.forEach((element) => {
    const beastPhoto = document.createElement('img');
    const test = document.createElement('a');
    test.setAttribute('href', `https://ru.wikipedia.org/wiki/${element.name}`);
    test.setAttribute('target', '_blank');
    test.target = '_blank';
    beastPhoto.setAttribute('src', element.photo);
    const beastName = document.createElement('div');
    beastName.innerText = element.name;

    const beastDescribe = document.createElement('div');
    beastDescribe.innerText = element.describe;
    animal.appendChild(beastName);
    animal.appendChild(beastDescribe);
    test.appendChild(beastPhoto);
    animal.appendChild(test);
  });
  // alert(soundResponse.message);
  // animal.innerText = soundResponse.message[0].name;
  // console.log(soundResponse.message);
  // window.location.href = soundResponse.url;
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
    alert(deletedSound.message);
    window.location.href = deletedSound.url;
  });
});
