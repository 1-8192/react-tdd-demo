import moxios from 'moxios';

describe('secretWord action creator', () => {
    befoerEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
});