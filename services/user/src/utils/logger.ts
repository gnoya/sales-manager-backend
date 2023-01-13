import { ISettingsParam, Logger } from 'tslog'

export default class AppLogger extends Logger {
  public static settings?: ISettingsParam = {
    displayInstanceName: true,
    displayFunctionName: false,
    displayFilePath: 'hideNodeModulesOnly',
  }
  public static setup?: (logger: AppLogger) => void

  constructor(settings?: ISettingsParam, setup?: (logger: AppLogger) => void) {
    super(settings || AppLogger.settings)
    AppLogger.settings = settings || AppLogger.settings
    AppLogger.setup = setup || AppLogger.setup
    AppLogger.setup?.(this)
  }
}

export enum LogLevels {
  ERRORS = 'error',
  ALL = 'silly',
}

export function appLoggerFactory(
  instanceName: string,
  productionMode: boolean
) {
  return new AppLogger({
    ...AppLogger.settings,
    instanceName,
    minLevel: productionMode ? LogLevels.ERRORS : LogLevels.ALL,
  })
}
