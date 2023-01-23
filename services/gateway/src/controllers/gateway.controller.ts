import { Request, Response } from 'express'
import httpProxy from 'http-proxy'
import { Env, urls } from '../../contracts/urls.config'
import { ResourceNotFoundError } from '../errors/common'
import { errorHandler } from '../errors/error-handler'
import AppLogger from '../utils/Logger'

const env: Env = (process.env.NODE_ENV as Env) || 'development'

const proxy = httpProxy.createProxyServer({})
const logger = new AppLogger()

export default class GatewayController {
  constructor() {
    proxy.on('error', (error: any, req, res) => {
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
    const serviceName = getServiceName(req.originalUrl)
    const redirectService = urls[env][serviceName]

    if (!redirectService) {
      errorHandler(req, res, new ResourceNotFoundError())
      return
    }

    // ----------- Redirect
    const redirectUrl = redirectService.url

    if (redirectUrl) {
      proxy.web(req, res, { target: redirectUrl, changeOrigin: true })
    } else {
      errorHandler(req, res, new ResourceNotFoundError())
      return
    }
  }
}

const getServiceName = (url: string) =>
  url.split('/g/')[1].split('/')[0].replace(/s$/, '')
