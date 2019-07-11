`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, 
} from 'react-native';
import HamburgerMenu from '../components/Hamburger';
import HelpIcon from '../components/Help';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BackToHome extends React.Component {
    constructor(props){
        super(props);
    }

    _navigateToHome = () => {
        this.props.navigation.navigate('HomeScreen')
    }
   
    render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => {this._navigateToHome()}}>
                    <Text style={styles.textDesign}>To home</Text>  
                </TouchableOpacity>
            </View>
        </View>
      )
    }
  }


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    textDesign: {
        fontWeight: "bold",
        fontSize: 23,
        color:'#fff',
        marginLeft: 10
    },
    headerBar:{
        height: 90,
        backgroundColor: '#2475B0',
        justifyContent: 'center',
        
    }
});