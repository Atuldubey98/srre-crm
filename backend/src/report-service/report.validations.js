import Joi from "joi";
import { acTypeSchema } from "../ac-services-service/acServices.validation.js";

const contactSchema = Joi.object({
  identification: Joi.string().required(),
  contactNumber: Joi.string(),
});

const acModelSchema = Joi.object({
  tonnage: Joi.number(),
  modelNumber: Joi.string(),
  typeOfAC: acTypeSchema,
  services: Joi.array().items(Joi.string()).default([]),
});

const reportFilterSchema = Joi.object({
  customer: Joi.string().optional(),
  customerAddress: Joi.string().optional(),
  serviceDate: Joi.date().optional(),
  status: Joi.string()
    .valid("Complete", "Incomplete", "Material Pending")
    .optional(),
});
const reportsSchema = Joi.object({
  customer: Joi.string().required(),
  customerAddress: Joi.string().required(),
  technician: Joi.string().optional(),
  serviceDate: Joi.date().default(Date.now),
  siteContactPerson: contactSchema,
  status: Joi.string()
    .valid("Complete", "Incomplete", "Material Pending")
    .required(),
  description: Joi.string().default(""),
  acMetaInfo: Joi.array().items(acModelSchema),
});
export { reportsSchema, acModelSchema, contactSchema, reportFilterSchema };
