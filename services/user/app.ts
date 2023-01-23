import http from 'http'
import express, { json } from 'express'
import cors from 'cors'

import userRoutes from './src/routes/user.routes'
import loggingMiddleware from './src/middleware/logging.middleware'
import { appLoggerFactory } from './src/utils/logger'

import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const app = express()
const server = new http.Server(app)

//------------- parse env vars
const { name, port, listen } = {
  name: process.env.SERVICE_NAME,
  port: process.env.SERVICE_PORT,
  listen: true,
}

//------------- parsing body
app.use(json())

//------------- cors
app.use(cors())

//------------- logging middleware
app.use(loggingMiddleware)

//------------- healthcheck
app.get('/healthCheck', (req, res) => res.json('ok'))

//------------- routes
app.use('/users', userRoutes)

//------------- keep alive
server.keepAliveTimeout = 65000
server.headersTimeout = 66000

//------------- starting the app
const start = () => {
  const productionMode = process.env.NODE_ENV === 'production'
  const logger = appLoggerFactory(`${name}:${port} - main`, productionMode)

  app.listen(port, () => {
    logger.info(`${name} service started in port ${port}`)
  })
}

if (listen) start()

export default app
