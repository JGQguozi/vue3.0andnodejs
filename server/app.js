// 引入express框架
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const options = {
  db_user: "guozi", //添加的普通账户名
  db_pwd: "Aa123456",
  db_host: "127.0.0.1",
  db_port: 27017,
  db_name: "jmondoDB" //数据库名称
};

app.all("*", function (req, res, next) {
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   `http://localhost:${options.db_port}`
  // );
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${options.db_port}`
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", " 3.2.1");
  next();
});

var dbURL =
  "mongodb://" +
  options.db_user +
  ":" +
  options.db_pwd +
  "@" +
  options.db_host +
  ":" +
  options.db_port +
  "/" +
  options.db_name;
console.log("dbURL", dbURL);
("?authSource=admin");

// const dbURL = `mongodb://127.0.0.1:${port}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`

// 连接数据库
mongoose.connect(
  dbURL,
  {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  // (err, db) => {
  //   // if (err) throw err
  //   console.log('数据库已创建')
  //   // var dbase = db.db('runoob')
  //   // dbase.createCollection('site', (err, res) => {
  //   //   if (err) throw err
  //   //   console.log('创建集合!')
  //   //   db.close()
  //   // })
  // }
);
const db = mongoose.connection;
// 将连接绑定到错误事件
db.on("error", console.error.bind(console, "MongoDB connection error"));

// 错误事件，同上
db.on("error", function (error) {
  console.error.bind(console, "数据库连接失败：" + error);
});

// 一次打开事件
db.once("open", function () {
  console.log("一次打开记录");
});

// 数据库连接成功
db.on("open", function () {
  console.log("数据库连接成功");
});

// 数据库连接失败
db.on("disconnected", function () {
  console.log("数据库连接断开");
});

// 引入解码传输数据模块

const urlencodeParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodeParser);
app.use(bodyParser.json());

// // 配置控制器
// var server = require("./index.js");
// app.use(server(express, Todo));

// 需要安装并且引入中间件cors
const cors = require("cors");

var corsOptions = {
  origin: `http://127.0.0.1:3000`,
  // 允许跨域情况下发送cookie
  credentials: true
};
app.use(cors(corsOptions));

// 使用中间件：检测cookie
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
// const checkCookies = require("./utils/checkCookies");
// app.use(checkCookies);

// 使用中间件：检测token
const { varifyToken, errorToken } = require("./utils/checkToken");

app.use(varifyToken());
app.use(errorToken);

// 使用中间件：接口池
const controllerDatas = require("./index");
app.use(controllerDatas);
// 设置端口号
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
