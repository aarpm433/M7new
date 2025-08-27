import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import "./db/connection.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import authRoutes from "./routes/auth.js";
import transactionRouter from "./routes/transactions.js";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", transactionRouter); // or "/api" if you want a prefix
app.use("/record", records);
app.use("/auth", authRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

