import React from 'react';
import {
  Platform,
  Dimensions
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import Config from './app.json'
import DrawerComponent from './src/screens/DrawerComponent';
import HelpIcon from './src/components/Help';
import HamburgerMenu from './src/components/Hamburger';
import CurrencyListScreen from './src/screens/CurrencyList';
import ChartsScreen from './src/screens/Charts';




const HomeScreen_Navigator = createStackNavigator({

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerRight: < HelpIcon />,
      headerLeft: < HamburgerMenu navigation={
        navigation
      }
      />,
      headerStyle: {
        backgroundColor: '#2475B0',
      },
      headerTintColor: '#fff',
      title: Config.expo.name,
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
      },
    }),
  },
  CurrencyList: {
    screen: CurrencyListScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: '#2475B0',
      },
      headerTintColor: '#fff',
    })
  }

});

const Settings_Navigator = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerRight: < HelpIcon />,
      headerLeft: < HamburgerMenu navigation={
        navigation
      }
      />,
      headerStyle: {
        backgroundColor: '#2475B0'
      },
      headerTintColor: '#fff',
      title: 'Settings',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
      },
    }),
  },
});


const Charts_Navigator = createStackNavigator({
  ChartsScreen: {
    screen: ChartsScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerRight: < HelpIcon />,
      headerLeft: < HamburgerMenu navigation={
        navigation
      }
      />,
      headerStyle: {
        backgroundColor: '#2475B0'
      },
      headerTintColor: '#fff',
      title: 'Charts',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
      },
    }),
  }
})

const AboutUs_Navigator = createStackNavigator({
  AboutusScreen: {
    screen: AboutUsScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: < HelpIcon />,
      headerLeft: < HamburgerMenu navigation={ navigation } />,
      headerStyle: {
        backgroundColor: '#2475B0',
      },
      headerTintColor: '#fff',
      title: 'About us',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
      },
    }),
  },
});




// const AppNavigator = createStackNavigator(
//   {
//     HomeScreen,
//     CurrencyList,
//     AboutUsScreen,
//     SettingsScreen,
//     DummyAnime,
//     BackToHome
//   },
//   {
//     initialRouteName: 'HomeScreen',
//     defaultNavigationOptions:{
//       headerStyle: {
//         backgroundColor: '#2475B0',
//       },
//       title: Config.expo.name,
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold', flex:1, textAlign:'center', justifyContent:'center'
//       },

//     }
//   }
// );

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
}

const RouteConfigs = {
  NavChartsScreen: {
    screen: Charts_Navigator
  },
  NavHomeScreen: {
    screen: HomeScreen_Navigator
  },
  NavAboutusScreen: {
    screen: AboutUs_Navigator,
  },
  NavSettingsScreen: {
    screen: Settings_Navigator,
  }
}



const DrawerNavigatorConfigs = {
  contentComponent: DrawerComponent,
  drawerWidth: Dimensions.get('window').width * 0.80,
}
const DrawerNavigator = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfigs)
const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Drawer: DrawerNavigator
});

const App = createAppContainer(DrawerNavigator);
export default App;