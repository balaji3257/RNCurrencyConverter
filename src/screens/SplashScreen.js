
import React from 'react';
import {
    StyleSheet, View, Text, Image
} from 'react-native';


export default class CustomPickerIOS extends React.Component{

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>{
            setTimeout(
                () => {resolve('result')},
                2000
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
                    style={{height: 100, width: 100}}
                source={{uri:
              'https://aboutreact.com/wp-content/uploads/2018/07/logosmalltransparen.png'}}/>
                <Text style={styles.splashText}>SplashScreen</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container:{
      backgroundColor:'#DAE0E2', flex:1, 
      justifyContent: 'center', alignItems:'center'
  },
  splashText:{
            fontWeight:'bold', 
  }
})