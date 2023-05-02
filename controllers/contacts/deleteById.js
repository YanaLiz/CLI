const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Non found")
    }
    res.status(200).json({
      message: "Delete success"
    })
}

module.exports = {
 
  deleteById,
};