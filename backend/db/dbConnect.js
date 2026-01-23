import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected DB to ", conn.connection.host);
  } catch (err) {
    console.log("Error connecting to DB:", err.message);
    process.exit(1);
  }
};
export default dbConnect;
