const { reply } = require('./line')
const { compare, getItems } = require('./general')
const { HELP_MESSAGE, LIST_ITEMS, COMPARE_RESULT } = require('./messages')
const { getItemsFromUserID, updateItems, addItems } = require('./firestore')

async function showItems({ replyToken, userID }) {
  const { items } = await getItemsFromUserID({ userID })
  const isEmptyItems = items.length < 1

  if (isEmptyItems) {
    reply({ replyToken, message: 'ไม่มีไอเทมในรายการ' })
  } else {
    const message = LIST_ITEMS(items)
    reply({ replyToken, message, type: 'flex', altText: 'ls' })
  }
}

function showHelp({ replyToken }) {
  reply({ replyToken, message: HELP_MESSAGE, type: 'flex', altText: 'help' })
}

async function removeItemFromIndex({ index, userID, replyToken }) {
  const { items } = await getItemsFromUserID({ userID })
  items.splice(index, 1)

  const message = LIST_ITEMS(items)
  updateItems({ items, userID })
  reply({ replyToken, message, type: 'flex', altText: 'removeItem' })
}

async function compareItems({ userID, replyToken }) {
  const { items } = await getItemsFromUserID({ userID })
  const response = compare(items)
  const canNotCompare = response === false

  if (canNotCompare) {
    reply({ replyToken, message: 'หน่วยการวัดไม่ถูกต้อง' })
  } else {
    const { item, index } = response
    const message = COMPARE_RESULT({ item, index })

    reply({ replyToken, message, type: 'flex', altText: 'compareItems' })
  }
}

async function defaultMessage({ replyToken, userID, textMessage }) {
  const regex = /(\d)+,([0-9\.])+,(\d)+,+(l|ml|g|kg)/g
  const isItem = regex.test(textMessage)
  let items

  if (isItem) {
    items = await getItems({ message: textMessage })
    await addItems({ userID, items })

    reply({ replyToken, message: 'Add item successful' })
  } else {
    const message = textMessage.split('rm:')
    const isRemoveItem = message[1]

    if (isRemoveItem) {
      const { items } = await getItemsFromUserID({ userID })

      if (parseInt(message[1]) <= items.length) {
        await removeItemFromIndex({ index: parseInt(message[1] - 1), userID, replyToken })
      }
    }
  }
}

module.exports = {
  showHelp,
  showItems,
  compareItems,
  defaultMessage,
  removeItemFromIndex
}