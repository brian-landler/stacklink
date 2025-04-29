import colors from 'colors'
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB connected at ${url}`) )
    } catch (error) {
        console.log(colors.bgWhite.red.bold(error.message ))
        process.exit(1)
    }
}