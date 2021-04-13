import * as index from '../src/index'
import AwsConsumerServer from '../src/external/aws-consumer-server'

it('main', () => {
  const mockConsumer = jest.spyOn(AwsConsumerServer.prototype, 'startConsumer')
  index.main()

  expect(mockConsumer).toHaveBeenCalledTimes(1)
})
