import { Router, Request, Response } from 'express'
import { decode, encode, statistics } from '../controllers/urlShortner'
import { validateUrl } from '../utils/validations'
import { ErrorResponseObject } from '../utils'

const router = Router()

router.post('/encode', async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body

        //validate url provided
        validateUrl(originalUrl)

        //create and return short url
        const shortUrl = await encode(originalUrl)
        return res.status(201).json({
            message: 'short url created succesfully',
            data: { shortUrl },
        })
    } catch (error) {
        //catch and return error
        const { message, statusCode } = ErrorResponseObject(error)
        return res.status(statusCode).json({
            message,
            error: true,
        })
    }
})

router.get('/decode', async (req: Request, res: Response) => {
    try {
        const url = String(req.query.url)

        //validate url provided
        validateUrl(url)

        //get and return original url
        const originalUrl = await decode(url)
        return res.status(200).json({
            message: 'original url fetched succesfully',
            data: { originalUrl },
        })
    } catch (error) {
        //catch and return error
        const { message, statusCode } = ErrorResponseObject(error)
        return res.status(statusCode).json({
            message,
            error: true,
        })
    }
})

router.get('/statistic/:url_path', async (req: Request, res: Response) => {
    try {
        const { url_path } = req.params

        const data = await statistics(url_path)
        return res.status(200).json({
            message: 'stat fetched succesfully',
            data,
        })
    } catch (error) {
        //catch and return error
        const { message, statusCode } = ErrorResponseObject(error)
        return res.status(statusCode).json({
            message,
            error: true,
        })
    }
})

export default router
