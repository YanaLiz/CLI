const { HttpError, ctrlWrapper } = require("../helpers");

const contacts = require("../models/contacts")



const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result)
}

const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
}

const add = async (req, res) => {
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result)
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Non found")
    }
    res.status(200).json({
      message: "Delete success"
    })
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found")
    }
   res.status(200).json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
}