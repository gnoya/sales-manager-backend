import { Dirent, readdirSync, createReadStream, createWriteStream } from 'fs'

const exportingConfiguration: Record<string, string[]> = {
  user: ['user', 'sale', 'auth'],
  product: ['product', 'sale'],
  sale: ['sale'],
  auth: ['auth', 'gateway'],
  gateway: [],
}

const getContractFileNames = (source: string): string[] =>
  readdirSync(source, { withFileTypes: true })
    .filter(
      (dirent: Dirent) =>
        !dirent.isDirectory() &&
        dirent.name !== 'export.ts' &&
        dirent.name !== 'urls.config.ts'
    )
    .map((dirent: Dirent) => dirent.name)

const getServiceName = (filename: string) => filename.split('.contract')[0]

const assertExportConfiguration = (fileNames: string[]) => {
  fileNames.forEach((fileName: string) => {
    const serviceName = getServiceName(fileName)
    if (!exportingConfiguration[serviceName]) {
      throw `You did not add ${serviceName} service to your exporting configuration`
    }
  })
  console.log('Exporting configuration OK, starting to export:')
}

const exportContractFiles = (fileNames: string[]) => {
  fileNames.forEach((fileName: string) => {
    const serviceName = getServiceName(fileName)

    const exportingServices = exportingConfiguration[serviceName]

    exportingServices.forEach((service: string) => {
      const exportPath = `${__dirname}/../services/${service}/contracts/${fileName}`
      console.log(
        `Exporting ${fileName} to ${service} service at ${exportPath}`
      )
      createReadStream(`${__dirname}/${fileName}`).pipe(
        createWriteStream(exportPath)
      )
    })
  })
}

const exportUrls = () => {
  console.log('Exporting URLs:')
  for (let service in exportingConfiguration) {
    const exportPath = `${__dirname}/../services/${service}/contracts/urls.config.ts`
    console.log(
      `Exporting urls.config.ts to ${service} service at ${exportPath}`
    )
    createReadStream(`${__dirname}/urls.config.ts`).pipe(
      createWriteStream(exportPath)
    )
  }
}

export default function exportContracts() {
  const contractFileNames = getContractFileNames(__dirname)
  assertExportConfiguration(contractFileNames)
  exportContractFiles(contractFileNames)
  exportUrls()
}
