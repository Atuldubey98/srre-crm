import joi from "joi";
const ContactBody = joi
  .object({
    name: joi.optional(), // Optional string, can be empty or not provided
    phoneNumber: joi.optional(), // Optional string, can be empty or not provided
  })
  .optional();
const CustomerNameContactSchema = joi.object({
  name: joi.string().required(),
  contact: ContactBody,
  createdBy: joi.string().required(),
});
const CustomerAddressSchema = joi.object({ location: joi.string() });
const CustomerBodySchema = joi.object({
  name: joi.string().required(),
  address: joi.array().items(CustomerAddressSchema),
  contact: ContactBody,
  createdBy: joi.string().required(),
});
const UpdateCustomerBody = joi.object({
  name: joi.string().optional(),
  address: joi.array().optional(),
  updatedBy: joi.string().optional(),
  contact: ContactBody,
});

const CustomerIdSchema = joi.string().required();
export {
  CustomerBodySchema,
  UpdateCustomerBody,
  CustomerAddressSchema,
  CustomerIdSchema,
  CustomerNameContactSchema,
};
