const currencyFormatter = require('currency-formatter')

function isEthereumAddress(text) {
  return Boolean(text.length >= 40 && /^(0x){0,1}([0-9a-fA-F]{40}$)/.test(text))
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

function formatEther(number, precision = 6) {
  return currencyFormatter.format(number, {
    code: '',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    precision: precision
  })
}

module.exports = {
  formatCurrency,
  formatDate,
  formatEther,
  getCurrencySymbol,
  getShortAddress,
  isEthereumAddress
}
