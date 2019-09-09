import { correctGuess, actionTypes}  from './';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';


describe('correctGuess', () => {
    test('returns an action type with `CORRECT_GUESS`', () => {
        const action = correctGuess();
        expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
    })
})