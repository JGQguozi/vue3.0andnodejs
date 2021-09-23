/**
 * @description // 递归读取文件，类似于webpack的require.context()
 * @time 2021-8-19
 *
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 * 参考地址: https://blog.csdn.net/qq_39953537/article/details/108665214
 */
const path = require("path");
const fs = require("fs");
const getPathInfo = (p) => path.parse(p);

function autoLoadFile(directory, useSubdirectories = false, extList = [".js"]) {
  // 存放对应抽取文件地址
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    // 获取对应文件夹需要选取文件数组
    const files = fs.readdirSync(directory);
    files.forEach((item) => {
      // 获取当前文件地址
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        // 获取当前模块文件详细信息
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的数组
  let arr = [];
  filesList.map((item) => {
    // require解析对应模块数据
    arr.push(require(item));
  });
  return arr;
}

const fileList = autoLoadFile(path.join(__dirname, "./controller"), false);

//导入路由模块
// var USER_CONTROLLER = require("./controller/userController");
// var TEXT_CONTROLLER = require("./controller/textController");
module.exports = [...fileList];
