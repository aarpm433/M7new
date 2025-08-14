import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  name: { type:String, required: true },
  region: { type:String, required: true },
  rating: { type:String, required: true },
  fee: { type:String, required: true },
  sales: { type:String, required: true },
});

export default mongoose.model("Record", RecordSchema);