import { RequestHandler } from "express";
import userModel from "../model/user.model";
import createHttpError from "http-errors";
import { JWT_SECRET } from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserRegistration: RequestHandler = async (req, res, next) => {
  const { name, email, password, role }: IUserReg = req.body;
  try {
    const alreadyExist = await userModel.findOne({ email });
    if (alreadyExist) {
      res.json({
        message: "already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      role,
      password: hashedPassword,
    });
    newUser.save();
    res.json({
      message: "User Created successfully",
    });
  } catch (error) {
    throw next(createHttpError.InternalServerError);
  }
};

const userLogin: RequestHandler = async (req, res, next) => {
  const { email, password, role }: IUserLog = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    const roleMatch = user.role === role;
    if (!passwordMatch || !roleMatch) {
      return res.status(401).json({ error: "Invalid  password or role" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const userData = {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    res.json({ token, userData });
  } catch (error) {
    throw next(createHttpError.InternalServerError);
  }
};
export { UserRegistration, userLogin };
