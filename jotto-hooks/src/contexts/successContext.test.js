import React from 'react'
import { shallow, mount } from 'enzyme'

import successContext from './successContext'

//calls useSuccess for the tests
const FunctionalComponent = () => {
    successContext.useSuccess()
    return <div />
}

test('useSuccess throws error when not wrapped in provider', () => {
    expect(() => {
        shallow(<FunctionalComponent />)
    }).toThrow('useSuccess must be used in provider')
})

test('useSuccess does not throw error when wrapped in provider', () => {
    expect(() => {
        mount(<successContext.SuccessProvider>
            <FunctionalComponent />
        </successContext.SuccessProvider>)
    }).not.toThrow()
})