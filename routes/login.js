const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render(
    'login',
    { isAuthorized: req.session.isAuthorized },
  );
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    req.session.isAuthorized = true;
    res.json({ url: '/formAnimal', success: true, message: 'Успешный логин' });
  } else {
    res.json({ succes: false });
  }
});

module.exports = router;
