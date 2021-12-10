//1.导入express
const express = require("express");
const createError = require("http-errors");
//2.创建wab 服务器
const router = express.Router();
const UserTodo = require("../models/index").user;

// 测试
router.get("/api/getTest", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );

  let datas = [];
  UserTodo.find({}, (err, data) => {
    if (err) throw new Error("获取失败");
    datas = data;
    res.status(200).send({ message: "获取成功", data: datas, code: 200 });
  });
});

module.exports = router;
