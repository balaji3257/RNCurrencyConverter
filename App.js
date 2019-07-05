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
// import CustomPickerAndroid from './src/components/Picker.android';
// import CPickerIOS from './src/components/Picker.ios';
import HomeScreen from './src/screens/HomeScreen';

// const PickerComponent = Platform.select({
//   ios: CPickerIOS,
//   android: CustomPickerAndroid
// })
const AppNavigator = createStackNavigator(
  {
    HomeScreen,
    CurrencyList
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions:{
      headerStyle: {
        backgroundColor: '#2475B0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      
    }
  }
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

const App = createAppContainer(InitialNavigator);
export default App;