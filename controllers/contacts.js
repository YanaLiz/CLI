const {
  HttpError,
  ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
    const result = await Contact.find({});
    res.status(200).json(result)
}

const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
}

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    return res.status(201).json(result)
}

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

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found")
    }
   res.status(200).json(result);
  
}

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
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite:ctrlWrapper(updateFavorite),
}