var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const cors=require("cors");
const history = require('connect-history-api-fallback');

/*引入路由模块*/
var index=require("./routes/index");
var details=require("./routes/details");
var products=require("./routes/products");
var users=require("./routes/users");
var cartItems=require("./routes/cartItems");

var app = express();
//app.use(history());
app.use(cors({
  origin:['http://localhost:8080',"http://127.0.0.1:5500"],
  credentials:true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:false,
  saveUninitialized:true
}));//将服务器的session，放在req.session中
app.use(express.static(path.join(__dirname,"public")));
/*使用路由器来管理路由*/

app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use("/users",users);
app.use("/cartItems",cartItems)


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
  // res.render('error');
});

module.exports = app;
