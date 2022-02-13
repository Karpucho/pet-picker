const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render(
    'registration',
    { isAuthorized: req.session.isAuthorized },
  );
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({
    where: {
      email,
    },
  });

  if (isUserExist) {
    return res.json({ success: false, message: 'Неудача.' });
  }

  const passwordHash = await bcrypt.hash(password, 5);
  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  req.session.user = user;
  req.session.isAuthorized = true;

  return res.json({ success: true, url: '/', message: 'Успешная регистрация!' });
});

module.exports = router;
