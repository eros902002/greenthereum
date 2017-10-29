const assert = require('assert')
const utils = require('../src/lib/utils')

describe('utils', function() {
  describe('#isEthereumAddress()', function() {
    it('should return true for valid addresses', function() {
      assert.equal(utils.isEthereumAddress('0x348d5BE8f0c82EE09f094761303D14444995c9A1'), true)
      assert.equal(utils.isEthereumAddress('348d5BE8f0c82EE09f094761303D14444995c9A1'), true)
    })

    it('should return fail for invalid addresses', function() {
      assert.equal(utils.isEthereumAddress(''), false)
      assert.equal(utils.isEthereumAddress('348d5BE8f0c82EE09f094761303D14444995c9X1'), false)
      assert.equal(utils.isEthereumAddress('x348d5BE8f0c82EE09f094761303D14444995c9A1'), false)
      assert.equal(utils.isEthereumAddress('0x348d5BE8f0 c82EE09f094761303D14444995c9A1'), false)
      assert.equal(utils.isEthereumAddress(' 0x348d5BE8f0c82EE09f094761303D14444995c9A1'), false)
    })
  })

  describe('formatDate', function () {
    it('should format date in english', function () {
      const date = new Date(2017, 11, 31, 10, 30)
      const actual = '12/31/17 10:30'
      const expected = utils.formatDate(date)

      assert.equal(actual, expected)
    })
  })

  describe('formatCurrency', function () {
    it('should format the amount properly', function () {
      const actual = utils.formatCurrency('5300', 'USD')
      const expected = '$5,300.00'
      assert.equal(actual, expected)
    })
  })

  describe('getCurrencySymbol', function () {
    it('should return the proper symbol', function () {
      const actual = utils.getCurrencySymbol('USD')
      const expected = '$'
      assert.equal(actual, expected)
    })
  })

  describe('formatNumber', function () {
    it('should format the amount properly', function () {
      const actual = utils.formatNumber('5100200300400.999999')
      const expected = '5,100,200,300,401.000000'
      assert.equal(actual, expected)
    })
    it('should format the decimals properly', function () {
      const actual = utils.formatNumber('123456.12345678', 8)
      const expected = '123,456.12345678'
      assert.equal(actual, expected)
    })
  })
})
