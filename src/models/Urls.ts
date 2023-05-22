import mongoose from 'mongoose'

const Schema = mongoose.Schema

export type Url = {
    originalUrl: string
    shortUrl: string
    visits: number
    urlPath: string
}

const UrlSchema = new Schema(
    {
        originalUrl: { type: String, required: true },
        shortUrl: { type: String, required: true },
        visits: { type: Number, default: 0 },
        urlPath: { type: String, unique: true, required: true },
    },
    { timestamps: { createdAt: 'created_at' } }
)

export const UrlModel = mongoose.model('urls', UrlSchema)
