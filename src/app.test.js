import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-async-storage/async-storage', () => mockImpl);
jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});