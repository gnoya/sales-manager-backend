const { fork } = require('child_process')
import exportGlobal from './global/export'
import { getDirectories } from './global/utils/utils'

const startServices = (services: string[]) =>
  services.forEach((service) => {
    //---------------- fork the node service
    let child = fork(`${__dirname}/services/${service}/app`, [], {
      silent: true,
      stdio: 'inherit',
    })

    //---------------- catch error
    child.on('error', (error: NodeJS.ErrnoException) => {
      console.log(`${service} service process error: ${error.message}`)
    })

    child.on('close', (code: number) => {
      console.log(`${service} service process exited with code ${code}`)
    })
  })

exportGlobal()
startServices(getDirectories('./services'))
