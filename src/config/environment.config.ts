import dotenv from 'dotenv'
import * as path from 'path'
import * as pack from '../../package.json'

(() => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  const NODE_ENV = process.env.NODE_ENV
  dotenv.config({ path: path.join(__dirname , `/../../env/.env-${NODE_ENV}`) })
})()

const config = {
  env: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME ? process.env.APP_NAME : 'isupply-consumer',
  projectVersion: pack.version,
  service: {
    enabled: process.env.ENABLED_SERVICE === 'true'
  },
  apis: {
    magaluEntregas: {
      baseUrl: process.env.MAGALU_ENTREGAS_URL || 'http://mlentregas-sandbox.magazineluiza.com.br',
      timeout: process.env.MAGALU_ENTREGAS_TIMEOUT || '50000',
      secret: {
        id: process.env.MAGALU_CLIENT_ID || '',
        secret: process.env.MAGALU_CLIENT_SECRET || ''
      }
    },
    isupplyApi: {
      baseUrl: process.env.ISUPPLY_API_URL || 'http://localhost:9002/v1/isupply',
      timeout: process.env.ISUPPLY_API_TIMEOUT || '50000',
      token: process.env.ISUPPLY_API_TOKEN || ''
    },
    apiLuiza: {
      baseUrl: process.env.API_LUIZA_URL || 'https://stage.apiluiza.com.br/v3',
      timeout: process.env.API_LUIZA_TIMEOUT || '50000',
      token: process.env.API_LUIZA_TOKEN || ''
    }
  },
  plugins: {
    newrelic: {
      enable: process.env.NEWRELIC_ENABLE ? process.env.NEWRELIC_ENABLE === 'true' : false,
      token: process.env.NEWRELIC_TOKEN || '',
      appName: process.env.APP_NAME ? process.env.APP_NAME : 'isupply-consumer'
    },
    burzum: {
      enabled: process.env.BURZUM_ENABLE ? process.env.BURZUM_ENABLE === 'true' : false,
      host: process.env.BURZUM_HOST ? process.env.BURZUM_HOST : '',
      maxConnectRetries: Number(process.env.BURZUM_MAX_CONNECT_RETRIES || 10),
      port: process.env.BURZUM_PORT ? Number(process.env.BURZUM_PORT) : 5030,
      token: process.env.BURZUM_TOKEN || '',
      retryInterval: Number(process.env.BURZUM_MAX_RETRY_INTERVAL || 100)
    },
    sqs: {
      consumer: {
        queueUrl: process.env.SQS_QUEUE_URL,
        region: process.env.AWS_REGION,
        accessId: process.env.AWS_ACCESS_KEY_ID,
        secretId: process.env.AWS_SECRET_ACCESS_KEY,
        batchSize: process.env.AWS_SQS_CONSUMER_BATCH_SIZE || '1'
      }
    }
  }
}

export default config
