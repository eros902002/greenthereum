const HOST = 'https://api.etherscan.io/api'
const API_KEY = 'TIMRV1B6YVN8TCR719MRWG68F5UW1TSSBC'
const STATS_URL = `${HOST}?module=stats&action=ethprice&apikey=${API_KEY}`
const MIN_REQUEST_TIME = 1500

function getAccounts(accounts) {
  const addresses = accounts ? JSON.parse(accounts) : []
  const addressJoined = addresses.join(',')
  const BALANCE_URL = `${HOST}?module=account&action=balancemulti` +
    `&tag=latest&apikey=${API_KEY}&address=${addressJoined}`
  if (addresses.length) {
    console.log(`fetch ${BALANCE_URL}`)
    return fetch(BALANCE_URL)
  }
  return Promise.resolve([])
}

function getStats() {
  return fetch(STATS_URL)
}

export default {
  const: {
    MIN_REQUEST_TIME
  },
  URL: {
    PRICE_HISTORICAL: 'https://etherscan.io/chart/etherprice'
  },
  getAccounts,
  getStats
}
