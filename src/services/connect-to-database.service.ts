import "dotenv/config"
import mongoose from "mongoose"

export const connectToDatabase = () => {
    const DATABASE_URI: string = process.env.DATABASE_URI || ""

    mongoose.set("strictQuery", false)
    mongoose.connect(DATABASE_URI)
        .then(() => console.log("i am in!"))
        .catch((err) => console.log(`Error --> ${err.message}`))
}