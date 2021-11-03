import React from 'react';
import renderer from 'react-test-renderer';
import Clicker from './index';
import TestContainer from '../../../test/TestContainer';
import {render, waitFor} from '@testing-library/react-native'

it('renders correctly', () => {
  const testRenderer = renderer.create(<TestContainer Component={Clicker} />);
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('initial value', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={Clicker} />));   
  const clickerValue = queryByTestId('value');
  expect(clickerValue.props.children).toBe(0);
});

it('storage value', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={(props) => <Clicker user={{
    name: "name",
    value: 10,
    clickers: [],
  }} {...props}/>} />));

  const clickerValue = queryByTestId('value');
  expect(clickerValue.props.children).toBe(10);
});

it('autoClicker lvl 1', async () => {
  const { queryByTestId } = await waitFor(() => render(<TestContainer Component={(props) => <Clicker user={{
    name: "name",
    value: 10,
    clickers: [],
  }} {...props}/>} />));

  const autoClicker = queryByTestId('auto-clicker');
  
  await waitFor(() => {
    autoClicker.props.children[0].props.onBuy("lvl 1", 10, 1);
  });

  const clickerValue = queryByTestId('value');
  await waitFor(() => {
    expect(clickerValue.props.children).toBeGreaterThan(10);
  }); 
});


