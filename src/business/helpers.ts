import { logError } from '../utils/burzum-log'
import { STATUS } from '../utils/enums'
import { EventMessage } from '../utils/types'

export const parseEventMessage = (message: string): EventMessage => {
  try {
    const body = JSON.parse(message)

    const event = body.event
    const status = event.status.id
    const organization = body.order.salesChannel.organization.id
    const orderId = body.order.id
    const seller = body.order.subOrder.seller.id
    const suborderUUID = body.order.subOrder.uuid

    return {
      status,
      organization,
      orderId,
      seller,
      suborderUUID
    }
  } catch (err) {
    logError({
      error: err.message,
      payload: JSON.stringify(message),
      status: STATUS.INVALID_PAYLOAD
    })
    return null
  }
}

export const isEligible = (eventMessage: EventMessage): Boolean => {
  /*
    TODO: Define rules to make sure the event message is a valid event
  */
  const allowedOrganizations = ['magazineluiza']

  if (allowedOrganizations.includes(eventMessage.organization)) return true
  return false
}
