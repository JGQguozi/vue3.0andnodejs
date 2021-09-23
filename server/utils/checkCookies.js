// cookieParser记得要加()
// 签名用密钥，需要保密，仅存储在服务端 'NpLRTpy1vbBzEw2JcAxpf970kOk2RViDn5wKwrMv'

// 检查 cookie
module.exports = async (req, res, next) => {
  const { path } = req;
  // 设置白名单，不需要验证cookies是否存在
  const whiteList = ["login", "register", "updatePassword", "verifyPassword"];
  const isNeedCookie = whiteList.reduce((pre, name) => {
    return path.endsWith(name) | pre;
  }, false);
  if (!isNeedCookie) {
    // console.log("cookies", req.cookies, req.cookies.user_id);
    // 判断用户是否已经登陆过
    if (req.cookies && req.cookies.user_id) {
      await next();
    } else {
      console.log("没有cookies");
      res.status(401);
      res.end();
    }
  } else {
    await next();
  }
};
