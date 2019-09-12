import { storeFactory } from '../test/testUtils';
import { guessedWord, guessWord } from './actions';
import { exportAllDeclaration } from '@babel/types';


describe('guessedWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccesfulGuess = 'train';

    describe('no guessed words', () => {
        let store;
        const initialState = { secretWord };
        beforeEach(() => {
            store = storeFactory(initialState)
        });

        test('updates state succesfully for unsuccesful guess', () => {
            store.dispatch(guessWord(unsuccesfulGuess));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: false,
                guessedWords: [{
                    guessedWord: unsuccesfulGuess,
                    letterMatchCount: 3
                }]
            }
            expect(newState).toEqual(expectedState);      
        });
        test('updates state succesfully for succesful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [{
                    guessedWord: secretWord,
                    letterMatchCount: 5
                }]
            }
            expect(newState).toEqual(expectedState);
        });
    });
    describe('some guessed words', () => {
        const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
        const initialState = { guessedWords, secretWord};
        let store;
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state succesfully for unsuccesful guess', () => {
            store.dispatch(guessWord(unsuccesfulGuess));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: false,
                guessedWords: [
                    ...guessedWords,
                    {
                        guessedWord: unsuccesfulGuess,
                        letterMatchCount: 3
                    }
                ]
            }
            expect(newState).toEqual(expectedState);
        });
        test('updates state succesfully for succesful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [
                    ...guessedWords,
                    {
                        guessedWord: secretWord,
                        letterMatchCount: 5
                    }
                ]
            }
            expect(newState).toEqual(expectedState);
        });
    });
});