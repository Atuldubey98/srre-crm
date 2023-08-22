import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Address = model("address", addressSchema);
export default Address;
