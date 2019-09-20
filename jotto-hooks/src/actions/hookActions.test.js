import moxios from 'moxios';

import { getSecretWord } from './hookActions';
import { exportAllDeclaration } from '@babel/types';

describe('moxios tests', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('async call got get word', async () => {
        const secretWord = 'party';

        //setting up moxios to wait with response for call
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord
            });
        });

        //setting up the mock call
        const mockSetSecretWord = jest.fn();

        await getSecretWord(mockSetSecretWord);

        //calling expect to see if mock ran
        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
    });
});