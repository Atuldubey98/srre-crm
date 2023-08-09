import { Schema, model } from "mongoose";
import { typesOfACs } from "../ac-services-service/acServices.model.js";
const contactSchema = new Schema({
  identification: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
});
const acModelSchema = new Schema({
  tonnage: {
    type: Number,
  },
  modelNumber: {
    type: String,
  },
  typeOfAC: {
    type: String,
    enum: typesOfACs,
    default: "otherac",
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "acservice",
      default: [],
    },
  ],
});
const reportsSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    customerAddress: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    serviceDate: {
      type: Schema.Types.Date,
      default: new Date(Date.now()),
    },
    siteContactPerson: contactSchema,
    status: {
      type: String,
      enum: ["Complete", "Incomplete", "Material Pending"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    acMetaInfo: [acModelSchema],
    technician: {
      type: Schema.Types.ObjectId,
      ref: "technician",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Report = model("report", reportsSchema);
export default Report;
