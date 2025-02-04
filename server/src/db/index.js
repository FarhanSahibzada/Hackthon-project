import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


export const DBconnect = async () => {
    try {
        const mongooseConnect = await mongoose.connect(process.env.MONOGODB_URL,{
            dbName : process.env.DB_NAME,
        })
        console.log("mongodb is connected ", mongooseConnect.connection.host);
    } catch (error) {
        console.log("error when conecting the db", error)
        process.exit(1)
    }
}