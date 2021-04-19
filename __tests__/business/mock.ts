import { EventMessage, SQSMessage } from '../../src/utils/types';

export const mockMessage: SQSMessage = {
  Body:
    '{ "event": { "status": { "id": 291 }}, "order": { "id": "123456789", "salesChannel": { "organization": { "id": "magazineluiza" }}, "subOrder": { "uuid": "1f322686-76b6-4d63-86ec-4cf3a747921a", "seller": { "id": "some-seller" }}}}',
}

export const mockInvalidMessage: SQSMessage = {
  Body:
    '{ "event": { }, "order": { "id": "123456789", "salesChannel": { "organization": { "id": "magazineluiza" }}, "subOrder": { "uuid": "1f322686-76b6-4d63-86ec-4cf3a747921a", "seller": { "id": "some-seller" }}}}',
}

export const eventMessage: EventMessage = {
  status: 291,
  organization: 'magazineluiza',
  orderId: '123456789',
  seller: 'some-seller',
  suborderUUID: '1f322686-76b6-4d63-86ec-4cf3a747921a'
}
