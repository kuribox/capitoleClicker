import React from 'react';
import renderer from 'react-test-renderer';
import Home from './index';
import TestContainer, { Navigation } from '../../../test/TestContainer';
import {render, waitFor, screen, fireEvent} from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

it('renders correctly', () => {
  const testRenderer = renderer.create(<TestContainer Component={Home} />);
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('Disabled button', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={Home} />));   
  const button = queryByTestId('login-button');;
  expect(button.props.accessibilityState.disabled).toBe(true);
});

it('Empty input', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={Home} />));   
  const userInput = queryByTestId('user-input');  
  expect(userInput.props.value).toBeNull();
});

it('Edit input enable button', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={Home} />));   
  const userInput = queryByTestId('user-input');  
  const button = queryByTestId('login-button');;

  expect(button.props.accessibilityState.disabled).toBe(true);

  expect(userInput.props.value).toBeNull();

  fireEvent.changeText(userInput, 'name');
  expect(userInput.props.value).toBe('name');
  expect(button.props.accessibilityState.disabled).toBeUndefined();
});

it('Check login storage/navigate', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={Home} />));   
  const userInput = queryByTestId('user-input');  
  const button = queryByTestId('login-button');;

  fireEvent.changeText(userInput, 'name');

  fireEvent.press(button)

  const root = await waitFor(() => {
    expect(Navigation.navigate).toBeCalledWith("Clicker");
  });

  expect(JSON.stringify(JSON.parse((await AsyncStorage.getItem("users"))).rawData)).toBe("[{\"name\":\"name\",\"value\":0,\"clickers\":[]}]")
});