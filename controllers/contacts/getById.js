const { Contact } = require("../../models/contact")
const { HttpError } = require("../../helpers")




const getById = async (req, res) => {
  const { contactId } = req.params
   const { id } = req.user;
    const result = await Contact.findOne({
    _id: contactId,
    owner: id,
  });
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
}
module.exports = getById;