import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.mongodbURI);
        console.log("Connected to Mongodb Database👍")

    }catch(error){
        throw new Error(error)
        console.log("Falied to connect to db")
    }

}

export default connectDB;