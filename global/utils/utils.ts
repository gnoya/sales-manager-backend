import {
  Dirent,
  readdirSync,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} from 'fs'

export const getServiceName = (filename: string) =>
  filename.split('.contract')[0]

export const getFileNames = (path: string): string[] =>
  readdirSync(path, { withFileTypes: true })
    .filter((dirent: Dirent) => dirent.name !== 'export.ts')
    .map((dirent: Dirent) => dirent.name)

export const createFolderIfNotExists = (folderName: string) => {
  if (!existsSync(folderName)) {
    mkdirSync(folderName)
  }
}

export const exportFile = (from: string, to: string) => {
  console.log(
    `Exporting ${from.split('/').slice(-1)[0]} to ${
      to.split('../').slice(-1)[0]
    }`
  )
  createReadStream(from).pipe(createWriteStream(to))
}

export const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent: Dirent) => dirent.isDirectory())
    .map((dirent: Dirent) => dirent.name)
