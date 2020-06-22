/* global expect, jest, test */
jest.mock('axios')

const Helper = require('../index')
const helper = new Helper({})

const API_URL = 'https://localhost:8834'

test('getFolders', async () => {
  const request = await helper.getFolders()

  expect(request.url).toBe(`${API_URL}/folders`)
})

test('getScans without arguments', async () => {
  const request = await helper.getScans()

  expect(request.url).toBe(`${API_URL}/scans`)
})

test('getScans with folder id', async () => {
  const folder = 7357
  const request = await helper.getScans({ folder_id: folder })

  expect(request.url).toBe(`${API_URL}/scans?folder_id=${folder}`)
})

test('getScans with last modification date', async () => {
  const timestamp = 1592581659
  const request = await helper.getScans({ last_modification_date: timestamp })

  expect(request.url).toBe(`${API_URL}/scans?last_modification_date=${timestamp}`)
})

test('getScans with folder id and last modification date', async () => {
  const folder = 7357
  const timestamp = 1592581659
  const request = await helper.getScans({
    folder_id: folder,
    last_modification_date: timestamp
  })

  expect(request.url).toBe(`${API_URL}/scans?folder_id=${folder}&last_modification_date=${timestamp}`)
})

test('getScanById', async () => {
  const testId = 7357
  const request = await helper.getScanById(testId)

  expect(request.url).toBe(`${API_URL}/scans/${testId}`)
})

test('getScanById with history id', async () => {
  const testId = 7357
  const historyId = 42
  const request = await helper.getScanById(testId, historyId)

  expect(request.url).toBe(`${API_URL}/scans/${testId}?history_id=${historyId}`)
})

test('getScanHost', async () => {
  const scanId = 7357
  const hostId = 555
  const request = await helper.getScanHost(scanId, hostId)

  expect(request.url).toBe(`${API_URL}/scans/${scanId}/hosts/${hostId}`)
})

test('getScanHost with history id', async () => {
  const scanId = 7357
  const hostId = 555
  const historyId = 42
  const request = await helper.getScanHost(scanId, hostId, historyId)

  expect(request.url).toBe(`${API_URL}/scans/${scanId}/hosts/${hostId}?history_id=${historyId}`)
})

test('getScanHostPlugin', async () => {
  const scanId = 7357
  const hostId = 555
  const pluginId = 970
  const request = await helper.getScanHostPlugin(scanId, hostId, pluginId)

  expect(request.url).toBe(`${API_URL}/scans/${scanId}/hosts/${hostId}/plugins/${pluginId}`)
})

test('getScanHost with history id', async () => {
  const scanId = 7357
  const hostId = 555
  const pluginId = 970
  const historyId = 42
  const request = await helper.getScanHostPlugin(scanId, hostId, pluginId, historyId)

  expect(request.url).toBe(`${API_URL}/scans/${scanId}/hosts/${hostId}/plugins/${pluginId}?history_id=${historyId}`)
})
