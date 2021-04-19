import { logError } from '../utils/burzum-log'
import { MAESTRO_EVENTS, STATUS } from '../utils/enums'
import { EventMessage } from '../utils/types'

/*
  TODO: Call correctly methods do save messages by events
*/
export const processEvent = (eventMessage: EventMessage): Boolean => {
  switch (eventMessage.status) {
    case MAESTRO_EVENTS.PAID:
      console.log('RECEIVED PAID EVENT')
      return true
    case MAESTRO_EVENTS.INVOICED:
      console.log('RECEIVED INVOICED EVENT')
      return true
    case MAESTRO_EVENTS.DELIVERED:
      console.log('RECEIVED DELIVERED EVENT')
      return true
    case MAESTRO_EVENTS.DELIVERED_TO_CARRIER:
      console.log('RECEIVED DELIVERED_TO_CARRIER EVENT')
      return true
    case MAESTRO_EVENTS.ORDER_COLLECTED_SELLER:
      console.log('RECEIVED ORDER_COLLECTED_SELLER EVENT')
      return true
    case MAESTRO_EVENTS.LABEL_CREATED:
      console.log('RECEIVED LABEL_CREATED EVENT')
      return true
    case MAESTRO_EVENTS.SHIPPING_CREATED:
      console.log('RECEIVED SHIPPING_CREATED EVENT')
      return true
    default:
      logError({
        error: 'Event invalid to process has found.',
        payload: JSON.stringify(eventMessage),
        status: STATUS.INVALID_EVENT
      })
      return false
  }
}
