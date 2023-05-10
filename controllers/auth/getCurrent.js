const User = require("../../models/user");
const HttpError =require("../../helpers")

const getCurrent = async (req, res, next) => {
   const { id } = req.user;
   const user = await User.findById(id);
  if (!user) {
    throw new HttpError(401, "Not authorized");
  }
  const { email, name } = req.user;

  res.json({
    email,
    name,
  })
}

module.exports =  getCurrent;