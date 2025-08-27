import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  agent: { type:mongoose.SchemaTypes.ObjectId, ref:"Record", required: true },
  date: { type: Date, default: Date.now , required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model("Transaction", TransactionSchema);