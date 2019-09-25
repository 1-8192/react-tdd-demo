import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import successContext from './contexts/successContext'
import Input from './Input'
import { exportAllDeclaration } from '@babel/types'

//integration tests simulating a word guess

function setup(secretWord = 'party') {
    const wrapper = mount(
    <successContext.SuccessProvider>
        <Input secretWord={secretWord}/>
    </successContext.SuccessProvider>
    )

    const inputBox = findByTestAttr(wrapper, 'input-box')
    const submitButton = findByTestAttr(wrapper, 'submit-button')

    return [wrapper, inputBox, submitButton]
}

describe('word guesses', () => {
    let wrapper
    let inputBox
    let submitButton
    beforeEach(() => {
        [wrapper, inputBox, submitButton] = setup("party")
    })

    describe('correct guess', () => {
        beforeEach(() => {
            const mockEvent = { target: {value: 'party'} }
            inputBox.simulate('change', mockEvent)
            submitButton.simulate('click')
        })
        test('Input component contains no children', () => {
            const inputComponent = findByTestAttr(wrapper, 'input-component')

            expect(inputComponent.children().length).toBe(0)
        })
    })

    describe('incorrect guess', () => {
        beforeEach(() => {
            const mockEvent = { target: {value: 'train'} }
            inputBox.simulate('change', mockEvent)
            submitButton.simulate('click')
        })
        test('Input box remains', () => {
            expect(inputBox.exists()).toBe(true)
        })
    })

})