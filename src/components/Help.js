`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal, ToastAndroid, Platform,
  Animated
} from 'react-native';

export default class HelpIcon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
      }
    }
  
    /**
     * @description: set the visible propperty for the Modal window
     */
    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }
    render() {
      return (
        <View>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
              <Image style = {styles.helpIcon}source={require('../assets/icons/help.png')}/>
            </TouchableOpacity>
          </View>
          <View>
            <Modal animationType="slide" transparent={false}
              visible={this.state.modalVisible}>
              <View style={{ marginTop: 22 }}>
                <View>
                  <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                    <Text style={styles.closeButton}>close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )
    }
  }



  const styles = StyleSheet.create({
    helpIcon:{
        height: 30, 
        width: 30, 
        margin: 10
    },
    titleBar: {
      backgroundColor: '#2475B0', justifyContent: 'center'
    },
    closeButton: {
        fontSize: 30,
        fontWeight: 'bold', textAlign: 'right', marginHorizontal: 30
      },
});