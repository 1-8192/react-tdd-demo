import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();
const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'language-picker');
    expect(component.exists()).toBe(true);
});
test('does not throw error warning with correct props', () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn() });
});
test('renders nonzero language icons', () => {

});
test('calls setLanguage on click', () => {

});