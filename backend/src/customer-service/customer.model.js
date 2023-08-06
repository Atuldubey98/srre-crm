import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
});
const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    address: [addressSchema],
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
customerSchema.index({ "address.location": "text", name: "text" });
const Customer = model("customer", customerSchema);
export default Customer;
