import { Schema, model } from "mongoose";
import { typesOfACs } from "../ac-services-service/acServices.model.js";
const contactSchema = new Schema({
  identification: {
    type: String,
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
    typeOfCall: {
      type: Schema.Types.String,
      default: "R&S",
      enum: ["R&S", "PMS"],
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
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
reportsSchema.index({ createdAt: -1 });
const Report = model("report", reportsSchema);
export default Report;
