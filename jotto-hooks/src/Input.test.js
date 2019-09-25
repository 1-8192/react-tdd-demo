import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import Input from './Input';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

const setup = ({ language, secretWord, success }) => {
    language = language || 'en';
    secretWord = secretWord || 'party';
    success = success || false;

    return mount(
        <languageContext.Provider value={language} >
            <successContext.SuccessProvider value={[success, jest.fn()]} >
                <Input secretWord={secretWord} />
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
};

test('renders component', () => {
    const wrapper = setup({});
    const inputComponent = findByTestAttr(wrapper, 'input-component');
    expect(inputComponent.length).toBe(1);
});
test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'party' } );
});

describe('state controlled field', () => {
    let setCurrentGuessMock =  jest.fn();
    let wrapper
    beforeEach(() => {
        wrapper = setup({});
        setCurrentGuessMock.mockClear();
        React.useState = jest.fn(() => ["", setCurrentGuessMock]);
    });
    test('state updates with input value on change', () => {
        const wrapper = setup({});
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: {value: 'train'}};
        inputBox.simulate("change", mockEvent);
        
        expect(setCurrentGuessMock).toHaveBeenCalledWith('train');
    });
    test('submit button click calls setCurrentGuess with empty string', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');

        submitButton.simulate("click", { preventDefault() {}});

        expect(setCurrentGuessMock).toHaveBeenCalledWith("");
    });
});

describe('languagePicker', () => {
    test('correctly renders submit string in English', () => {
        const wrapper = setup({ language: 'en' });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });
    test('correctly renders submit string in emoji', () => {
        const wrapper = setup({ language: 'emoji' });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    });
});

test('input component is empty when success is true', () => {
    const wrapper = setup({ secretWord: 'party', success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
});