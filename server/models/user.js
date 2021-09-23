const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  user_id: { type: Number, required: true },
  user_uuid: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  user_created: { type: Number },
  user_updated: { type: Number },
  user_token: { type: String },
  user_role: { type: Number, required: true } // 0: 账户锁定无权限(noAccess) 1: 普通用户(common) 2: 管理员(admin) 3: 超级管理员(superadmin)
});
// 第三个参数记得加，否则无法跟Schema形成映射,返回的数据会为空数组
module.exports = mongoose.model("user", UsersSchema, "user");
