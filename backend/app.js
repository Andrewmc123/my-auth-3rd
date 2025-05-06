const express = require('express');
require('express-async-errors');                // Automatically catch async errors
const morgan = require('morgan');               // HTTP request logger
const cors = require('cors');                   // Cross-Origin Resource Sharing
const csurf = require('csurf');                 // CSRF protection
const helmet = require('helmet');               // Security headers
const cookieParser = require('cookie-parser');  // Parse cookies in requests
const { ValidationError } = require('sequelize');  // Import Sequelize's ValidationError class

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// Connect morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Security middleware
if (!isProduction) {
  // Enable CORS only in development
  // In production, frontend and backend should be on same domain
  app.use(cors());
}

// Helmet helps set security headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"                  // Allow resources to be shared cross-origin
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,                 // HTTPS only in production
      sameSite: isProduction && "Lax",      // Controls when cookies are sent with cross-site requests
      httpOnly: true                        // Prevents JavaScript access to cookies
    }
  })
);

// Connect routes
const routes = require('./routes');
app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
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

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
