const router = require('express').Router();
const { Animal } = require('../db/models');
const arrAnimals = require('../array');

router.get('/', (req, res) => {
  res.render(
    'animal',
    { isAuthorized: req.session.isAuthorized },
  );
});

router.post('/', async (req, res) => {
  const {
    home,
    money,
    time,
    location,
  } = req.body;
  try {
    const userid = req.session.user.id;

    const arr = arrAnimals.filter((animal) => animal.home.includes(+home)
        && animal.money.includes(+money)
        && animal.time.includes(+time)
        && animal.location.includes(+location));

    arr.map(async (el) => {
      const createdAnimal = await Animal.findOrCreate({
        where: {
          text: el.name,
          user_id: userid,
        },
        defaults: {
          text: el.name,
          photo: el.photo,
          user_id: userid,
        },
      });
    });

    res.json({
      message: arr,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка',
    });
  }
});

module.exports = router;
