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