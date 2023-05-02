const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");


const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found")
    }
   res.status(200).json(result);
  
}

module.exports = {
  updateFavorite,
};