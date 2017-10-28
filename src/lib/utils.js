function isEthereumAddress(text) {
  return Boolean(text.length >= 40 && /^(0x){0,1}([0-9a-fA-F]{40}$)/.test(text))
}

function getBalanceText(balance) {
  const decimalPos = balance.indexOf('.')
  const length = balance.length
  const MAX_DECIMAL = 5
  return decimalPos !== -1 ?
    balance.substr(0, decimalPos + MAX_DECIMAL + 1) :
    balance
}

function getShortAddress(address) { // length >= 40
  return `${address.substr(0, 10)}...${address.substr(-5)}`
}

function formatDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ` +
    `${date.getHours()}:${date.getMinutes()}`
}

module.exports = {
  formatDate,
  getBalanceText,
  getShortAddress,
  isEthereumAddress
}
