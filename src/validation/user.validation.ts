import { RequestHandler } from "express";
import validator from "../utils/validate";
import { userRegSchema,userLogSchema } from "./user.schma";

export const getUserRegDataValidation: RequestHandler = (req, res, next) =>
  validator(userRegSchema.userData, next, req.body);

  export const getUserLogDataValidation: RequestHandler = (req, res, next) =>
  validator(userLogSchema.userData, next, req.body);
