`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal, ToastAndroid, Platform,
  Animated
} from 'react-native';
import HamburgerMenu from '../components/Hamburger';
export default class AboutUsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       
      }
    }
    
    render() {
      return (
        <View style={styles.container}>
          <HamburgerMenu navigation={this.props.navigation}/>
          <Text style={styles.textDesign}>About us page</Text>
        </View>
      )
    }
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDesign: {
        fontWeight: "bold",
        fontSize: 23
    }
});