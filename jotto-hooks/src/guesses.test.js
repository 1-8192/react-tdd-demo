import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'

import guessedWordsContext from './contexts/guessedWordsContext'
import successContext from './contexts/successContext'
import Input from './Input'
import GuessedWords from './GuessedWords'

//integration tests simulating a word guess

function setup(guessedWordsStrings=[], secretWord = 'party') {
    const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider>
            <Input secretWord={secretWord}/>
            <GuessedWords />
        </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
    )

    const inputBox = findByTestAttr(wrapper, 'input-box')
    const submitButton = findByTestAttr(wrapper, 'submit-button')

    //prepopulating guessedWords
    guessedWordsStrings.map(word => {
        const mockEvent = { target: {value: word} }
        inputBox.simulate('change', mockEvent)
        submitButton.simulate('click')
    })

    return [wrapper, inputBox, submitButton]
}

describe('word guesses', () => {
    let wrapper
    let inputBox
    let submitButton

    describe('non empty guessedWords', () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton] = setup(['agile'], "party")
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
            test('guessedwords table row count reflects update', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
                expect(guessedWordsTableRows.length).toBe(2)
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
            test('guessedwords table row count reflects update', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
                expect(guessedWordsTableRows.length).toBe(2)
            })
        })
    })
    
})