
const bcrypt =require("bcrypt")
const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res) => { 
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //  if (!user || !user.comparePassword(password)) {
  //   throw new HttpError(401, "Email or password is wrong");
  // }
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  }
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
  token,
})
}

module.exports = login;