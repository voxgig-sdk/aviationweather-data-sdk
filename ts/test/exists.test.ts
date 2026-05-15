
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AviationweatherDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AviationweatherDataSDK.test()
    equal(null !== testsdk, true)
  })

})
