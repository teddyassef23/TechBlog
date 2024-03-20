const router = require('express').Router();

const userRoutes = require('./userRout');

router.use('/users', userRoutes);

module.exports = router;
