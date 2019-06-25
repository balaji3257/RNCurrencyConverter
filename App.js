import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,FlatList, Picker
} from 'react-native';

import { Swiper } from 'react-native-swiper';

export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      conversionResult: '0.00',
      inrValue: 0,
      isLoading: true,
      globalCurrencyRate:null
    }
    this.convButtonPressed = this.convButtonPressed.bind(this);
  }
  componentDidMount(){
    this.getRealTimeCurrencyConversionRates();
  }

  /**
   * @description : realtime currency conversion rates are fetch from 'api.exchangeratesapi.io'
   */
  getRealTimeCurrencyConversionRates = async ()=>{
    return fetch('https://api.exchangeratesapi.io/latest?base=INR')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        globalCurrencyRate:responseJson.rates,
      });
    }).catch(error =>{
      console.error('Unable to fetch rates now - '+error)
    })
  }

  /**
   * @description: simple method shows the implemetation of the 'fetch api' working
   */
  getMoviesList = async () =>{
    return  fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.movies[0].releaseYear,
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  /**
   * @description: Convert the currency values for the given currencies
   */
  convButtonPressed = (currencyType) => {
    var currencyRate = 0.00
    if((this.state.inrValue===0) || (isNaN(this.state.inrValue)) ){
      Alert.alert("Please enter some amount in 'INR' format")
    }else{
      switch (currencyType) {
        case 'USD':
          currencyRate = this.state.globalCurrencyRate['USD']
        break;
        case 'AUD':
          currencyRate = this.state.globalCurrencyRate['AUD']
        break;
        case 'EUR':
          currencyRate = this.state.globalCurrencyRate['EUR']
        break;
      }
      this.setState({conversionResult: parseFloat(Number(this.state.inrValue) * currencyRate).toFixed(4).toString()})
    }
      
  }
  /**
   * @description: used to handle the input value from user input field
   */
  handleChangeInput = (text) => {
    this.setState({ inrValue: text })
  }

  /**
   * @description : Calling when rotate currency button is pressed and 
   *                  update the from and to currency values.
   */
  rotateButtonPressed = () => {

  }
  render(){
    return(
      <View style={styles.container}> 

        <View style={ styles.inputContainer }>
          <Image style={ styles.inputCurrencyIcon } 
                source={require('./src/assets/icons/indian.png')}/>
          <TextInput style={styles.inputText}
            placeholder="0" placeholderTextColor="black" keyboardType="numeric"
            onChangeText={this.handleChangeInput} />
        </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.fromText}>From:</Text>
            <Picker selectedValue={this.state.lan}
                    style={styles.languagePicker} itemStyle={styles.lanItem}
                    onValueChange={(itemValue, itemIndex) =>{this.setState({lan: itemValue})}}>
                <Picker.Item label="USD" value="usDollar" />
                <Picker.Item label="EUR" value="Euro" />
                <Picker.Item label="INR" value="IndianRupee" />
                <Picker.Item label="AUD" value="AusDollar" />    
            </Picker>
          </View>

          <View>
            <TouchableOpacity onPress={() =>{this.rotateButtonPressed}}>
              <Image source={require('./src/assets/icons/convert.png')}
                    style={styles.currRotateButton}/>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.fromText}>To:</Text>
            <Picker selectedValue={this.state.lan}
                    style={styles.languagePicker} itemStyle={styles.lanItem}
                    onValueChange={(itemValue, itemIndex) =>{this.setState({lan: itemValue})}}>
                <Picker.Item label="USD" value="usDollar" />
                <Picker.Item label="EUR" value="Euro" />
                <Picker.Item label="INR" value="IndianRupee" />
                <Picker.Item label="AUD" value="AusDollar" />      
            </Picker>
          </View>
        <View style={ styles.convertButtonContainer }>
              <TouchableOpacity style={styles.buttonContainer}
                      onPress={()=>this.convButtonPressed('USD')} >
                <Text style={styles.buttonText}>CONVERT</Text>
              </TouchableOpacity >
        </View>
        <View style={styles.resultContainer}>
            <Text style={styles.resultText}>2344.99</Text>
            <Text style={styles.resultCurrenyText}>USD</Text>
        </View>
        
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#758AA2', alignItems: 'center', padding: 20
  },
  inputContainer:{ 
    flexDirection: 'row', backgroundColor:'#fff', marginTop: 20, borderRadius: 12,
    marginVertical: 40, height: 120,justifyContent: 'center', alignItems:'center'
  },
  inputCurrencyIcon:{
    width: 25,height: 25, padding:22, marginLeft: 10, alignSelf: 'center'
  },
  inputText:{   
      flex: 1, color:'black', fontSize: 60, fontWeight: 'bold', paddingRight: 20,textAlign:'right'
  },
  
  buttonText: {
    fontSize: 24, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center',
  },
  currSelectionContainer:{
    width: '100%',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth:2,
    padding: 20
  },
  languagePicker:{
    height: 60, borderWidth: 4, borderColor: 'red', borderRadius: 25, flex: 3, marginLeft: 20
  },
  lanItem:{
    fontWeight: 'bold', alignItems:'center'
  },
  pickerContainer:{
    alignItems: 'center', justifyContent:'center', flexDirection: 'row',backgroundColor: '#e0f7fa',
    height: 'auto',
  },
  fromText:{
    flex:1, fontSize:30, fontWeight:'600', textAlign:'center', textAlignVertical:'center'
  },
  currRotateButton:{
    height: 50, width: 50, margin: 20
  },
  convertButtonContainer:{   
   width: '100%', marginTop: 30
  },
  buttonContainer: {
    height: 50, borderWidth: 1, backgroundColor: '#26ae60', borderRadius: 12,
    justifyContent: "center", alignItems: "center",
  },
  resultContainer:{
      backgroundColor: 'white', width:'100%', height: 120, justifyContent: 'center', alignItems:'center',
      marginTop: 25, borderRadius: 12
  },
  resultText:{
    fontSize: 35,
    fontWeight:'800'
  },
  resultCurrenyText:{
    fontWeight: '600', fontSize: 20, color: '#EA7773'
  }
  
});
