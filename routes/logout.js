const router = require('express').Router();

// Удаление куки, сессии и редирект на главную при нажатии на ссылку /logout
router.get('/', (req, res) => {
  res.clearCookie('user_sid');
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
