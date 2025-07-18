const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Get current user
router.get('/', restoreUser, (req, res) => {
    const user = req.user;
    if (user) {
        return res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            }
        });
    } else {
        return res.json({ user: null });
    }
});

// Demo user credentials
const DEMO_USER = {
    email: 'explorer@user.io',
    username: 'WanderQueen',
    password: 'explore123'
};

// Demo user login
router.post('/demo', async (req, res, next) => {
    const { email, username, password } = DEMO_USER;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username,
                email
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Authentication failed');
        err.status = 401;
        err.title = 'Authentication failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, user);
    return res.json({
        user: safeUser
    });
});

const validateLogin = [
    check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Authentication failed');
        err.status = 401;
        err.title = 'Authentication failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, user);
    return res.json({
        user: safeUser
    });
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});


module.exports = router;
