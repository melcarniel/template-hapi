import Logger from '../plugins/burzum.plugin'

export const logInfo = (obj: any): any => {
  Logger.info(mountObjToLog(obj), 'Request completed')
}

export const logError = (obj: any): any => {
  Logger.error(mountObjToLog(obj), 'Request failed')
}

const mountObjToLog = (obj: any): any => ({
  ...obj,
  'http.latency_seconds': calculateLatency()
})

const calculateLatency = (): any => {
  const hrstart = process.hrtime()
  const hrend = process.hrtime(hrstart)
  return (hrend[0] * 1000000000 + hrend[1]) / 1000000
}
