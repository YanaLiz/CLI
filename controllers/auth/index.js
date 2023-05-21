const ctrlWrapper=require("../../helpers/ctrlWrapper")
const register = require("./auth");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const getAvatar = require('./getAvatar')
const verifyUser = require('./verifyUser')
const resendVerify = require('./resendVerify')

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  getAvatar: ctrlWrapper(getAvatar),
  verifyUser: ctrlWrapper(verifyUser),
  resendVerify: ctrlWrapper(resendVerify),
};