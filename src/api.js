const {host, key} = require('../etherscanAPI')
const STATS_URL = `${host}?module=stats&action=ethprice&apikey=${key}`
const MIN_REQUEST_TIME = 1500

function getAccounts(accounts) {
  const addresses = accounts ? JSON.parse(accounts) : []
  const addressJoined = addresses.join(',')
  const BALANCE_URL = `${host}?module=account&action=balancemulti` +
    `&tag=latest&apikey=${key}&address=${addressJoined}`
  if (addresses.length) {
    console.log(`fetch ${BALANCE_URL}`)
    return fetch(BALANCE_URL)
  }
  return Promise.reject('no addresses found')
}

function getStats() {
  return fetch(STATS_URL)
}

export default {
  const: {
    MIN_REQUEST_TIME
  },
  URL: {
    PRICE_HISTORICAL: 'https://etherscan.io/chart/etherprice',
    ADDRESS_INFO: 'https://etherscan.io/address/'
  },
  getAccounts,
  getStats
}
