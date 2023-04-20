import * as express from 'express'
import helmet from 'helmet'
import * as cors from 'cors'
import 'reflect-metadata'
require('dotenv').config()

import { AppDataSource } from './data-source'

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })
