const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");

require('dotenv').config();

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const offersRouter = require('./routes/offers');
const googleRouter = require('./routes/google');
const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO CHANGE TO YOUR OWN DB Config
// TODO: MIGRATE DEFINITION OF 'CENTRAL' MONGO URI AND AUTH KEYS TO HEROKU AS VARS.
//
 const db = process.env.ATLAS_URI;
// const db = require("./config/keys").mongoURI;


mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.log(err));

// const connection = mongoose.connection;
//
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// });

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/offers', offersRouter);
app.use('/auth/google', googleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
