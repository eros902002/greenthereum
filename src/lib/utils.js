const currencyFormatter = require('currency-formatter')

function isEthereumAddress(text) {
  return Boolean(text.length >= 40 && /^(0x){0,1}([0-9a-fA-F]{40}$)/.test(text))
}

function getBalanceText(balance) {
  const decimalPos = balance.indexOf('.')
  const length = balance.length
  const MAX_DECIMAL = 8
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

function getCurrencySymbol(code = 'USD') {
  return currencyFormatter.findCurrency(code).symbol
}

function formatCurrency(number, code = 'USD') {
  return currencyFormatter.format(number, {
    code: code,
    spaceBetweenAmountAndSymbol: true
  })
}

module.exports = {
  formatCurrency,
  formatDate,
  getBalanceText,
  getCurrencySymbol,
  getShortAddress,
  isEthereumAddress
}
