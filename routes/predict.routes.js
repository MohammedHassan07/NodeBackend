import express from 'express'
import { predict } from '../controller/predict.controller.js'

const route = express.Router()

route.post('/predict', predict)

export default route