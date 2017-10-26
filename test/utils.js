var assert = require('assert')
const utils = require('../src/utils')

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
})
