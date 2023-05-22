import express from 'express'
import cors from 'cors'

import apiRoute from './routes'
import connectToDB from './config/dbConnection'
import { config } from './config/env'

const app = express()
const port = config.port || 5000

if (process.env.NODE_ENV !== 'test') {
    connectToDB()
}

app.use(cors())
app.use(
    express.urlencoded({
        extended: false,
    })
)
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})

app.use('/api', apiRoute)

app.get('/', (req, res) =>
    res.status(200).send({ message: 'Welcome to url shortener api' })
)

app.use('*', (req, res) =>
    res.status(404).send({
        message: 'route not found',
    })
)

export default app
