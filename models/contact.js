const { Schema, model } = require("mongoose")
const { handleMongooseError}  = require("../helpers")
const Joi = require("joi")

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
}, { versionKey: false, timestamps: true });


contactSchema.post("save", handleMongooseError);


const addSchema = Joi.object({
 name: Joi.string().required(),
  email: Joi.string()
    // .email({
    //   minDomainSegments: 2,
    //   tlds: { allow: ["com", "net"] },
    // })
    .required(),
  phone: Joi.string()
    // .regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  schemas,
};
