const router = require('express').Router();
const { User, Blog , Comment } = require('../models');

// GET all User for homepage
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [
        {
          model: Painting,
          attributes: ['id', 'username'],
        },
      ],
    });

    const users = dbUserData.map((user) =>
      user.get({ blog: true })
    );
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user by Id
router.get('/user/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: blog,
          attributes: [
            'id',
            'blog',
       
          ],
        },
      ],
    });

    const user = dbUserData.get({ plain: true });
    res.render('gallery', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
router.get('/blog/:id', async (req, res) => {
  try {
    const dbblogData = await blog.findByPk(req.params.id);

    const blogs = dbblogData.get({ blog: true });
    res.render('painting', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
