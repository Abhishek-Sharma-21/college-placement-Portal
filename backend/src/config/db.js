import mongoose from "mongoose";

export async function connectMongo() {
  try {
    // Check if MongoDB URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit if can't connect to database
  }
}

// Optional: Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err.message);
});
