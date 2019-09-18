import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps} from '../test/testUtils.js'

import TotalGuesses from './TotalGuesses'

const defaultProps = { guessCount: 0 };
const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<TotalGuesses {...setupProps} />)
};

describe('displays total number of guesses', () => {
    let wrapper 
    beforeEach(() => {
        wrapper = setup();
    })
    test('renders without error', () => {
        const guessComponent = findByTestAttr(wrapper, 'total-guesses')
        expect(guessComponent.length).toBe(1);
    });
    test('renders the correct number of guesses', () => {
        const guessCount = 8;
        const wrapper = setup({ guessCount})
        const guessComponent = findByTestAttr(wrapper, 'total-guesses');
        expect(guessComponent.text()).toContain(guessCount.toString());
    });
})