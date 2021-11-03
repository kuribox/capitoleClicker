import React from 'react';
import renderer from 'react-test-renderer';
import Clicker from './index';
import {render, waitFor} from '@testing-library/react-native'

it('renders correctly', () => {
  const testRenderer = renderer.create(<Clicker />);
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('no render', async () => {
  const { queryByTestId } = await waitFor(() => render(<Clicker
    name={"TEST"}
    buyAmount={10}
    value={5}
    clickAmount={1}
    onBuy={jest.fn()}
    activeAutoClickers={0}
    />
  ));

  const button = queryByTestId('button');
  expect(button).toBeNull();
});

it('render', async () => {
  const { queryByTestId } = await waitFor(() => render(<Clicker 
    name={"TEST"}
    buyAmount={10}
    value={100}
    clickAmount={1}
    onBuy={jest.fn()}
    activeAutoClickers={0}
    />
  ));

  await waitFor(() => {
    const button = queryByTestId('button');
    expect(button).not.toBeNull();
  })
});

it('disabled', async () => {
  const { queryByTestId, rerender } = await waitFor(() => render(<Clicker 
    name={"TEST"}
    key="test"
    buyAmount={10}
    value={100}
    clickAmount={1}
    onBuy={jest.fn()}
    activeAutoClickers={0}
  />));

  await waitFor(() => {
    const button = queryByTestId('button');
    expect(button).not.toBeNull();
  })

  await waitFor(() => rerender( <Clicker 
    name={"TEST"}
    key="test"
    buyAmount={10}
    value={5}
    clickAmount={1}
    onBuy={jest.fn()}
    activeAutoClickers={0}
  />));

  await waitFor(() => {
    const button = queryByTestId('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  })
});