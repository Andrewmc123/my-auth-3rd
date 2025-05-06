const router = require('express').Router();
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

// Test route to check if API router is working
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// Route to trigger Sequelize validation error
router.post('/test-validation', async (req, res, next) => {
  try {
    await User.create({});
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// Apply restoreUser middleware to all routes below
router.use(restoreUser);

// GET /api/restore-user
router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
