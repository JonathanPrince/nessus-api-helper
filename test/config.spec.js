/* global expect, test */
const Helper = require('../index')

test('default config', async () => {
  const helper = new Helper({})

  expect(helper.baseUrl).toBe('https://localhost:8834')
})

test('user defined config', async () => {
  const helper = new Helper({
    host: 'test-host',
    protocol: 'http',
    port: '18834'
  })

  expect(helper.baseUrl).toBe('http://test-host:18834')
})
