
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';


export default class DrawerComponent  extends React.Component{
    constructor(props){
        super(props);   
    }
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('NavHomeScreen')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('NavSettingsScreen')}>
                    <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('NavChartsScreen')}>
                    <Text>Graphs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('NavAboutusScreen')}>
                    <Text>About us</Text>
                </TouchableOpacity>
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