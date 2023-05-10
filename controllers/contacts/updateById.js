const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");


const updateById = async (req, res) => {
   const { contactId } = req.params;
   const { id } = req.user;
   const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: id },
    { ...req.body },
    {
      new: true,
    });
    console.log(result);
    if (!result) {
      throw new HttpError(404, "Not found")
    }
   res.status(200).json(result);
  
}

module.exports = updateById;