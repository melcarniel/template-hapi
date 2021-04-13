import AwsConsumerServer from './external/aws-consumer-server'
import { logError } from './utils/burzum-log'
import { STATUS } from './utils/enums'

const server: AwsConsumerServer = new AwsConsumerServer()

export const main = (): void => {
  try {
    server.startConsumer()
  } catch (error) {
    logError({
      error: error.message,
      status: STATUS.FAILED
    })
  }
}

main()
