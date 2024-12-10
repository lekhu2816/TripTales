import mongoose from "mongoose";
const url=process.env.DATABASE_URL;
const connectDB=async()=>{
    try {
       const conn= await mongoose.connect(url);
        console.log("DATABASE CONNECTED SUCCESSFULLY !")
    } catch (error) {
       console.log("ERROR WHILE CONNECTING DATABASE");
       process.exit(1); // 1 means failure 0 means success
    }
}
export default connectDB;