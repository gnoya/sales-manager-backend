import { Request, Response } from 'express'
import httpProxy from 'http-proxy'
import { Env, urls } from '../../contracts/urls.config'
import { ResourceNotFoundError } from '../errors/common'
import { errorHandler } from '../errors/error-handler'
import AppLogger from '../utils/Logger'

const env: Env = (process.env.NODE_ENV as Env) || 'development'

const proxy = httpProxy.createProxyServer({ secure: false })
const logger = new AppLogger()

export default class GatewayController {
  constructor() {
    proxy.on('error', (error: any, req, res) => {
      console.log('error')
      if (!req.url?.includes('socket.io')) {
        logger.error(`API gateway disconnect on URL ${req.url}`)
        logger.error(error)
      }
      res.end(`API gateway disconnect on URL ${req.url}`)
    })
  }

  /*
   */
  async gateway(req: Request, res: Response) {
    // Get the service name from the URL
    const serviceName = getServiceName(req.originalUrl)

    // Get the service's URL info using the env and the service name
    const redirectService = urls[env][serviceName]

    // If the service is not found return 404 not found
    if (!redirectService) {
      errorHandler(req, res, new ResourceNotFoundError())
      return
    }

    // Extract service's url
    const redirectUrl = redirectService.url

    // If url is defined, proxy to it
    if (redirectUrl) {
      proxy.web(req, res, { target: redirectUrl, changeOrigin: true })
    } else {
      errorHandler(req, res, new ResourceNotFoundError())
      return
    }
  }
}

// Get the name from the URL and returns it in singular
const getServiceName = (url: string) =>
  url.split('/g/')[1].split('/')[0].replace(/s$/, '')
