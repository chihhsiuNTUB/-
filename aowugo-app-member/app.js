var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------

var storelist = require('./routes/storelist');
var memberlist = require('./routes/memberlist') ;
var member_add_form = require('./routes/member_add_form');
var member_add = require('./routes/member_add');
var member_remove_form = require('./routes/member_remove_form');
var member_remove = require('./routes/member_remove');
var member_update_no = require('./routes/member_update_no');
var member_update_form = require('./routes/member_update_form');
var member_update = require('./routes/member_update');
var calculatingtimelist = require('./routes/calculatingtimelist');
//------------------------------------------------------------


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//-----------------------------------------
// 設定模組使用方式
//-----------------------------------------


app.use('/store/list', storelist);
app.use('/member/list', memberlist);
app.use('/member/add/form', member_add_form);
app.use('/member/add', member_add);
app.use('/member/remove/form', member_remove_form);
app.use('/member/remove', member_remove);
app.use('/member/update/no', member_update_no);
app.use('/member/update/form', member_update_form);
app.use('/member/update', member_update);
app.use('/calculatingtime/list', calculatingtimelist);
//-----------------------------------------

//----------------------------------------
// 可由外部直接取用資料夾
//----------------------------------------
app.use(express.static('public/picture'));
//-----------------------------------------



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