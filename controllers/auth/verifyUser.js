const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyUser = async (req,res) => {
  console.log(req.params)
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, 'User not found');
  await User.findByIdAndUpdate(user._id, { verificationToken: '', verify: true });
  res.status(200).json({ message: 'Verification successful' });
};

module.exports = verifyUser;