`use strict`

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, Switch
} from 'react-native';

import Header from '../components/Header';

const WIDTH = Dimensions.get('window').width

export default class SettingsScreen extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    state = {
        switchValue : false
    };

   _renderNewCardComponent = (title) => {
       return(
        <View>
            <View  style={styles.historyContainer}>
                <Text style={{fontSize: 18, fontWeight:'500'}}>
                    {title}
                </Text>
            </View>
            <View style={styles.lineBorder}></View>
        </View>
       )
   }

  
    render() {
        return(
        <View style={styles.container}>
            
            <View style={styles.historyContainer}>
                <View>
                    <Text style={{fontSize: 18, fontWeight:'500'}}>History</Text>
                    <Text style={{fontSize: 16, marginVertical: 10, opacity:0.5}}>
                        Clear history in server
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() =>{ alert("History cleared")}}>
                        <Text style={styles.clearHistoryButtonText}>Clear History</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.lineBorder}></View>

            {this._renderNewCardComponent('Terms of Use')}
            {this._renderNewCardComponent('Privacy Policy')}
           
            {this._renderNewCardComponent('More from the Developer')}
            <View style={{marginLeft:15,marginVertical: 12, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontSize: 18, fontWeight:'500'}}>Send app statistics</Text>
                    <Switch 
                        onValueChange = {(switchValue) => {this.setState({switchValue})}}
                        value = {this.state.switchValue}
                        style={{height: 30, width: 30, marginRight: 10, }}
                        />
            </View>
            <View style={styles.lineBorder}></View>
        </View>
        )
    }
  }


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    clearHistoryButtonText:{
        color:'#2475B0',
        marginRight: 20,
        fontWeight:'bold',
        fontSize: 16
    },
    historyContainer:{
        marginLeft:15,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical: 15,
    },
    lineBorder:{
        width:'100%',
        borderBottomWidth:1,
        borderColor:'black',
        opacity:0.5,
    }
})