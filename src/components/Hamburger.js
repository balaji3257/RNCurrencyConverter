`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Modal,
} from 'react-native';


export default class Hamburger extends React.Component {
   //Structure for the navigatin Drawer
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.helpIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  }



  const styles = StyleSheet.create({
    helpIcon:{
        height: 30, 
        width: 30, 
        marginLeft: 8,
        marginTop:8
    },
    titleBar: {
      backgroundColor: '#2475B0', justifyContent: 'center'
    },
    closeButton: {
        fontSize: 30,
        fontWeight: 'bold', textAlign: 'right', marginHorizontal: 30
      },
});