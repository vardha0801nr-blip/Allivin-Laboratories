import mongoose from "mongoose";

const companyContentSchema = new mongoose.Schema(
  {
    about: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    values: [{ type: String }],
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    certifications: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("CompanyContent", companyContentSchema);
