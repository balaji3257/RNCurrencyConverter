import React from 'react';
import {
Platform, Dimensions
} from 'react-native';
import { 
  createAppContainer, createStackNavigator, 
  createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import CurrencyList from './src/screens/CurrencyList';
import SplashScreen from './src/screens/SplashScreen';
import DummyAnime from './src/screens/DummyAnime';
import HomeScreen from './src/screens/HomeScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BackToHome from './src/components/BackToHome';
import Config from './app.json'


const AppNavigator = createStackNavigator(
  {
    HomeScreen,
    CurrencyList,
    AboutUsScreen,
    SettingsScreen,
    DummyAnime,
    BackToHome
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions:{
      headerStyle: {
        backgroundColor: '#2475B0',
      },
      title: Config.expo.name,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold', flex:1, textAlign:'center', justifyContent:'center'
      },

    }
  }
);

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
}
const DrawerNavigator = createDrawerNavigator({
    App: AppNavigator ,
    'About us' :{
      screen: AboutUsScreen
    },
    'Settings':{
      screen: SettingsScreen,
      drawerLabel:'Settings'
    }
  },DrawerConfig,
  {
    contentComponent: "https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42"
  }
  
)
const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Drawer: DrawerNavigator
});

const App = createAppContainer(InitialNavigator);
export default App;