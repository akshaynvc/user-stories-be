import joi from "joi";

export const userRegSchema = {
  userData: joi.object({
    name: joi.string(),
    email: joi.string(),
    role: joi.string(),
    password: joi.string(),
  }),
};

export const userLogSchema = {
  userData: joi.object({
    email: joi.string(),
    role: joi.string(),
    password: joi.string(),
  }),
};
