//1.导入express
const express = require("express");
const createError = require("http-errors");
//2.创建wab 服务器
const router = express.Router();
const UserTodo = require("../models/index").user;

// 使用js-cookie判断（已取消）
// let millisecond = new Date().getTime();
// const _maxAge = new Date(millisecond + 8 * 60 * 60 * 1000); //有效期

// 使用jsonwebtoken判断
const { createToken } = require("../utils/checkToken");

// 判断用户是否存在
const judgeUser = (name) => {
  return new Promise((resolve, reject) => {
    UserTodo.findOne({ name: name }, (err, data) => {
      if (err) {
        reject("用户查询出错,执行错误回抛");
        throw err;
      }
      resolve(data);
    });
  });
};
// 登陆
router.post("/api/login", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  judgeUser(req.body.name).then((data) => {
    if (!data) {
      // 用户不存在
      res.json({
        message: "用户不存在",
        data: [],
        code: -1
      });
    } else {
      if (data.password != req.body.password) {
        // 密码不正确
        res.json({
          message: "密码不正确",
          data: [],
          code: -1
        });
      } else {
        // 登陆成功操作
        let newData = { ...data._doc };
        const tokenValue = createToken(data._id, 60 * 60);
        newData.token = tokenValue;
        data.user_token = tokenValue;
        data.save();
        // res.cookie("user_id", data._id, {
        //   maxAge: _maxAge,
        //   httpOnly: true
        //   // // 开启该Cookie的签名模式
        //   // signed: true,
        //   // domain: 'localhost:9999',
        //   // path: '/',
        // });
        res.json({
          message: "获取成功",
          data: newData,
          code: 200
        });
      }
    }
  });
});
// 注册
router.post("/api/register", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  judgeUser(req.body.name)
    .then((data) => {
      if (!data) {
        // 用户未注册
        UserTodo.find({})
          .sort({ user_id: -1 })
          .limit(1)
          .exec((err2, data2) => {
            if (err2) throw err2;
            if (data2 && data2.length) {
              let pushData = {
                ...req.body,
                ...{
                  user_id: parseInt(data2[0].user_id) + 1,
                  user_uuid: parseInt(data2[0].user_uuid) + 1,
                  user_created: new Date().getTime(),
                  user_updated: new Date().getTime(),
                  user_role: 0
                }
              };

              UserTodo(pushData).save((err, addDatas) => {
                if (err) throw err;
                res.status(200);
                res.send({ message: "注册成功", data: addDatas, code: 200 });
              });
            }
          });
      } else {
        // 用户已注册
        res.json({
          message: "用户已存在",
          data: [],
          code: -1
        });
      }
    })
    .catch((err) => {
      console.log("用户err", err);
    });
});
// 忘记密码
router.post("/api/updatePassword", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  judgeUser(req.body.name)
    .then((data) => {
      if (!data) {
        // 用户已注册
        res.json({
          message: "用户不存在",
          data: [],
          code: -1
        });
      } else {
        if (data.password === req.body.password) {
          res.json({
            message: "两次密码一致，请重新确认密码",
            data: [],
            code: -1
          });
          return;
        }
        // 用户已注册，更新密码
        UserTodo.findOneAndUpdate(
          {
            name: req.body.name
          },
          { password: req.body.password, user_updated: new Date().getTime() },
          { new: true },
          (err, data) => {
            if (err) throw err;
            res.status(200);
            res.send({ message: "更新成功", data: data, code: 200 });
          }
        );
      }
    })
    .catch((err) => {
      console.log("用户err", err);
    });
});
// 验证密码
router.post("/api/verifyPassword", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  UserTodo.findOne(
    { name: req.body.name, password: req.body.password },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        res.json({
          message: "旧密码有误",
          data: [],
          code: -1
        });
      } else {
        res.send({ message: "用户密码验证成功", data: data, code: 200 });
      }
    }
  );
});
// 获取用户数据
router.get("/api/userInfo", async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  let result = await UserTodo.findOne({
    user_token: req.headers.authorization
  });
  res.json({
    message: "获取用户数据成功",
    data: result,
    code: 200
  });
  // res.send({ message: "获取用户数据成功", data: result, code: 200 });
});
module.exports = router;
