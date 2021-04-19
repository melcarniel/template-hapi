import { logError, logInfo } from '../utils/burzum-log'
import { STATUS } from '../utils/enums'
import { SQSMessage } from '../utils/types'
import { parseEventMessage, isEligible } from './helpers'
import { processEvent } from './process-events'

export default class ConsumerEvents {
  async handleEvents (message: SQSMessage): Promise<void> {
    logInfo({ payload: message.Body })

    const eventMessage = parseEventMessage(message.Body)

    if (eventMessage && isEligible(eventMessage)) {
      processEvent(eventMessage)
    }
  }

  handleProcessingError (err: Error, message: SQSMessage): void {
    logError({
      error: err.message,
      payload: JSON.stringify(message),
      status: STATUS.PROCESSING_ERROR
    })
  }

  handleError (err: Error): any {
    logError({
      error: err.message,
      status: STATUS.FAILED
    })
  }
}
