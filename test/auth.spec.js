/* global expect, jest, test */
jest.mock('axios')

const Helper = require('../index')
const testConfig = {
  username: 'testuser',
  password: 'secret'
}
const basicAuth = 'dW5kZWZpbmVkOnVuZGVmaW5lZA=='

test('authentication sets token on helper instance', async () => {
  const helper = new Helper(testConfig)

  await helper.authenticate()

  expect(helper.token).toBe(basicAuth)
})

test('token is set in request header', async () => {
  const helper = new Helper(testConfig)

  await helper.authenticate()
  const req = await helper.getScans()

  expect(req.config.headers['X-Cookie']).toBe(`token=${basicAuth}`)
})
