import React from 'react';
import {
  StyleSheet, Platform
} from 'react-native';
import { 
  createAppContainer, 
  createStackNavigator, 
  createSwitchNavigator } from 'react-navigation';

import CurrencyList from './src/screens/CurrencyList';
import SplashScreen from './src/screens/SplashScreen';
import CustomPickerAndroid from './src/components/Picker.android';
import CPickerIOS from './src/components/Picker.ios';
import CurrencyConverter from './src/screens/CurrencyConverter';

const PickerComponent = Platform.select({
  ios: CPickerIOS,
  android: CustomPickerAndroid
})
const AppNavigator = createStackNavigator(
  {
    PickerComponent,
    CurrencyList,
    CurrencyConverter
  },
  {
    initialRouteName: 'CurrencyConverter'
  }
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

const App = createAppContainer(InitialNavigator);
export default App;