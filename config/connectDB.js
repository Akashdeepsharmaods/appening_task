import mongoose from "mongoose";

const connectDB = async (DATA_BASE_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName: process.env.DATABASENAME
        }
        await mongoose.connect(DATA_BASE_URL,DB_OPTIONS)
        console.log("Connected Successfully")
        
    } catch (error) {
        console.log(error)
    }
}
export default connectDB