import mongoose from 'mongoose'
import { config } from './env'

const connectToDB = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await mongoose.connect(config.mongoUri)
            console.log('database connected successfully')
        }
    } catch (error) {
        console.log('error connecting to database')
    }
}

export default connectToDB
