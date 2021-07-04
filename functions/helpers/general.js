function calculateVolumePerPrice({ item }) {
  const { unit, measurement, price } = item
  const volumeUnit = measurement === 'kg' || measurement === 'l' ? 1000 : 1
  const volume = (volumeUnit * item.volume) * unit
  const volumePerPrice = volume / price

  return volumePerPrice
}

function strCalculateVolumePerPrice({ item }) {
  const UNIT_OF_MEASUREMENT = {
    'kg': 'g',
    'g': 'g',
    'l': 'ml',
    'ml': 'ml'
  }

  const { measurement } = item
  const volumePerPrice = calculateVolumePerPrice({ item })

  return `${new Intl.NumberFormat('th-TH').format(volumePerPrice.toFixed(2))} ${UNIT_OF_MEASUREMENT[measurement]}`
}

function getItems({ message }) {
  let items = []
  let rawItems
  const regex = /(\d)+,([0-9\.])+,(\d)+,+(l|ml|g|kg)/g

  while ((rawItems = regex.exec(message)) !== null) {
    const [unit, volume, price, measurement] = rawItems[0].split(',')
    items.push({ unit, volume, price, measurement })
  }

  return items
}

function checkCanBeMeasured(data) {
  const mainMeasurement = data[0].measurement

  const canBeMeasured = data.every(({ measurement }) => {
    if (mainMeasurement === 'l' || mainMeasurement === 'ml') {
      return measurement === 'l' || measurement === 'ml'
    } else if (mainMeasurement === 'g' || mainMeasurement === 'kg') {
      return measurement === 'g' || measurement === 'kg'
    }
    return false
  })

  return canBeMeasured
}

function compare(data) {
  const canBeMeasured = checkCanBeMeasured(data)

  if (canBeMeasured) {
    let maxVolumePerPrice
    let lowerPriceItem
    let indexOfItem

    data.forEach((item, index) => {
      const volumeUnit = item.measurement === 'kg' || item.measurement === 'l' ? 1000 : 1
      const volume = (volumeUnit * item.volume) * item.unit
      const volumePerPrice = volume / item.price

      if (maxVolumePerPrice === undefined || volumePerPrice > maxVolumePerPrice) {
        maxVolumePerPrice = volumePerPrice
        lowerPriceItem = item
        indexOfItem = index
      }
    })

    return { item: lowerPriceItem, index: indexOfItem }
  }

  return false
}

module.exports = {
  compare,
  getItems,
  checkCanBeMeasured,
  calculateVolumePerPrice,
  strCalculateVolumePerPrice
}