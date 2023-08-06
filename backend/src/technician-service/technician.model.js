import { Schema, model } from "mongoose";
const technicialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    currentlyActive: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Technician = model("technician", technicialSchema);
export default Technician;
