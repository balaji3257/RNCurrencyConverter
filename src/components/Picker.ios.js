import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  PickerIOS
} from 'react-native';


export default class CustomPickerIOS extends React.Component{

  constructor(props){
    super(props);
    this.state={
      language: 'Default Value',
      pickerOpacity : 0,
      isPickerLoaded : false
    }
  }
  togglePicker =()=>{
      const pickerState = !this.state.isPickerLoaded;
      this.setState({
        isPickerLoaded: pickerState
      });
  }

  _renderPickerIOS = () =>{
    if(this.state.isPickerLoaded){
        return (
            <View style={styles.picker}>
                <TouchableOpacity onPress={() => this.togglePicker()}>
                    <Text style={{textAlign: 'center', fontWeight:'500', marginTop:10}}>CLOSE</Text>
                </TouchableOpacity>
                <PickerIOS 
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue}) }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="javaScript" />
                    <Picker.Item label="Python" value="python" />
                    <Picker.Item label="JDK" value="jdk" />
                    <Picker.Item label="Php" value="php" />
                    <Picker.Item label="Ruby" value="ruby" />
                </PickerIOS>
            </View>
                
        )
    }  else{
        return null;
    }
  }


  
    render(){
        return(
                <View style={styles.container}>
                    <Text>The Selected value is :</Text>
                    <TouchableOpacity onPress={() => this.togglePicker()} >
                        <Text> {this.state.language}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CurrencyList')} >
                        <Text> Go to User List</Text>
                    </TouchableOpacity>
                    {this._renderPickerIOS()}
                </View>
        );
    }
}



const styles = StyleSheet.create({
  container:{
      marginTop: 50, flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  picker:{
    position:"absolute", bottom:0, right:0, left: 0, backgroundColor: '#eeeeee', 
    }
})