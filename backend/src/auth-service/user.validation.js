import joi from "joi";
const UserBodySchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const AdminBodySchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  secretKey: joi.string().required(),
});
const LoginBodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
export { AdminBodySchema, LoginBodySchema, UserBodySchema };

