import http from 'http'
import express, { json } from 'express'
import cors from 'cors'

import productRoutes from './src/routes/product.routes'
import loggingMiddleware from './src/middleware/logging.middleware'

const app = express()
const server = new http.Server(app)

//------------- parse args
const { name, port, listen } = {
  name: 'Product',
  port: 3002,
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
app.use('/products', productRoutes)

//------------- keep alive
server.keepAliveTimeout = 65000
server.headersTimeout = 66000

//------------- starting the app
const start = () => {
  app.listen(port, () => {
    console.info(`${name} service started in port ${port}`)
  })
}

if (listen) start()

export default app
