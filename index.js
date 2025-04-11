import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is up at ', PORT)
})

import predictRoute from './routes/predict.routes.js'

app.use('/api', predictRoute)