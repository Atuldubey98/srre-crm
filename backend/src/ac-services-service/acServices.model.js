import { Schema, model } from "mongoose";
export const typesOfACs = [
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
];

const acServiceSchema = new Schema(
  {
    typeOfAC: {
      type: String,
      enum: typesOfACs,
      default: "otherac",
    },
    serviceName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ACService = model("acservice", acServiceSchema);
acServiceSchema.index({ typeOfAC: "text" });

export default ACService;
