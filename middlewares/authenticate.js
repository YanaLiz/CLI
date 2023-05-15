const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401,"Not authrized"))
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // if (!id) {
    //   next(HttpError(401,"Not authrized"))
    // }
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  }
  catch (error) {
    next(HttpError(401))
  };

};

module.exports =  authenticate ;