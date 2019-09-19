//challenge 3 give up 

import { actionTypes } from '../actions';
import giveUpReducer from './giveUpReducer';

describe('giveUpReducer test', () => {
    test('returns default initial state of false when no action', () => {
        const newState = giveUpReducer(undefined, {});
        expect(newState).toBe(false)
    });
    test('return state of true upon give up', () => {
        const newState = giveUpReducer(false, { type: actionTypes.GIVE_UP});
        expect(newState).toBe(true);
    });
    test('returns state of false on reset game', () => {
        const newState = giveUpReducer(true, { type: actionTypes.RESET_GAME});
        expect(newState).toBe(false);
    });
});
