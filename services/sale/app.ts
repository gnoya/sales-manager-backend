import http from 'http'
import express, { json } from 'express'
import cors from 'cors'

import saleRoutes from './src/routes/sale.routes'
import loggingMiddleware from './src/middleware/logging.middleware'
import { appLoggerFactory } from './src/utils/logger'

const app = express()
const server = new http.Server(app)

//------------- parse args
const { name, port, listen } = {
  name: 'Sale',
  port: 3001,
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
app.use('/sales', saleRoutes)

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
