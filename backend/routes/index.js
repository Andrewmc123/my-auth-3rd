const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// CSRF token restoration route
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

// Mount the API router under the /api path
router.use('/api', apiRouter);

// Remove this test route since we're no longer using it
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

module.exports = router;
