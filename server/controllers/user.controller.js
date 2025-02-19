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

exports.sign = async (req, res) => {
  const { email } = req.body;
  //1.Check email is existing in DB?
  //เช็คว่ามีอีเมลนี้ในฐานข้อมูลหรือไม่

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  const user = await UserModels.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  //2.Sign JWT token
  const token = jwt.sign({ email: user.email, role: user.role }, secret, {
    expiresIn: "1h",
  });

  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  //1.เช็คว่ามีอีเมลนี้ในฐานข้อมูลหรือไม่
  if (!email) {
    return res.status(400).send({ message: "Email and Password is required" });
  }

  try {
    const existedUser = await UserModels.findOne({ email });
    if (existedUser) {
      return res.status(200).send({ message: "Email is already existed" });
    }
    const user = new UserModels({ email });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong while adding a new user",
    });
  }
};
