const express = require('express')
const { HttpError } = require("../../helpers");
const Joi = require("joi")
const contacts = require("../../models/contacts")

const addSchema = Joi.object({
 name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required(),
})


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result)
  } catch (error) {
    next(error);
 }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result)
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try { 
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Non found")
    }
    res.status(200).json({
      message: "Delete success"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found")
    }
   res.status(200).json(result);
   
  } catch (error) {
    next(error);
  }
})

module.exports = router;
