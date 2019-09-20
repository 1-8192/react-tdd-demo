import stringsModule from './strings';
import { exportAllDeclaration } from '@babel/types';

const { getStringByLanguage } = stringsModule;

const strings = {
    en: {submit: 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
});
test('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
});
test('returns correct submit string for english if language does not exist', () => {
    const string = getStringByLanguage('nothing', 'submit', strings);
    expect(string).toBe('submit');
});
test('returns english if no string exists for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
});