const nodemailer = require("nodemailer");
require("dotenv").config()
const HttpError = require('./HttpError')

const { PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "yanaliz@ukr.net", // generated ethereal user
      pass: PASSWORD, // generated ethereal password
    },
  });



const sendEmail = async (data) => {
  try {
    await transporter.sendMail({ ...data, from: "yanaliz@ukr.net" });
  } catch (error) {
    throw HttpError(400, error.message);
  };
};
module.exports = sendEmail;