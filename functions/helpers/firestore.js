const admin = require('firebase-admin')
admin.initializeApp()

function clearItem({ userID }) {
  return new Promise((resolve, reject) => {
    admin.firestore().collection('users').doc(userID).set({
      items: []
    }).then(function () {
      resolve()
    }).catch(function (error) {
      reject(error)
    })
  })
}

function updateItems({ userID, items }) {
  return new Promise((resolve, reject) => {
    admin.firestore().collection('users').doc(userID).update({
      items
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

function addItems({ userID, items }) {
  return new Promise((resolve, reject) => {
    admin.firestore().collection('users').doc(userID).update({
      items: admin.firestore.FieldValue.arrayUnion(...items)
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

function getItemsFromUserID({ userID }) {
  return new Promise((resolve, reject) => {
    admin.firestore().collection('users').doc(userID)
      .get()
      .then((doc) => {
        resolve(doc.data())
      }).catch((error) => {
        reject(error)
      })
  })
}

module.exports = {
  addItems,
  clearItem,
  updateItems,
  getItemsFromUserID
}
