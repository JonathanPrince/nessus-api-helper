module.exports = {
  get (url, config) {
    return Promise.resolve({ data: { url, config } })
  },
  post (url, body, config) {
    const token = Buffer.from(`${body.username}:${body.password}`).toString('base64')
    return Promise.resolve({ data: { token } })
  }
}
