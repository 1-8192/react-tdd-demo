import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps} from '../test/testUtils.js'

import NewWordButton from './NewWordButton'
import { exportAllDeclaration } from '@babel/types';

const defaultProps = { display: false };

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<NewWordButton {...setupProps} />);
};

describe('it clears word and starts over on click', () => {
    test('renders the component', () => {
        const wrapper = setup();
        const newWordButton = findByTestAttr(wrapper, 'new-word-button');
        expect(newWordButton.length).toBe(1)
    });
    test('renders nothing when display is false', () => {
        const wrapper = setup({ display: false} );
        const newWordButton = findByTestAttr(wrapper, 'new-word-button');
        expect(newWordButton.text()).toBe('');
    });
    test('renders something when display is true', () => {
        const wrapper = setup({ display: true, resetAction: () => {}} );
        const newWordButton = findByTestAttr(wrapper, 'new-word-button');
        expect(newWordButton.text().length).not.toBe(0);
    });
    test('gets new word on click', () => {
        const resetActionMock = jest.fn();
        const wrapper = setup({ display: true, resetAction: resetActionMock});

        const newWordButton = findByTestAttr(wrapper, 'new-word-button');
        newWordButton.simulate('click');

        expect(resetActionMock.mock.calls.length).toBe(1);
    });
});