import Config from '../config/environment.config'
import AWS from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import * as https from 'https'
import ConsumerEvents from '../business/consumer-events'

const configConsumer = Config.plugins.sqs.consumer

export default class AwsConsumerServer {
  readonly consumerEvents = new ConsumerEvents()
  public consumer: Consumer

  getConsumer (): Consumer {
    AWS.config.update({
      region: configConsumer.region,
      accessKeyId: configConsumer.accessId,
      secretAccessKey: configConsumer.secretId
    })

    this.consumer = Consumer.create({
      batchSize: Number(configConsumer.batchSize),
      queueUrl: configConsumer.queueUrl,

      handleMessage: async (message) => {
        await this.consumerEvents.handleEvents(message)
      },
      sqs: new AWS.SQS({
        httpOptions: {
          agent: new https.Agent({
            keepAlive: true
          })
        }
      })
    })

    this.consumer.on('error', (err) => this.consumerEvents.handleError(err))

    this.consumer.on('processing_error', (err, message) => {
      this.consumerEvents.handleProcessingError(err, message)
    })

    return this.consumer
  }

  startConsumer (): void {
    this.getConsumer()
    this.consumer.start()
  }

  stopConsumer (): void {
    if (this.consumer) {
      this.consumer.stop()
    }
  }
}
