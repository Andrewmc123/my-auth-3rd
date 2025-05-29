const express = require('express');
const csrf = require('csurf');
const { setTokenCookie } = require('../../utils/auth');

const router = express.Router();

// Create CSRF token
router.get('/restore', csrf({ cookie: true }), (req, res) => {
    setTokenCookie(res, req.csrfToken());
    return res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
