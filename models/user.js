const { Schema, model } = require("mongoose")
const { handleMongooseError}  = require("../helpers")
const Joi = require("joi")

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/



const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: emailRegexp,
    required:true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  token: {
    type: String,
    default:"",
  }
}, { versionKey: false, timestamps: true });


userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password:Joi.string().min(6).required(),
})

const emailShcema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({ "any required": "missing required field {#label}" }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password:Joi.string().min(6).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  emailShcema,
}

const User = model('user', userSchema);


module.exports = {
  User,
  schemas,
}