import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String },
      suite: { type: String },
      city: { type: String },
      zipcode: { type: String },
      geo: {
        lat: { type: String },
        lng: { type: String },
      },
    },
    phone: { type: String },
    website: { type: String },
    company: {
      name: { type: String },
      catchPhrase: { type: String },
      bs: { type: String },
    },
  },
  { timestamps: true, collection: "Users" }
);

export default mongoose.model("Users", userSchema);