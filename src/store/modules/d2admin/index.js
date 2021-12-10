/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

let files = require.context("./modules", false, /\.js$/);
let modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
console.log("modules===>", modules);

Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});

export default {
  namespaced: true,
  modules
};
