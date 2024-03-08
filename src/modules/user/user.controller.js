import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hasdPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTROUND)
    );
    const user = await userModel.create({
      userName,
      email,
      password: hasdPassword,
    });
    return res.json({ message: "success", user });
  } catch (err) {
    return res.json({ message: "error", err: err.stack });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Invalid data" });
    }
    var token = jwt.sign({ id: user._id }, process.env.LOGINTOKEN, {
      expiresIn: "1d",
    });
    return res.json(token);
  } catch (err) {
    return res.json({ message: "error", err });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    return res.json(user);
  } catch (err) {
    return res.json({ message: "error", err });
  }
};

export const deleteUser = async (req, res) => {
  try {
   
    const user = await userModel.deleteOne({ _id: req.userId });
    return res.json(user);
  } catch (err) {
    return res.json({ message: "error", err });
  }
};

export const UpdateUser = async (req, res) => {
  try {
  
    
    const { email } = req.body;
    const user = await userModel.findOneAndUpdate({ _id: req.userId }, { email: email },{new:true});
    
      return res.json(user);
    
  } catch (err) {
    return res.json({ message: "error", err });
  }
};
