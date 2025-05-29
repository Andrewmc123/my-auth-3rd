const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

require('express-async-errors');

const { environment } = require('./config');
const routes = require("./routes"); 

const isProduction = environment === 'production';

const app = express();

// Middleware Setup
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


if (!isProduction) {
  app.use(cors({
    origin: 'http://localhost:8001', // 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'XSRF-Token']
  }));
}

// Other Security Middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && "Lax",
    httpOnly: true
  }
}));

// Routes
app.use(require('./routes'));

// 404 Handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  const response = {
    message: err.message,
    errors: err.errors,
  };

  if (!isProduction) {
    response.title = err.title || 'Server Error';
    response.stack = err.stack;
  }

  res.json(response);
});

module.exports = app;
