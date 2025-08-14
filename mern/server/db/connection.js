import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const URI = process.env.ATLAS_URI;

if (!URI) {
  throw new Error("ATLAS_URI not set in config.env");
}

await mongoose.connect(URI);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
});

export default mongoose;