import Config from '../config/environment.config'
import AWS from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import * as https from 'https'
import ConsumerEvents from '../business/consumer-events'

const configConsumer = Config.plugins.sqs.consumer

export default class AwsConsumerServer {
  readonly consumerEvents = new ConsumerEvents()

  getConsumer (): Consumer {
    AWS.config.update({
      region: configConsumer.region,
      accessKeyId: configConsumer.accessId,
      secretAccessKey: configConsumer.secretId
    })

    const consumer = Consumer.create({
      batchSize: parseInt(configConsumer.batchSize, 10),
      queueUrl: configConsumer.queueUrl,

      handleMessage: async (message) => {
        await this.consumerEvents.handlerEvents(message)
      },
      sqs: new AWS.SQS({
        httpOptions: {
          agent: new https.Agent({
            keepAlive: true
          })
        }
      })
    })

    consumer.on('error', (err) => this.consumerEvents.getError(err))

    consumer.on('processing_error', (err, message) => {
      this.consumerEvents.getProcessingError(err, message)
    })

    return consumer
  }

  startConsumer (): void {
    const consumer = this.getConsumer()
    consumer.start()
  }

  stopConsumer (): void {
    const consumer = this.getConsumer()
    consumer.stop()
  }
}
