import * as SQS from 'aws-sdk/clients/sqs'

export declare type SQSMessage = SQS.Types.Message

export declare type EventMessage = {
  status: number
  organization: string
  orderId: string
  seller: string
  suborderUUID: string
}
