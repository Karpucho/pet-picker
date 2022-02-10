const router = require('express').Router();
// const { Sound } = require('../db/models');
const hamster = {
  home: [1, 2],
  money: [1, 2, 3],
  time: [2, 3],
  location: [1, 2],
  name: 'Хомяк',
  
};

const husky = {
  home: [2],
  money: [2, 3],
  time: [3],
  location: [2],
  name: 'Хаски',
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
    'login',
    // { isAuthorized: req.session.isAuthorized },
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

    console.log(arr.name, 'на выход');

    res.json({
      url: '/',
      message: arr,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка',
    });
  }
});

module.exports = router;
