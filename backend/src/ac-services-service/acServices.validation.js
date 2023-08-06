import Joi from "joi";

const acTypeSchema = Joi.string()
  .valid(
    "splitac",
    "windowac",
    "centralac",
    "portableac",
    "ductless-mini-splitac",
    "packageac",
    "floor-mountedac",
    "towerac",
    "hybridac",
    "geo-thermalac",
    "evaporative-coolerac",
    "chiller-waterac",
    "otherac",
    "all"
  )
  .default("otherac");
const newACServiceSchema = Joi.object({
  typeOfAC: acTypeSchema,
  serviceName: Joi.string().required(),
});

export { newACServiceSchema, acTypeSchema };
