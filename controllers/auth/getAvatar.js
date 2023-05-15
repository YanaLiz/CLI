const {User} = require("../../models/user");
const HttpError = require("../../helpers")
const path = require('path')
const fs = require('fs/promises')
const Jimp = require("jimp");

const getAvatar = async (req, res) => {
  console.log(req.user);
  const { _id: id } = req.user;
  console.log(req.file)
  const { path: entryFile, originalname } = req.file;
  const newFileName = id + originalname;
  console.log(newFileName);
  const newPath = path.join(__dirname, '../../', 'public', 'avatars');
  const avatar = path.join(newPath, newFileName);
 await Jimp.read(entryFile)
  .then((avatar) => {
    return avatar
      .resize(250, 250) // resize
      .write(entryFile); // save
  })
  .catch((err) => {
    throw HttpError(400, err.messge);
  });
  await fs.rename(entryFile, avatar);
  const publicAvatar = path.join('avatars', newFileName);
  await User.findByIdAndUpdate(id,{ avatarURL: publicAvatar })
  res.status(200).json({ avatarURL: publicAvatar });
  
};

module.exports = getAvatar