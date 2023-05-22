import { nanoid } from 'nanoid'
import { UrlModel } from '../models/Urls'
import { config } from '../config/env'

/**
 * Helps encode a url and save url to the database
 * @param {string} url - original url to be encoded
 * @returns {string} - A short url of the provided url
 */
export const encode = async (url: string): Promise<string> => {
    const urlExist = await UrlModel.findOne({ originalUrl: url })

    if (urlExist) {
        return urlExist.shortUrl
    }

    const hostUrl = config.hostUrl
    const urlPath = nanoid(6)
    const shortUrl = `${hostUrl}/${urlPath}`

    const newUrl = await UrlModel.create({
        originalUrl: url,
        urlPath,
        shortUrl,
    })

    return newUrl.shortUrl
}
