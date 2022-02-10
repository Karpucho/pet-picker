const router = require('express').Router();
// const { Sound } = require('../db/models');
const hamster = {
  home: [1, 2],
  money: [1, 2, 3],
  time: [2, 3],
  location: [1, 2],
  name: 'Хомяк',
  describe: 'Здесь описание',
  photo: 'https://mir-s3-cdn-cf.behance.net/user/276/c36c4e14504555.5625d5b4197fa.jpg',
};

const husky = {
  home: [2],
  money: [2, 3],
  time: [3],
  location: [2],
  name: 'Хаски',
  describe: 'Здесь описание',
  photo: 'https://img.youtube.com/vi/-MCtLLbaiTs/0.jpg',
};

const crocodile = {
  home: [2],
  money: [3],
  time: [3],
  location: [1],
  name: 'Крокодил',
};

const arrAnimals = [
  hamster,
  husky,
  crocodile,
];

router.get('/', (req, res) => {
  res.render(
    'animal',
    { isAuthorized: req.session.isAuthorized },
  );
});

router.post('/', async (req, res) => {
  // const userid = req.session.user.id;
  const {
    home,
    money,
    time,
    location,
  } = req.body;

  try {
    const arr = arrAnimals.filter((animal) => animal.home.includes(+home)
        && animal.money.includes(+money)
        && animal.time.includes(+time)
        && animal.location.includes(+location));

    console.log(arr, 'на выход');

    res.json({
      // url: '/',
      message: arr,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка',
    });
  }
});

module.exports = router;
