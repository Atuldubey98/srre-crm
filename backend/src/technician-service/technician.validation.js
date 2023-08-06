import Joi from "joi";

export const createTechnicianSchema = Joi.object({
  name: Joi.string().required(),
  contactNumber: Joi.string().required(),
  email: Joi.string().email().allow("").optional(),
  currentlyActive: Joi.string().valid("Active", "Inactive").default("Active"),
});
