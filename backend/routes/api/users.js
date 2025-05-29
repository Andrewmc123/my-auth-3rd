const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),    
      check('firstName')
      .exists({checkFalsy: true})
      .withMessage('First name is required.'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Last name is required.'),
    handleValidationErrors
  ];


// signing up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      
      const userExists = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });

      if (userExists) {
        const err = new Error('User already exists');
        err.status = 500;
        err.title = 'User already exists';
        err.errors = ['User with that email already exists'];
        return next(err);
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      });

      await setTokenCookie(res, user);
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, user);
      return res.status(201).json({ 
        user: safeUser
      });
    }
  );


module.exports = router;
