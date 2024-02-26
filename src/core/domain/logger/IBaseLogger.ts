export interface IBaseLogger {
  debug: (message: string, obj?: object) => void
  info: (message: string, obj?: object) => void
  warn: (message: string, obj?: object) => void
  error: (message: string, obj?: object) => void
  fatal: (message: string, obj?: object) => void
  getLoggerInstance: () => any
}
