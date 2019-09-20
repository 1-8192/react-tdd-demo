import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';

import Input from './Input';

const setup = (secretWord="party") => {
    return shallow(<Input secretWord={secretWord}/>);
};

test('renders component', () => {
    const wrapper = setup();
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
        wrapper = setup();
        setCurrentGuessMock.mockClear();
        React.useState = jest.fn(() => ["", setCurrentGuessMock]);
    });
    test('state updates with input value on change', () => {
        const wrapper = setup();
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