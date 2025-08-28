import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
}, { timestamps: true });

sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); 

export default mongoose.model("Session", sessionSchema);
