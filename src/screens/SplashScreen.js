
import React from 'react';
import {
    StyleSheet, View, Text, Image
} from 'react-native';


export default class CustomPickerIOS extends React.Component{

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>{
            setTimeout(
                () => {resolve('result')},
                1500
            )
        })
    }

    async componentDidMount(){
        const data = await this.performTimeConsumingTask();
        if(data !== null){
            this.props.navigation.navigate('App');
        }
    }


    render(){
        return(
            <View style={styles.container}>
                <Image 
                    style={{height: 300, width: 350}}
                    source = {require('../assets/icons/splash_currencyIcon.jpg')}
               />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container:{
      backgroundColor:'#fff', flex:1, 
      justifyContent: 'center', alignItems:'center'
  },
  splashText:{
            fontWeight:'bold', 
  }
})