import { string } from "joi";
import { model, Schema, Document } from "mongoose";

export interface IUserReg extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  file: {
    type: Object,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  family: {
    type: String,
    required: false,
  },
  profileCompleted:{
    type: Boolean,
    required: false,
  }
});
export default model<IUserReg>("user", UserSchema);
