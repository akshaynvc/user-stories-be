import { RequestHandler } from "express";
import userModel from "../model/user.model";

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.json({ users });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { file, height, weight, address, family, name, email, role } = req.body;

  if (req.file) {
    req.body.file = req.body.file.path;
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { file, height, weight, address, family, name, email, role },
      { new: true }
    );
    if (user) {
      res.status(200).json({ message: "User updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getUsers, updateUser, deleteUser };
