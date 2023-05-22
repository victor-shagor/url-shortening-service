import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

describe('routes', () => {
    let mongoServer: MongoMemoryServer
    let shortUrl: string
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.connection.close()
        await mongoServer.stop()
    })

    it('should display welcome', async () => {
        const res = await request(app).get('/')
        expect(res.body.message).toEqual('Welcome to url shortener api')
        expect(res.status).toEqual(200)
    })
    it('should display route not found', async () => {
        const res = await request(app).get('/invalid/route')
        expect(res.body.message).toEqual('route not found')
        expect(res.status).toEqual(404)
    })

    describe('encode route', () => {
        it('should create a short url', async () => {
            const res = await request(app).post('/api/encode').send({
                originalUrl: 'https://www.examples.com/',
            })

            shortUrl = res.body.data.shortUrl

            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('data')
            expect(res.body.message).toBe('short url created succesfully')
        })

        it('should return an error if url provided is not valid', async () => {
            const res = await request(app).post('/api/encode').send({
                originalUrl: 'examples',
            })
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('error')
            expect(res.body.message).toBe('please provide a valid url')
        })
    })
    describe('decode route', () => {
        it('should return original url', async () => {
            const res = await request(app).get(`/api/decode?url=${shortUrl}`)

            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body.message).toBe('original url fetched succesfully')
        })

        it('should return an error if url provided is not valid', async () => {
            const res = await request(app).get('/api/decode')
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('error')
            expect(res.body.message).toBe('please provide a valid url')
        })
    })

    describe('simulating a 500 error', () => {
        beforeAll(async () => {
            await mongoose.connection.close()
        })
        it('should throw 500 error if db is not avalable', async () => {
            const res = await request(app).post('/api/encode').send({
                originalUrl: 'https://www.examples.com/',
            })
            expect(res.status).toEqual(500)
            expect(res.body).toHaveProperty('error')
            expect(res.body.message).toBe(
                'Something went wrong, try again later'
            )
        })
        it('should return original url', async () => {
            const res = await request(app).get(`/api/decode?url=${shortUrl}`)

            expect(res.status).toEqual(500)
            expect(res.body).toHaveProperty('error')
            expect(res.body.message).toBe(
                'Something went wrong, try again later'
            )
        })
    })
})
