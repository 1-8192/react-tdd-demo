import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';
import { setPriority } from 'os';

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  //enzyme may not support useEffect on shallow
  return mount(<App />);
}

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'app-component')
  expect(appComponent.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('gets called on app mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  })
})
