function isEthereumAddress(text) {
  return Boolean(text.length >= 40 && /^(0x){0,1}([0-9a-fA-F]{40}$)/.test(text))
}

module.exports = {
  isEthereumAddress
}
