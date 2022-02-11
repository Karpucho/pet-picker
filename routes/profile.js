const router = require('express').Router();
const { Animal } = require('../db/models');

router.get('/', async (req, res) => {
  const currentUser = req.session.user.id;
  const animalsByUser = await Animal.findAll(
    {
      where: {
        user_id: currentUser,
      },
    },
    { raw: true },
  );
  res.render('profile', {
    name: req.session.user.name,
    isAuthorized: req.session.isAuthorized,
    animalsByUser,
  });
});

router.delete('/:id', async (req, res) => {
  const soundId = req.params.id;

  await Animal.destroy({
    where: { id: soundId },
  });
  res.json({ url: '/profile', message: 'Звук удален' });
});

module.exports = router;
