const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const postDetailRouter = require('./routes/postdetail');
const commentsRouter = require('./routes/comments');
const followersRouter = require('./routes/followers');
const likesRouter = require('./routes/likes');
const payedRouter = require('./routes/payed');
const app = express();


//database connection

const db = require("./helper/db")();

//helper

const config = require('./helper/config');
app.set('important', config.api_secret_key);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({
  origin: 'http://localhost:8080'
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/postdetail', postDetailRouter);
app.use('/comments', commentsRouter);
app.use('/follow', followersRouter);
app.use('/likes', likesRouter);
app.use('/payed', payedRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
