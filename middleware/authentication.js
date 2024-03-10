
const User = require('../models/user')

const verifySignUp = async(req, res, next) => {
  try {
    // Check if username is already in use
    const existingUsername = await User.findOne({ Username: req.body.username });
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Check if email is already in use
    const existingEmail = await User.findOne({ Email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};

  module.exports = verifySignUp;