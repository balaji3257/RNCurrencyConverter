`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions
} from 'react-native';

import Header from '../components/Header';

const WIDTH = Dimensions.get('window').width

export default class AboutUsScreen extends React.Component {
   
    render() {
        return(
          <View>
            <View style={styles.container}>
              <Text style={{marginTop: 100,fontWeight:'bold'}}>Coming soon..</Text>
            </View>
          </View>
          
        )
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  });



