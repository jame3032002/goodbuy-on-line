const functions = require('firebase-functions')

const { reply } = require('./helpers/line')
const { clearItem } = require('./helpers/firestore')
const { showHelp, showItems, defaultMessage, compareItems } = require('./helpers')
const region = 'asia-southeast1'

exports.lineWebhook = functions.region(region).https.onRequest(async (req, res) => {
  const event = req.body.events[0]
  const isMessage = event?.type === 'message'
  const isTextMessage = event?.message?.type === 'text'

  if (isMessage && isTextMessage) {
    const userID = event.source.userId
    const textMessage = event.message.text.toLowerCase()
    const replyToken = event.replyToken

    switch (textMessage) {
      case 'clear':
        await clearItem({ userID })
        reply({ replyToken, message: 'Clear item' })
        break
      case 'help':
        showHelp({ replyToken })
        break
      case 'ls':
        await showItems({ replyToken, userID })
        break
      case 'compare':
        await compareItems({ replyToken, userID })
        break
      default:
        await defaultMessage({ replyToken, userID, textMessage })
    }
  }

  return res.status(200).send('OK')
})
