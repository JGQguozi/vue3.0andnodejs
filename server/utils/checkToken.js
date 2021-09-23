/*
 * @Author: guozi
 * @Date: 2021-8-31 10:24:01
 * @FilePath: .\server\utils\checkCookies.js
 */
// 接受请求并验证
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const secret = "jiangguozicheerup"; // 密钥，防止篡改
// 验证--放到最前面的use
const varifyToken = () => {
  const expressJWTFun = expressJWT({
    secret: secret,
    algorithms: ["HS256"], // 要加才能对
    // requestProperty:'auth',//自定义获取的信息位置，默认验证通过req.user获取token信息
    credentialsRequired: false //是否允许无token请求
  }).unless({
    // 接口白名单
    path: [
      "/api/login",
      "/api/register",
      "/api/updatePassword",
      "/api/verifyPassword"
    ] //除了这个接口，其他的接口都需要验证
  });
  // console.log("验证token", expressJWTFun);
  return expressJWTFun;
};
// 失败处理--放到最后一个app.use()
const errorToken = (err, req, res, next) => {
  console.log("errorToken==>", err);
  if (err.name === "UnauthorizedError") {
    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    let obj = {};
    obj.msg =
      err.message === "invalid signature"
        ? "token无效验证失败"
        : "token无效过期失败";
    obj.code = err.message === "invalid signature" ? 401 : 402;
    obj.error = err;
    res.send(obj); //返回失败信息
  }
};
// 生成方法---data是自定义信息，exp是传的过期时间
let createToken = function (data, exp) {
  let obj = {};
  obj.data = data ? data : null;
  obj.type = "express-jwt"; // 加个类型哈哈
  obj.ctime = new Date().getTime(); //token的创建时间
  //   obj.exp = Math.floor(Date.now() / 1000) + 60 * 60; // 如果直接放在data这里，要这样设置过期时间，并且这样设置过期时间要加上当前时间从1970开始算，所以要用当前时间 + 过期时间，单位毫秒，除1000换成s

  // 用expiresIn就不用，直接设置过期时间
  exp = exp ? exp : 60 * 60 * 24; //设定的过期时间,不设置就默认1天

  let token = "Bearer " + jwt.sign(obj, secret, { expiresIn: exp }); // 调用方法生成
  return token;
};

module.exports = {
  varifyToken,
  errorToken,
  createToken
};

// module.exports = async (req, res, next) => {
//   const { path } = req;
//   // 设置白名单，不需要验证cookies是否存在
//   const whiteList = ["login", "register", "updatePassword", "verifyPassword"];
//   const isNeedCookie = whiteList.reduce((pre, name) => {
//     return path.endsWith(name) | pre;
//   }, false);
//   if (!isNeedCookie) {
//     // console.log("cookies", req.cookies, req.cookies.user_id);
//     // 判断用户是否授权
//     // 验证
//     console.log("进来验证了");
//     let token = req.headers.authorization; // 拿到前端传过来的token
//     let result = varifyToken(token); // 调用上一个文件里面的验证方法
//     if (result.code == 606) {
//       console.log("验证失败");
//       res.send(result); // 验证失败，返回验证信息
//     } else {
//       console.log("验证成功");
//       req.resToken = result; // 存成功的信息，用到时可以用
//       await next(); // 成功就放行，可以访问接口
//     }
//   } else {
//     console.log("白名单内容通关");
//     await next();
//   }
// };
