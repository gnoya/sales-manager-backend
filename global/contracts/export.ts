import {
  createFolderIfNotExists,
  exportFile,
  getFileNames,
  getServiceName,
} from '../utils/utils'

const assertExportConfiguration = (
  contracts: string[],
  exportingConfiguration: Record<string, string[]>
) => {
  // Loop through every contract
  contracts.forEach((fileName: string) => {
    // Get its service name
    const serviceName = getServiceName(fileName)

    // Check if the service is on the exporting configuration
    if (!exportingConfiguration[serviceName])
      throw `You did not add ${serviceName} service to your exporting configuration`
  })
}

const exportContractFiles = (
  contracts: string[],
  exportingConfiguration: Record<string, string[]>
) => {
  // Loop through every contract
  contracts.forEach((contract: string) => {
    // Get its service name
    const serviceName = getServiceName(contract)

    // Get its exportation config
    const exportingServices = exportingConfiguration[serviceName]

    // Export the contract to every service on its config
    exportingServices.forEach((service: string) => {
      const exportFolder = `${__dirname}/../../services/${service}/contracts`
      const exportPath = `${exportFolder}/${contract}`

      createFolderIfNotExists(exportFolder)
      exportFile(`${__dirname}/${contract}`, exportPath)
    })
  })
}

export const exportContracts = (
  exportingConfiguration: Record<string, string[]>
) => {
  const contractFileNames = getFileNames(__dirname)
  assertExportConfiguration(contractFileNames, exportingConfiguration)
  exportContractFiles(contractFileNames, exportingConfiguration)
}
