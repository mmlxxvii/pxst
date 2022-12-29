import mongoose from "mongoose"
import "dotenv/config"

export const connectToDatabase = () => {
    const DATABASE_URI: string = process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/pxst"

    mongoose.set("strictQuery", false)
    mongoose.connect(DATABASE_URI)
        .then(() => console.log("You're in!"))
        .catch((err) => console.log(`Error --> ${err.message}`))
}