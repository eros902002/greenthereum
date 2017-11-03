import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import Main from '../src/Main'

// weird bug in Jest https://github.com/facebook/react-native/issues/12440
jest.mock('WebView', () => 'WebView')

describe('Main', () => {
  it('should init the App\'s state', () => {
    // mock network calls
    Main.prototype.fetchData = jest.fn()
    Main.prototype.getPreferences = jest.fn()
    Main.prototype.loadConversionRates = jest.fn()
    const rendererInstance = renderer.create(<Main/>)
    const component = rendererInstance.getInstance()
    const actual = component.state
    const expected = {
      screen: 'Main',
      accounts: [],
      stats: {
        ethbtc: null,
        ethusd: null,
        supply: null
      },
      preferences: {
        currency: 'USD'
      },
      conversionRates: {},
      cached: false,
      date: null,
      loading: true
    }
    expect(actual).toEqual(expected)
  })

  it('should call loaders on componentDidMount', () => {
    const fetchDataMock = jest.fn()
    const getPreferencesMock = jest.fn(() => Promise.resolve())
    const loadConversionRatesMock = jest.fn(() => Promise.resolve())
    Main.prototype.fetchData = fetchDataMock
    Main.prototype.getPreferences = getPreferencesMock
    Main.prototype.loadConversionRates = loadConversionRatesMock
    const rendererInstance = renderer.create(<Main/>)

    expect(getPreferencesMock).toHaveBeenCalled()
    expect(loadConversionRatesMock).toHaveBeenCalled()
    expect(fetchDataMock).toHaveBeenCalled()

    fetchDataMock.mockReset()
    fetchDataMock.mockRestore()
    getPreferencesMock.mockReset()
    getPreferencesMock.mockRestore()
    loadConversionRatesMock.mockReset()
    loadConversionRatesMock.mockRestore()
  })

  describe('fetchData', () => {
    /**
     * fetchData(refrsh) is debouned: see https://etherscan.io/apis limitations
     */
    it('should not be called more than once (debounce)', () => {
      const fetchDataMock = jest.fn()

      Main.prototype.fetchData = fetchDataMock // mock network calls
      const rendererInstance = renderer.create(<Main/>) // 1st call
      const component = rendererInstance.getInstance()
      component.refresh()
      component.refresh()
      component.refresh()
      expect(fetchDataMock.mock.calls.length).toBe(1)

      fetchDataMock.mockReset()
      fetchDataMock.mockRestore()
    })

    it('should be called on refresh() if waits enough', (done) => {
      const fetchDataMock = jest.fn()

      Main.prototype.fetchData = fetchDataMock // mock network calls
      const rendererInstance = renderer.create(<Main/>) // 1st call
      const component = rendererInstance.getInstance()
      setTimeout(() => {
        component.refresh()
        expect(fetchDataMock.mock.calls.length).toBe(2)

        fetchDataMock.mockReset()
        fetchDataMock.mockRestore()
        done()
      }, 2000) // refresh is debounced
    })
  })
})
