import { HttpError } from '.'

/**
 * validates url string
 * @param {string} url - original url to be encoded
 * @returns {boolean} - returns true if the url is valid and false if it's not
 */
export const validateUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch (err) {
        throw new HttpError('please provide a valid url', 400)
    }
}
