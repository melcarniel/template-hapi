import Bunyan from 'bunyan'
import BunyanTCP from 'bunyan-logstash-tcp-fork'
import Config from '../config/environment.config'

interface Options {
  enable: boolean
  appName: string
  token: string
  env: string
  host: string
  port: number
  projectVersion: string
  retryInterval?: number
  maxConnectRetries?: number
}

// Caso esteja habilitado, logs serão enviados remotamente
// Caso não esteja, os logs personalizados serão exibidos localmente.
const Burzum = (options: Options): Bunyan => {
  const {
    enable,
    host,
    port,
    appName,
    env,
    token,
    projectVersion,
    retryInterval = 200,
    maxConnectRetries = 2
  } = options

  return enable
    ? Bunyan.createLogger({
      name: appName,
      env,
      streams: [{
        level: 'info',
        stream: process.stdout
      }, {
        level: 'trace',
        type: 'raw',
        reemitErrorEvents: true,
        stream: BunyanTCP.createStream({
          host,
          port,
          retry_interval: retryInterval,
          max_connect_retries: maxConnectRetries
        }).on('error', console.error)
      }] as Bunyan.Stream[],
      bztoken: token,
      src: true,
      type: 'json',
      version: projectVersion,
      serializers: Bunyan.stdSerializers
    }).on('error', (_err, _stream) => {
      console.error('Could not send logs', _err)
    })
    : Bunyan.createLogger({ name: appName })
}

const {
  env,
  appName,
  projectVersion,
  plugins: {
    burzum: {
      enabled, host, port, token
    }
  }
} = Config

export default Burzum({
  appName,
  env,
  enable: enabled,
  host,
  port,
  projectVersion,
  token,
  retryInterval: 200,
  maxConnectRetries: 2
})
