/**
 * REGISTER >> library&step
 * library: { bcrypt}
 *
 * Step: {
 * 1. Check -> Username,Password
 * 2. Check -> Duplicate username (optional)
 * 3. Hash -> password
 * 4. Save to DB!
 * }
 *
 * Diagram Flow
 *  >> Activity / Sequence Diagram <<
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModels = require("../models/User");
const salt = bcrypt.genSaltSync(10); //พิ่มความปลอดภัยในการเก็บรักษา password
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModels.create({
      username,
      password: hashedPassword,
    });
    res.send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};

//Check username, password ก่อนlogin
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  try {
    const userDoc = await UserModels.findOne({ username });
    if (!userDoc) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }
    const isPasswordMathed = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordMathed) {
      res.status(401).send({
        message: "Invalid credentials!",
      });
      return;
    }

    //login success
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err)
        return res.status(500).send({
          message: "Internal server error: Cannot Authentication Failed!",
        });
      //token generated
      res.send({
        message: "User logged in successfully",
        id: userDoc._id,
        username,
        accessToken: token,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while loggin in user",
    });
  }
};
