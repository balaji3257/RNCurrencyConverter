import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Image, Alert, ToastAndroid, Platform,
} from 'react-native';

import HelpIcon from '../components/Help';
import HamburgerMenu from '../components/Hamburger';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversionResult: '0.00',
      inrValue: 0,
      isLoading: true,
      globalCurrencyRate: null,
      modalVisible: false,
      mainFromCurrency: 'INR',
      mainToCurrency: 'USD',
      isConversionCompleted: false
    }
  }

    componentDidMount(){
      this.getRealTimeCurrencyConversionRates(this.state.mainFromCurrency);
    }

    componentWillReceiveProps(props) {
      this.manipulateCurrencies(props);
    }

    /**
     * @description: toast handler 
     */
    toastHandler = () => {
      if(Platform.OS === 'ios'){
        Alert.alert("Swapped Currencies")
      }else{
        ToastAndroid.show('Swapped Currencies', ToastAndroid.LONG);
      }
    }

    /**
     * @description: used to handle the input value from user input field
     */
    handleChangeInput = (text) => {
      this.setState({ inrValue: text })
    }

  /**
   * @description : realtime currency conversion rates are fetch from 'api.exchangeratesapi.io'
   */
  getRealTimeCurrencyConversionRates =  (baseCurrency) => {
    const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`
    console.log(url)
     fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        this.setState({
          globalCurrencyRate: responseJson.rates,
        });
      }).catch(error => {
        console.error('Unable to fetch rates now - ' + error)
      })
  }

  /**
   * @description: Convert the currency values for the given currencies
   */
  convButtonPressed = () => {
    const enteredCurrencyValue = parseInt(this.state.inrValue, 10);
    const currencyConversionRates  = this.state.globalCurrencyRate;
    const targetCurrencySymbol = this.state.mainToCurrency;
    const targetCurrencyValue = currencyConversionRates[targetCurrencySymbol]
    this.setState({
      conversionResult : parseFloat(enteredCurrencyValue * targetCurrencyValue).toFixed(3),
      isConversionCompleted: true
    })
  }

  
  /**
   * @description: helps to get from and to currency currecny list sreen and updates the conversion 
   *                rates according to the base currency
   */
  manipulateCurrencies = (props) =>{
    const currentFromCurrency = this.state.mainFromCurrency;
    const currentToCurrency = this.state.mainFromCurrency;
    const possibleNewToCurrency = props.navigation.getParam('toCurrency', 'USD')
    const possibleNewFromCurrency = props.navigation.getParam('fromCurrency', 'INR');
    if(currentFromCurrency != possibleNewFromCurrency) {
      // use the current from currency    
      this.setState({
        mainFromCurrency: possibleNewFromCurrency
      })
      this.getRealTimeCurrencyConversionRates(possibleNewFromCurrency);
    }
    if(currentToCurrency != possibleNewToCurrency){
      this.setState({
        mainToCurrency: possibleNewToCurrency
      })
    }
  }

  /**
   * @description: swap the from and to currencies
   */
  swapButtonPressed = () => {
      this.toastHandler()
      const changingFromCurrency = this.state.mainFromCurrency
      this.setState({
        mainFromCurrency: this.state.mainToCurrency,
        mainToCurrency: changingFromCurrency
      })
      this.getRealTimeCurrencyConversionRates(this.state.mainToCurrency);
  }

  _returnSubStringConversion = () => {
    if(this.state.isConversionCompleted){
      const currencyConversionRates  = this.state.globalCurrencyRate;
      const targetCurrencySymbol = this.state.mainToCurrency;
      const targetCurrencyValue = currencyConversionRates[targetCurrencySymbol]
      return(
        <View>
          <Text style={styles.resultCurrenyText}>{`1 ${this.state.mainFromCurrency} =  ${parseFloat(targetCurrencyValue).toFixed(3)} ${this.state.mainToCurrency}`}</Text>
        </View>
      )
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      headerRight: <HelpIcon />,
      headerLeft: <HamburgerMenu navigation = {navigation}/>
    }
  };

  /**
   * @description: Render Function starts here
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputText} placeholder="Enter amount here" keyboardType="numeric"
            onChangeText={this.handleChangeInput} />
        </View>
        <View style={[styles.pickerContainer, styles.fromFieldSpecific]}>
          <Text style={styles.fromText}>FROM</Text>
          <TouchableOpacity 
                            style={styles.languagePicker} 
                            onPress={() => { this.props.navigation.navigate('CurrencyList', {targetCurrId:'From'}) }} >
            <Text   style={styles.languagePicker}>{this.state.mainFromCurrency}</Text>
          </TouchableOpacity>
        </View>
    
        <View>
          <TouchableOpacity  onPress={() => {this.swapButtonPressed()}} >
            <Image source={require('../assets/icons/swap.png')}
                  style={styles.currRotateButton} />
                  
          </TouchableOpacity>
        </View>

        <View style={[styles.pickerContainer, styles.toFieldSpecific]}>
          <TouchableOpacity  
                             style={styles.languagePicker}
                             
                             onPress={() => { this.props.navigation.navigate('CurrencyList',{targetCurrId:'To'}) }} >
            <Text style={styles.languagePicker}>{this.state.mainToCurrency}</Text>
          </TouchableOpacity>
          <Text style={styles.fromText}>TO</Text>
        </View>

        <TouchableOpacity style={styles.convertButtonContainer}
          onPress={() => this.convButtonPressed()} >
          <Text style={styles.buttonText}>CONVERT</Text>
        </TouchableOpacity>
        
       <View style={{ height:'auto', justifyContent:'center', alignItems:'center'}}>
          <View style ={
            {flexDirection:'row',
               alignItems:'baseline', marginTop: 50
            }}>
            <Text style={{fontSize: 55, fontWeight: 'bold', color: '#ff8f00'}}>{this.state.conversionResult} </Text>
            <Text style={{fontSize:18, fontWeight: 'bold', color: '#ff8f00', paddingBottom: 9}} >{this.state.mainToCurrency}</Text>
          </View>
          {this._returnSubStringConversion()}
        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center'
  },
  inputContainer: {
    marginTop: 60, 
    marginBottom: 70
  },
  inputText: {
    width: 350,
    borderBottomWidth: 1,
    borderColor: '#0A79DF',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  languagePicker: {
    flex: 3,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 44,
    textAlign: 'center'
  },
  lanItem: {
    textAlign: 'center', textAlignVertical: 'center'
  },
  pickerContainer: {
    width: '70%',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#25CCF7"
  },
  fromText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 44,
    color: 'white',
    backgroundColor: '#25CCF7',
    borderColor: "#25CCF7"
  },
  fromFieldSpecific:{
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  toFieldSpecific:{ 
    alignSelf: 'flex-end', borderLeftWidth: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 
  },
  currRotateButton: {
    width: 30, height: 30, margin: 20
  },
  convertButtonContainer: {
    marginTop: 40, 
    backgroundColor: '#2475B0', 
    width: '75%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 44, 
    borderRadius: 25, 
  },
  buttonText: {
    fontSize: 27,
    fontWeight: '600',
    color: '#fff'
  },
  convertIconContainer: {
    width: 70,
    backgroundColor: '#b2ebf2',
    height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginLeft: 20
  },
  convertIcon: {
    width: 25, height: 25, alignSelf: 'center'
  },
  resultContainer: {
    marginTop: 50,
    width: '100%',
  },
  resultText: {
    fontSize: 45, fontWeight: '600', color: '#ff8f00',
  },
  resultCurrenyText: {
    fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'
  },
   statusBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
