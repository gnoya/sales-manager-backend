import {
  createFolderIfNotExists,
  exportFile,
  getFileNames,
} from '../utils/utils'

const exportConfigFiles = (configFiles: string[], services: string[]) => {
  configFiles.forEach((configFile) => {
    services.forEach((service) => {
      const exportFolder = `${__dirname}/../../services/${service}/config`
      const exportPath = `${exportFolder}/${configFile}`

      createFolderIfNotExists(exportFolder)
      exportFile(`${__dirname}/${configFile}`, exportPath)
    })
  })
}

export const exportConfig = (services: string[]) => {
  const configFileNames = getFileNames(__dirname)
  exportConfigFiles(configFileNames, services)
}
