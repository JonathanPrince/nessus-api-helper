const request = require('axios')
const https = require('https')

module.exports = class {
  constructor (config) {
    const protocol = config.protocol || 'https'
    const host = config.host || 'localhost'
    const port = config.port || 8834
    this.baseUrl = `${protocol}://${host}:${port}`
    this.username = config.user
    this.password = config.pass
  }

  async authenticate () {
    const url = `${this.baseUrl}/session`
    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    const body = {
      username: this.username,
      password: this.password
    }
    const session = await request.post(url, body, { httpsAgent })

    this.token = session.data.token

    this.requestConfig = {
      httpsAgent,
      headers: { 'X-Cookie': `token=${this.token}` }
    }
  }

  async getScans () {
    const url = `${this.baseUrl}/scans`
    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanById (id) {
    const url = `${this.baseUrl}/scans/${id}`
    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanHost (scanId, hostId) {
    const url = `${this.baseUrl}/scans/${scanId}/hosts/${hostId}`
    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanHostPlugin (scanId, hostId, pluginId) {
    const url = `${this.baseUrl}/scans/${scanId}/hosts/${hostId}/plugins/${pluginId}`
    const response = await request.get(url, this.requestConfig)

    return response.data
  }
}
