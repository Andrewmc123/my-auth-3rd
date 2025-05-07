const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Test route (can be removed later)
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// Apply restoreUser middleware to all API routes
router.use(restoreUser);

// Mount routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', require('./spots'));

module.exports = router;
