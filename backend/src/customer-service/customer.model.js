import { Schema, model } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    address: {
      type: Schema.Types.Array,
      ref: "address",
      default: [],
    },
    contact: {
      name: String,
      phoneNumber: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
customerSchema.index({ name: "text" });
const Customer = model("customer", customerSchema);
export default Customer;
