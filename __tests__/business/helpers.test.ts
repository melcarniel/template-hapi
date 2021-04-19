import { EventMessage } from '../../src/utils/types'
import { parseEventMessage, isEligible } from '../../src/business/helpers'
import { eventMessage, mockInvalidMessage, mockMessage } from './mock'

it('Should parse event message received to EventMessage', () => {
  const eventMessage: EventMessage = parseEventMessage(mockMessage.Body)

  expect(eventMessage).toHaveProperty('status', 291)
  expect(eventMessage).toHaveProperty('organization', 'magazineluiza')
  expect(eventMessage).toHaveProperty('orderId', '123456789')
  expect(eventMessage).toHaveProperty('seller', 'some-seller')
  expect(eventMessage).toHaveProperty('suborderUUID', '1f322686-76b6-4d63-86ec-4cf3a747921a')
})

it('Should not parse event message received because missing field', () => {
  expect(parseEventMessage(mockInvalidMessage.Body)).toBe(null)
})

it('Should return true to allowed organization magazineluiza', () => {
  expect(isEligible(eventMessage)).toBe(true)
})

it('Should return false to not allowed organization notallowed', () => {
  eventMessage.organization = 'notallowed'
  expect(isEligible(eventMessage)).toBe(false)
})
