`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions
} from 'react-native';
import HamburgerMenu from '../components/Hamburger';
import HelpIcon from '../components/Help';

const WIDTH = Dimensions.get('window').width
export default class Header extends React.Component {
   constructor(props){
       super(props);
   }

   _renderHeaderSection = () => {
       return(
        <View >
            <View style = {styles.statusBar}>
            </View>
            <View style = {styles.headerBar}>
                
                <HamburgerMenu  navigation={this.props.navigation}/>
                <Text style={styles.headerText}>{this.props.title}</Text>
                <HelpIcon/>
            </View>
        </View>
       )
   }
    render() {
        return(
            this._renderHeaderSection()
        )
    }
  }


const styles = StyleSheet.create({
    headerBar:{
        backgroundColor: '#2475B0', width:WIDTH, flexDirection:'row', justifyContent:'space-between'
    },
    statusBar:{
        height: 30, backgroundColor: '#2475B0',width:WIDTH, height: 23
    },
    headerText: {
        fontWeight: "bold", fontSize: 23, alignSelf:'center', color:'#fff'
    }
});