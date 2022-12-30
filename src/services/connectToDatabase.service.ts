import mongoose from "mongoose"
import "dotenv/config"

export const connectToDatabase = () => {
    const DATABASE_URI: string = process.env.DATABASE_URI || ""

    mongoose.set("strictQuery", false)
    mongoose.connect(DATABASE_URI)
        .then(() => console.log("i am in!"))
        .catch((err) => console.log(`Error --> ${err.message}`))
}