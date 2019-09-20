import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';
import { setPriority } from 'os';

const mockGetSecretWord = jest.fn();

const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  
  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ])

  React.useReducer = mockUseReducer;
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
  });
  test('setSecretWord does not get called on update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    //wrapper.update doesn't trigger useEffect
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });
  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'app-component');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'app-component');
    expect(appComponent.exists()).toBe(false);
  });
  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
