import { Consumer } from 'sqs-consumer'
import config from './config/environment.config'
import Logger from './plugins/burzum.plugin'
import { logError } from './utils/burzum-log'
import { STATUS } from './utils/enums'

const consumer = Consumer.create({
  batchSize: parseInt(config.plugins.sqs.consumer.batchSize, 10),
  queueUrl: config.plugins.sqs.consumer.queueUrl,

  handleMessage: async (message) => {
    console.log(`receiver message: ${message.Body}`)
    Logger.info(`receiver message: ${message.Body}`)
  }
})

consumer.on('error', (err) => {
  console.log(err.message)
  logError({
    error: err.message,
    status: STATUS.FAILED
  })
})

consumer.on('processing_error', (err) => {
  console.log(err.message)
  logError({
    error: err.message,
    status: STATUS.PROCESSING_ERROR
  })
})

consumer.start()
