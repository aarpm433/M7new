import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../db/Schemas/UserSchema.js";

dotenv.config

const MONGO_URI = process.env.ATLAS_URI;

// Get user details from command-line arguments
const [first_name, last_name, email, password] = process.argv.slice(2);

if (!first_name || !last_name || !email || !password) {
  console.error("Usage: node routes/addUser.js <first_name> <last_name> <email> <password>");
  process.exit(1);
}

async function addUser() {
  await mongoose.connect(MONGO_URI);

  const user = new User({
    first_name,
    last_name,
    email,
    password,
  });

  await user.save();
  console.log("User added!");
  mongoose.disconnect();
}

addUser();