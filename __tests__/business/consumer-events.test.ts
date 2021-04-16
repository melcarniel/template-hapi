/* eslint-disable @typescript-eslint/no-floating-promises */
import ConsumerEvents from '../../src/business/consumer-events'
import * as log from '../../src/utils/burzum-log'
import { mockMessage, mockInvalidMessage } from './mock'
const events: ConsumerEvents = new ConsumerEvents()

const mockError: Error = {
  name: 'error',
  message: 'erro ao processar evento'
}

it('handleEvents', () => {
  const mockLog = jest.spyOn(log, 'logInfo')
  events.handleEvents(mockMessage)

  expect(mockLog).toHaveBeenCalledTimes(1)
})

it('handleEvents with invalid messsage', () => {
  const mockLog = jest.spyOn(log, 'logInfo')
  events.handleEvents(mockInvalidMessage)

  expect(mockLog).toHaveBeenCalledTimes(2)
})

it('handleProcessingError', () => {
  const mockLog = jest.spyOn(log, 'logError')
  events.handleProcessingError(mockError, mockMessage)

  expect(mockLog).toHaveBeenCalledTimes(1)
})

it('handleError', () => {
  const mockLog = jest.spyOn(log, 'logError')
  events.handleError(mockError)

  expect(mockLog).toHaveBeenCalledWith({
    error: 'erro ao processar evento',
    status: 'FAILED'
  })
})
