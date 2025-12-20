import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Db connected successfully")
    } catch(error){
        console.error("Error connecting MongoDb: " + error)
        process.exit(1);
    }

}