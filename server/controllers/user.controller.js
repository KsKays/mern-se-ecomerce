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
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10); //พิ่มความปลอดภัยในการเก็บรักษา password
require("dotenv").config();
const secret = process.env.SECRET;


exports.sign = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
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
  try {
     const { email } = req.body;
  //1.เช็คว่ามีอีเมลนี้ในฐานข้อมูลหรือไม่
  if (!email) {
    return res.status(400).json({ message: "Email are required" });
  }
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Create ผู้ใช้ใหม่
    const newUser = new UserModel({ email });
    await newUser.save();

    //res.status(201).json({ message: "User added successfully" });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while adding a new user",
      error: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(200).json({ message: "No User"})
    }
    res.status(200).json(users);
  } catch (error) {
     res.status(500).send({
      message: error.message || "Something error occurred while getting users!",
    });
  }
}

exports.updateUser = async (req, res) => {
  const{id} = req.params;
  const {email,role} = req.body;
  if(!email){
    return res.status(400).json({message: "Email is required"})
  }
  try {
    const user = await UserModel.findByIdAndUpdate(id,{email, role},{new:true});
    if(!user){
      return res.status(404).json({message: "User not found"}) 
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while updating users!",
    });
  }
}

exports.deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "User was deleted successfully"});
  } catch (error) {
     res.status(500).send({
      message: error.message || "Something error occurred while deleting users!",
    });
  }
}

exports.makeAdmin = async (req, res) => {
  const {email} = req.params;
  try {
    const user = await UserModel.findOneAndUpdate({email});
    if (!user) {
      return res.status(404).json({message: "User not found!"});
    }
    user.role = "admin";
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while changing user role to admin!",
    });
  }
}

exports.makeUser = async (req, res) => {
  const {email} = req.params;
  try {
    const user = await UserModel.findOneAndUpdate({email});
    if (!user) {
      return res.status(404).json({message: "User not found!"});
    }
    user.role = "user";
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while changing user role to user!",
    });
  }
}

exports.getRoleByEmail = async (req, res) => {
  const {email} = res.params
  try {
    const user = await UserModel.findOne({email})
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "User was deleted successfully"});
    
  } catch (error) {
    {
      res.status(500).json({
        message: "Something error occurred while getting user role",
        error: error.message,
      });
    }
  }
  
}