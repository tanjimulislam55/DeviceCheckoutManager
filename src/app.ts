import express, { Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import 'reflect-metadata'
require('dotenv').config()

import employeeRoutes from './routes/employeeRoutes'
import deviceRoutes from './routes/deviceRoutes'
import companyRoutes from './routes/companyRoutes'
import checkoutRoutes from './routes/deviceCheckoutRoutes'
import userRoutes from './routes/userRoutes'
import AppDataSource from './ormconfig'

const app = express()

// middlewares
app.use(helmet())
app.use(cors<Request>())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/employees', employeeRoutes)
app.use('/devices', deviceRoutes)
app.use('/companies', companyRoutes)
app.use('/', checkoutRoutes)
app.use('/users', userRoutes)

// root
app.get('/', async (_req: Request, res: Response) => {
    res.json({ message: 'welcome!' })
})

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
