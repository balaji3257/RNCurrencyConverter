import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Image, Alert, ToastAndroid, Platform, SectionList, ScrollView, FlatList,Dimensions, Keyboard
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
    if(this.state.mainFromCurrency !== this.state.mainToCurrency){
      if((this.state.inrValue === 0) || (isNaN(this.state.inrValue))  ){
        Alert.alert("Please enter amount in number format !")
      }else{
          Keyboard.dismiss();
          const enteredCurrencyValue = parseInt(this.state.inrValue, 10);
          const currencyConversionRates  = this.state.globalCurrencyRate;
          const targetCurrencySymbol = this.state.mainToCurrency;
          const targetCurrencyValue = currencyConversionRates[targetCurrencySymbol]
          const covResult = parseFloat(enteredCurrencyValue * targetCurrencyValue).toFixed(3);
          
          this.setState({
            conversionResult : isNaN(covResult) ? Alert.alert("enter amount for conversion") : covResult,
            isConversionCompleted: true
          })
        }
      } else {
        Alert.alert("both currencies must not be same")
      }
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
        mainToCurrency: changingFromCurrency,
        isConversionCompleted: false,
        conversionResult: '0.00'
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

  _returnBorderLineElement = () =>{
    return(
      <View style={styles.lineBorder}></View>
    )
  }

  /**
   * @description: return popular currencies component
   */
  _returnPopularCurrencies = () => {
    const popularCurrencies = [
      {
        name:'CAD',
        desc:'Canadian dollar',
        thumbnail:'../assets/flags/canada.png',
        currentRate:null
      },
      {
        name:'GBP',
        desc:'Pound sterling',
        thumbnail:'../assets/flags/united-kingdom.png',
        currentRate:null
      },
      {
        name:'INR',
        desc:'Indian rupees',
        thumbnail:'../assets/flags/india.png',
        currentRate:null
      },
      {
        name:'USD',
        desc:'United States dollar',
        thumbnail:'../assets/flags/united-states-of-america.png',
        currentRate:null
      },
      {
        name:'AUD',
        desc:'Australian dollar',
        thumbnail:'../assets/flags/australia.png',
        currentRate:null
      }
    ]
    if(this.state.isConversionCompleted)
    {
      return(
        <View style={{overflow:'hidden', flex:1, width: '98%', borderWidth: 0.5, borderColor: '25CCF7', borderRadius:12, }}>
          <View style={{backgroundColor:'#25CCF7',}}>
            <Text style={{fontWeight:'bold', fontSize:16, 
                        textAlign:'center', color:'#fff',
                    }}>Other Currencies</Text></View>
        <ScrollView>
        <FlatList
              data={popularCurrencies}
              renderItem={({item}) => 
                    <View style={styles.listTextContainer}>
                        <TouchableOpacity style={styles.touchContainer}>
                          <View style={{flexDirection:'row'}}>
                            <Image style={styles.currecyIcon}
                                    source={require('../assets/flags/canada.png')}/>
                            <View style={{marginBottom: 5, marginLeft:15}}>
                                <Text style={[styles.listText,{}]}>{item.desc}</Text>
                                <Text style={{
                                    fontSize: 12, color:'#2475B0' , fontWeight:'600', fontStyle:'italic'
                                  }}>{item.name}</Text>
                            </View>
                            </View>
                            <View>
                              <Text style={{fontWeight:'bold',fontSize:16,fontStyle:'italic'}}> 123.11</Text>
                            </View>
                        </TouchableOpacity>
                       
                        </View>
                    }
              keyExtractor={item => item.name}
                />
        </ScrollView>
        </View>
      )
    }
  }


    /**
     * @description: return sub currencies value to the main conversion result.
     */
  _returnSubCurrencyValue = () => {
    if(this.state.isConversionCompleted){
      return(
        <Text style={{fontSize:18, fontWeight: 'bold', color: '#ff8f00', alignSelf:'center'}} >{this.state.mainToCurrency}</Text>
      )
    } else {
      return null;
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
      
        <View style={{width: '100%', borderRadius:20, alignItems:'center', backgroundColor:'#eceff1', height: 'auto', paddingVertical: 20}}>
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
        
        
            {this._returnBorderLineElement()}
            <TouchableOpacity style={styles.convertButtonContainer}
              onPress={() => this.convButtonPressed()} >
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
        
        </View>
        <View style={{ height:'auto', justifyContent:'center', alignItems:'center' }}>
          <View style ={{flexDirection:'row' }}>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#ff8f00'}}>{this.state.conversionResult} </Text>
            {this._returnSubCurrencyValue()}
          </View>
          {this._returnSubStringConversion()}
        </View>
      
            
        {this._returnPopularCurrencies()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center'
  },
  inputContainer: {
    marginTop: 20, 
    marginBottom: 10
  },
  inputText: {
    width: Dimensions.get('window').width * 0.8,
    borderBottomWidth: 1,
    opacity:0.5,
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
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 44,
    textAlign: 'center',
  
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
    borderColor: "#25CCF7",
    backgroundColor:'#fff'
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
    backgroundColor: '#2475B0', 
    width: '65%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 44, 
    borderRadius: 12, 
  },
  buttonText: {
    fontSize: 27,
    fontWeight: '600',
    color: '#fff'
  },
  convertIcon: {
    width: 25, height: 25, alignSelf: 'center'
  },
  
  resultText: {
    fontSize: 35, fontWeight: '600', color: '#ff8f00',
  },
  resultCurrenyText: {
    fontSize: 17, fontWeight: 'bold', opacity: 0.7,color: '#2475B0'
  },
   statusBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lineBorder:{
    width: '100%',
    marginVertical: 15,
},
listTextContainer:{
  borderBottomWidth: 0.5, 
  width: '90%',
  alignSelf:'center',
  height: 'auto'
},touchContainer:{
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'space-between',marginVertical:5
},
currecyIcon:{
  width: 35, 
  height: 35,
  alignSelf:'center'
},
listText:{
  fontSize: 16,
  fontWeight: '300',
  color: '#192A56'
},
});
