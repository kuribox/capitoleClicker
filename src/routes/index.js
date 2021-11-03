import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../views/Home';
import Clicker from '../views/Clicker';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Clicker" component={Clicker}  options={{ headerBackTitleVisible: true }} />
      </Stack.Navigator>
    </>
  );
}

export default App;