import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { Background } from './src/Components/Background';
import { LoginScreen } from './src/screens/LoginScreen';

const App = () => {
  return (
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
  )
}

export default App;
