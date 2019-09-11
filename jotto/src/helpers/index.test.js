import { getLetterMatchCount } from './';


describe('getLetterMatchCount', () => {
    const secretWord = 'party';

    test('returns correct count when there are no mathcing letters', () => {
        const letterMatchCount = getLetterMatchCount('bones', secretWord);
        expect(letterMatchCount).toBe(0);
    });
    test('returns the correct count when there are 3 matching letters', () => {
        const letterMatchCount = getLetterMatchCount('train', secretWord);
        expect(letterMatchCount).toBe(3);
    });
    test('returns correct count when there are duplicate guesses', () => {
        const letterMatchCount = getLetterMatchCount('parka', secretWord);
        expect(letterMatchCount).toBe(3);
    });
});