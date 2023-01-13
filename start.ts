const { fork } = require('child_process')
import { Dirent, readdir } from 'fs'

const getDirectories = (
  source: string,
  callback: (folders: string[]) => void
) =>
  readdir(
    source,
    { withFileTypes: true },
    (err: NodeJS.ErrnoException | null, files: Dirent[]) => {
      if (err) {
        throw err
      } else {
        callback(
          files
            .filter((dirent: Dirent) => dirent.isDirectory())
            .map((dirent: Dirent) => dirent.name)
        )
      }
    }
  )

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

getDirectories('./services', startServices)
