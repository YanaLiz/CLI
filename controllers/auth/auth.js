const bcrypt =require("bcrypt")
const { User } = require("../../models/user")
const { HttpError,sendEmail } = require("../../helpers");
const gravatar = require('gravatar');
const shortid = require('shortid')
require('dotenv').config()
const { PATH } = process.env;


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, "Email in use");
  };

  const hashPassword = await bcrypt.hash(password, 10);
  const defaultAvatar = gravatar.url(email, { s: '250' });
  const verificationToken = shortid();
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: defaultAvatar, verificationToken });
  await sendEmail({ to: email, subject: "Hello ✔", html: `<a target="_blank" href="${PATH}/api/auth/verify/${verificationToken}">click here to verify</a>` });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};


module.exports = register;