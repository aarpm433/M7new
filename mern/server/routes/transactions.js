import express from "express";
import Transaction from "../db/Schemas/TransactionSchema.js";
import Record from "../db/Schemas/AgentSchema.js";

const router = express.Router();

// Example GET /transaction-data
router.get("/transaction-data", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("agent", "name") // get only agent name field
      .sort({ date: -1 })
      .limit(10);

    const agents = await Record.find({}, "_id name"); // dropdown list
    console.log("Agents fetched:", agents); // DEBUG



    res.status(200).json({
      status: "ok",
      data: {transactions, agents},
      message: null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error fetching records" });
  }
});

// POST /transaction
router.post("/transaction", async (req, res) => {
  try {
    const { amount, agent_id } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ status: "error", message: "Amount must be positive" });
    }

    const transaction = new Transaction({
      amount,
      agent: agent_id, 
    });

    await transaction.save();
    await transaction.populate("agent", "name"); // populate before sending

    res.status(201).json({ status: "ok", data: transaction, message: "Transaction saved" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;