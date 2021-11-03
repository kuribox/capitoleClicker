import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MockAsyncStorage from 'mock-async-storage';
import StoreContext from '../src/providers/StoreContext';
import RootStore from '../src/stores/RootStore';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const rootStore = new RootStore();

const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.useFakeTimers();

const fakeNavigation = {
  navigate: jest.fn(),
};

const TestContainer = ({ Component }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      <NavigationContainer>
        <Component navigation={fakeNavigation} />
      </NavigationContainer>
    </StoreContext.Provider>
  )
}

export default TestContainer;
export const Navigation = fakeNavigation;
