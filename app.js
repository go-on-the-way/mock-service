
var db = require('./mongodb/db');
var DataModel = require('./models/data');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//跨域问题
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/save', (req, res, next) => {
  console.log('save');
  let saveData = new DataModel(req.body);
  saveData.save(function (err, data) {
    if (err) {
      res.send({ status: 0, msg: '保存失败' });
    } else {
      res.send({ status: 1, msg: '保存成功' });
    }
  });
});

app.use('/update', (req, res) => {
  console.log('update');
  DataModel.update({ _id: req.body._id }, { $set: req.body }, function (err) {
    if (err) {
      res.send({ status: 0, msg: '更新失败' });
    } else {
      res.send({ status: 1, msg: '更新成功' });
    }
  });
});

app.use('/delete', (req, res) => {
  console.log('delete');
  DataModel.remove({ url: req.body.url }, function (err) {
    if (err) {
      res.send({ status: 0, msg: '删除失败' });
    } else {
      res.send({ status: 1, msg: '删除成功' });
    }
  })
});

app.use('/find', (req, res) => {
  console.log('find');
  if (req.body.url) {
    DataModel.find({ url: req.body.url }, function (err, datas) {
      if (err) {
        res.send({ status: 0, msg: '查询失败' });
      } else {
        res.send({ status: 1, msg: '查询成功', datas });
      }
    })
  } else {
    DataModel.find(function (err, datas) {
      if (err) {
        res.send({ status: 0, msg: '查询失败' });
      } else {
        res.send({ status: 1, msg: '查询成功', datas });
      }
    })
  }
});

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
  res.render('error');
});

module.exports = app;
