import { nanoid } from 'nanoid'
import { Url, UrlModel } from '../models/Urls'
import { config } from '../config/env'
import { HttpError } from '../utils'

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

/**
 * Helps decode a short url to it's original url
 * @param {string} url - short url to be decoded
 * @returns {string} - the original url of the provided short url
 */
export const decode = async (url: string): Promise<string> => {
    const urlExist = await UrlModel.findOne({ shortUrl: url })

    if (urlExist) {
        return urlExist.originalUrl
    }

    throw new HttpError('url not found', 404)
}

/**
 * fetches url object from the database using pathname
 * @param {string} path - url path
 * @returns {object} - url object
 */
export const statistics = async (path: string): Promise<Url> => {
    const pathExist = await UrlModel.findOne({ urlPath: path })

    if (pathExist) {
        return pathExist
    }

    throw new HttpError('path not found', 404)
}
