import { get, post } from "@/api/http";
export const login = (params) =>
  post("/api/login", params).catch(() => {
    return "你的nodejs环境未启动";
  });
export const register = (params) => post("/api/register", params);
export const updatePassword = (params) => post("/api/updatePassword", params);
export const verifyPassword = (params) => post("/api/verifyPassword", params);
export const getCompanyDetail = () => get("/api/getTest");
export const userInfo = () => get("/api/userInfo");
