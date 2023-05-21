const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');
require('dotenv').config()
const { PATH } = process.env;

const resendVerify = async (res, req) => {
  const { email } = req.body
  const user = await User.find({ email });
  if (!user) throw HttpError(404, "User not found");
  if(user.verify) throw HttpError(400, "Verification has already been passed");
  await sendEmail({ to: user.email, subject: "Hello ✔", html: `<a target="_blank" href="${PATH}/api/auth/verify/${user.verificationToken}">click here to verify</a>` });
  };

module.exports = resendVerify;