`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions
} from 'react-native';
import HamburgerMenu from '../components/Hamburger';
import HelpIcon from '../components/Help';
import BackToHome from '../components/BackToHome';

const WIDTH = Dimensions.get('window').width
export default class SettingsScreen extends React.Component {
   constructor(props){
       super(props);
   }
    render() {
    return (
        
        <View style = {styles.container}>
            <View style = {styles.statusBar}>

            </View>
            <View style = {styles.headerBar}>
                <HamburgerMenu navigation={this.props.navigation}/>
            </View>
        </View>
      )
    }
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'yellow'
    },
    headerBar:{
        backgroundColor: '#2475B0', width:WIDTH
    },
    statusBar:{
        height: 30, backgroundColor: '#2475B0',width:WIDTH, height: 23
    },
    textDesign: {
        fontWeight: "bold",
        fontSize: 23
    }
});