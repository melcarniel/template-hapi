import { logError, logInfo } from '../utils/burzum-log'
import { STATUS } from '../utils/enums'
import { SQSMessage } from '../utils/types'

export default class ConsumerEvents {
  async handlerEvents (message: SQSMessage): Promise<void> {
    logInfo({ payload: message.Body })
  }

  getProcessingError (err: Error, message: SQSMessage): void {
    logError({
      error: err.message,
      payload: JSON.stringify(message),
      status: STATUS.PROCESSING_ERROR
    })
  }

  getError (err: Error): any {
    logError({
      error: err.message,
      status: STATUS.FAILED
    })
  }
}
