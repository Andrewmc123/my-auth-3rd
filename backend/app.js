// I believe this code is setting up all the necessary tools for our server
// express is the main web server framework
// morgan helps us log requests to the server
// cors allows our frontend to talk to our backend
// csurf helps protect against cross-site request forgery attacks
// helmet adds security headers to our responses
// cookieParser helps us read cookies from the browser
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// I believe this code is checking if we're running in production or development mode
// and creating our main Express application
const { environment } = require('./config');

const isProduction = environment === 'production';

// This creates our main Express application that will handle all requests
const app = express();

// I believe this code is setting up middleware that helps our server
// morgan('dev') logs all incoming requests to the console
// cookieParser helps us read cookies
// express.json() allows us to handle JSON data in requests
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// I believe this code is adding security features to our server
// In development mode, it allows requests from any origin
// It adds security headers to protect our server
// And sets up CSRF protection to prevent malicious requests
if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// backend/app.js
const routes = require('./routes');

// I believe this code is connecting all our API routes to the server
// When someone makes a request, it will be handled by the appropriate route
app.use(routes); // Connect all the routes

// I believe this code handles 404 errors when someone tries to access a page that doesn't exist
// It creates an error message and sends it to the error handling middleware
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

const { ValidationError } = require('sequelize');

// Process sequelize errors
// I believe this code handles database validation errors
// When the database finds something wrong with our data (like missing required fields)
// it formats the error message to be more user-friendly
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// I believe this code is the final error handler that sends errors back to the client
// It shows different error information depending on if we're in production or development
// In production, it shows less detailed errors for security
// In development, it shows more detailed errors to help with debugging
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  // Convert errors array to object with 'credential' key for frontend compatibility
  let errors = err.errors;
  if (Array.isArray(errors)) {
    errors = { credential: errors[0] || 'An error occurred' };
  }

  if (isProduction) {
    res.json({
      message: err.message,
      errors,
    });
  } else {
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors,
      stack: err.stack,
    });
  }
});

module.exports = app;
