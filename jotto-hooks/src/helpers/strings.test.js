import stringsModule from './strings';
import { exportAllDeclaration } from '@babel/types';

const { getStringByLanguage } = stringsModule;

const strings = {
    en: {submit: 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

describe('language strings testing', () => {
    const mockWarn = jest.fn();

    beforeEach(() => {
        console.warn = mockWarn;
    });

    //unmocking console warn for unrelated tests
    afterEach(() => {
        console.warn = require('console').warn;
    });

    test('returns correct submit string for english', () => {
        const string = getStringByLanguage('en', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    test('returns correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', strings);
        expect(string).toBe('🚀');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    test('returns correct submit string for english if language does not exist', () => {
        const string = getStringByLanguage('nothing', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [nothing]");
    });
    test('returns english if no string exists for language', () => {
        const string = getStringByLanguage('mermish', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [mermish]");
    });
});
