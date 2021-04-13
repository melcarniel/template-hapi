/* eslint-disable @typescript-eslint/no-floating-promises */
import ConsumerEvents from '../../src/business/consumer-events'
import * as log from '../../src/utils/burzum-log'
import { SQSMessage } from '../../src/utils/types'

const events: ConsumerEvents = new ConsumerEvents()

const mockMessage: SQSMessage = {
  Body: 'Teste'
}

const mockError: Error = {
  name: 'error',
  message: 'erro ao processar evento'
}

it('handlerEvents', () => {
  const mockLog = jest.spyOn(log, 'logInfo')
  events.handlerEvents(mockMessage)

  expect(mockLog).toHaveBeenCalledTimes(1)
})

it('getProcessingError', () => {
  const mockLog = jest.spyOn(log, 'logError')
  events.getProcessingError(mockError, mockMessage)

  expect(mockLog).toHaveBeenCalledTimes(1)
})

it('getError', () => {
  const mockLog = jest.spyOn(log, 'logError')
  events.getError(mockError)

  expect(mockLog).toHaveBeenCalledWith({
    error: 'erro ao processar evento',
    status: 'FAILED'
  })
})
