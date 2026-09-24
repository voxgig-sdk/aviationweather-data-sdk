
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AviationweatherDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AviationweatherDataSDK.test()
    equal(testsdk instanceof AviationweatherDataSDK, true,
      'AviationweatherDataSDK.test() must return a client synchronously')
  })

})
