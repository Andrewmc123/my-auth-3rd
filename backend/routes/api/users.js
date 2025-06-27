// I believe this code handles user registration (sign up) in our application

const express = require('express');
const bcrypt = require('bcryptjs'); // This helps us hash passwords for security

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// This creates a new router for handling user-related routes
const router = express.Router();

// This defines all the validation rules for user signup
const validateSignup = [
    // Validates the email
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    
    // Validates the username
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    
    // Makes sure username is not an email
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    
    // Validates the password
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),    
      
    // Validates first name
    check('firstName')
      .exists({checkFalsy: true})
      .withMessage('First name is required.'),
    
    // Validates last name
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Last name is required.'),
    
    // Handles any validation errors that occur
    handleValidationErrors
  ];

// This handles the signup route when someone submits a new user
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  
  // Hashes the password for security before storing it
  const hashedPassword = bcrypt.hashSync(password);
  
  // Creates a new user in the database
  const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
  // Creates a safe version of the user object without sensitive info
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
  
  // Sets a cookie with the user's authentication token
  await setTokenCookie(res, safeUser);
  
  // Returns the user data with a 201 (Created) status code
  res.status(201)
  return res.json({ 
    user: safeUser
  });
});

// Exports the router so it can be used in other files
module.exports = router;
