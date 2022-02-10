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

  soundResponse.message.forEach((element) => {
    const beastPhoto = document.createElement('img');
    beastPhoto.setAttribute('src', element.photo);
    const beastName = document.createElement('div');
    beastName.innerText = element.name;
    const beastDescribe = document.createElement('div');
    beastDescribe.innerText = element.describe;
    animal.appendChild(beastPhoto);
    animal.appendChild(beastName);
    animal.appendChild(beastDescribe);
  });
  // alert(soundResponse.message);
  // animal.innerText = soundResponse.message[0].name;
  // console.log(soundResponse.message);
  // window.location.href = soundResponse.url;
});
