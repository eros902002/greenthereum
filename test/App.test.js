import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import App from '../App'
import Main from '../src/Main'

// weird bug in Jest https://github.com/facebook/react-native/issues/12440
jest.mock('WebView', () => 'WebView')


describe('App', () => {
  it('renders without crashing', () => {
    const fetchDataMock = jest.fn()
    Main.prototype.fetchData = fetchDataMock
    const component = renderer.create(<App />)
    const rendered = component.toJSON()
    expect(rendered).toBeTruthy()

    fetchDataMock.mockReset()
    fetchDataMock.mockRestore()
  })

})
