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
            source={require('../assets/icons/hambMenu.png')}
            style={styles.helpIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  }



  const styles = StyleSheet.create({
    helpIcon:{
        height: 40, 
        width: 40, 
        marginTop: 10
    },
    titleBar: {
      backgroundColor: '#2475B0', justifyContent: 'center'
    },
    closeButton: {
        fontSize: 30,
        fontWeight: 'bold', textAlign: 'right', marginHorizontal: 30
      },
});