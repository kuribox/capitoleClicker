import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StoreContext from './providers/StoreContext';
import RootStore from './stores/RootStore';

import Routes from './routes';

const rootStore = new RootStore();

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

export default App;