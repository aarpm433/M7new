import express from "express";
import Record from "../db/Schemas/AgentSchema.js";

const router = express.Router();

// Get all records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send("Error fetching records");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).send("Not found");
    res.status(200).json(record);
  } catch (err) {
    res.status(500).send("Error fetching record");
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).send("Error adding record");
  }
});

// Update a record by id
router.patch("/:id", async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).send("Error updating record");
  }
});

// Delete a record by id
router.delete("/:id", async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send("Error deleting record");
  }
});

export default router;