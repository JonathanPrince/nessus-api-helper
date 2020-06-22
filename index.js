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

  async getFolders () {
    const url = `${this.baseUrl}/folders`
    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScans (params = {}) {
    let url = `${this.baseUrl}/scans`

    if (Object.keys(params).length > 0) {
      const queryParams = []
      for (let param in params) {
        queryParams.push(`${param}=${params[param]}`)
      }
      url += `?${queryParams.join('&')}`
    }

    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanById (id, historyId) {
    let url = `${this.baseUrl}/scans/${id}`

    if (historyId) url += `?history_id=${historyId}`

    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanHost (scanId, hostId, historyId) {
    let url = `${this.baseUrl}/scans/${scanId}/hosts/${hostId}`

    if (historyId) url += `?history_id=${historyId}`

    const response = await request.get(url, this.requestConfig)

    return response.data
  }

  async getScanHostPlugin (scanId, hostId, pluginId, historyId) {
    let url = `${this.baseUrl}/scans/${scanId}/hosts/${hostId}/plugins/${pluginId}`

    if (historyId) url += `?history_id=${historyId}`

    const response = await request.get(url, this.requestConfig)

    return response.data
  }
}
