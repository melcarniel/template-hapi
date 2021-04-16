import { processEvent } from '../../src/business/process-events'
import { MAESTRO_EVENTS } from '../../src/utils/enums'
import { eventMessage } from './mock'

it('Should process event message PAID received ', () => {
  eventMessage.status = MAESTRO_EVENTS.PAID
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should process event message INVOICED received ', () => {
  eventMessage.status = MAESTRO_EVENTS.INVOICED
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should process event message DELIVERED received ', () => {
  eventMessage.status = MAESTRO_EVENTS.DELIVERED
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should process event message DELIVERED_TO_CARRIER received ', () => {
  eventMessage.status = MAESTRO_EVENTS.DELIVERED_TO_CARRIER
  expect(processEvent(eventMessage)).toBe(true)
});

it('Should process event message ORDER_COLLECTED_SELLER received ', () => {
  eventMessage.status = MAESTRO_EVENTS.ORDER_COLLECTED_SELLER
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should process event message LABEL_CREATED received ', () => {
  eventMessage.status = MAESTRO_EVENTS.LABEL_CREATED
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should process event message SHIPPING_CREATED received ', () => {
  eventMessage.status = MAESTRO_EVENTS.SHIPPING_CREATED
  expect(processEvent(eventMessage)).toBe(true)
})

it('Should not process event message INVALID_EVENT received ', () => {
  eventMessage.status = 999
  expect(processEvent(eventMessage)).toBe(false)
})
