export enum STATUS {
  FAILED = 'FAILED',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  INVALID_PAYLOAD = 'INVALID_PAYLOAD',
  INVALID_EVENT = 'INVALID_EVENT',
}

export enum MAESTRO_EVENTS {
  PAID = 2,
  INVOICED = 7,
  DELIVERED = 10,
  DELIVERED_TO_CARRIER = 18,
  ORDER_COLLECTED_SELLER = 225,
  LABEL_CREATED = 230,
  SHIPPING_CREATED = 291,
}
