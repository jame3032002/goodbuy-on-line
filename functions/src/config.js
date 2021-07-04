const ACCESS_TOKEN = 'ค่า Channel access token'
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message'
const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ACCESS_TOKEN}`
}

module.exports = {
  LINE_HEADER,
  LINE_MESSAGING_API
}