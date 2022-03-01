import React from 'react';
import {
  Center,
  NativeBaseProvider
} from 'native-base';
import Login from './components/Login';
import Footer from './components/Footer';
import { NavigationContainer } from '@react-navigation/native';

export default () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Footer />
        <Center>
          <Login />
        </Center>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};