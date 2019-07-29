import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Image, Alert, ToastAndroid, Platform, ScrollView, FlatList,Dimensions, Keyboard
} from 'react-native';





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
      isConversionCompleted: false,
      isHiddenPopularSection: false,
      errorColor: '#25CCF7'
    }
  }

    _toggleBorderColorToError = () =>{
      this.setState({errorColor: '#E44236'})
    }

    _toggleBorderColorToNormal = () =>{
      this.setState({errorColor: '#25CCF7'})
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
      this._toggleBorderColorToNormal()
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
          this._toggleBorderColorToError();
      }else{
          Keyboard.dismiss();
          const enteredCurrencyValue = parseInt(this.state.inrValue, 10);
          const currencyConversionRates  = this.state.globalCurrencyRate;
          const targetCurrencySymbol = this.state.mainToCurrency;
          const targetCurrencyValue = currencyConversionRates[targetCurrencySymbol]
          const covResult = parseFloat(enteredCurrencyValue * targetCurrencyValue).toFixed(3);
          this.setState({isHiddenPopularSection: true})
          this.setState({
            conversionResult : isNaN(covResult) ? this._toggleBorderColorToError() : covResult,
            isConversionCompleted: true
          })
        }
      } else {
        Alert.alert("both currencies must not be same")
      }
  }

  
  /**
   * @description: helps to get from and to currency currecny list sreen and updates the conversion 
   *                 rates according to the base currency
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
        thumbnail:require('../assets/flags/canada.png'),
        currentRate:null
      },
      {
        name:'GBP',
        desc:'Pound sterling',
        thumbnail:require('../assets/flags/united-kingdom.png'),
        currentRate:null
      },
      {
        name:'INR',
        desc:'Indian rupees',
        thumbnail:require('../assets/flags/india.png'),
        currentRate:null
      },
      {
        name:'USD',
        desc:'United States dollar',
        thumbnail:require('../assets/flags/united-states-of-america.png'),
        currentRate:null
      },
      {
        name:'AUD',
        desc:'Australian dollar',
        thumbnail:require('../assets/flags/australia.png'),
        currentRate:null
      }
    ]
    if(this.state.isConversionCompleted && this.state.isHiddenPopularSection)
    {
      return(
        <View style={{overflow:'hidden', flex:1, width: '98%', borderWidth: 0.5, borderColor: '25CCF7', borderRadius:12, }}>
          <View style={{backgroundColor:'#25CCF7',flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold', fontSize:16, 
                        textAlign:'center', color:'#fff',marginLeft:10
                    }}>Other popular currencies</Text>
                    <TouchableOpacity onPress={() => {this.setState({isHiddenPopularSection: !this.state.isHiddenPopularSection})}}>
                          <Text style={{marginRight: 10, fontSize: 14, fontWeight:'bold'}}>Hide</Text>
                    </TouchableOpacity>
            </View>
        <ScrollView>
        <FlatList
              data={popularCurrencies}
              renderItem={({item}) => 
                    <View style={styles.listTextContainer}>
                        <TouchableOpacity style={styles.touchContainer}>
                          <View style={{flexDirection:'row'}}>
                            <Image style={styles.currecyIcon}
                                    source={item.thumbnail}/>
                            <View style={{marginBottom: 5, marginLeft:15}}>
                                <Text style={[styles.listText,{}]}>{item.desc}</Text>
                                <Text style={{
                                    fontSize: 12, color:'#2475B0' , fontWeight:'600', fontStyle:'italic'
                                  }}>{item.name}</Text>
                            </View>
                            </View>
                            <View>
                              <Text style={{fontWeight:'bold',fontSize:16,fontStyle:'italic'}}> ￡ 123.11</Text>
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

  // static navigationOptions = ({ navigation }) => {
  //   return{
  //     headerRight: <HelpIcon />,
  //     headerLeft: <HamburgerMenu navigation = {navigation}/>
  //   }
  // };

  /**
   * @description: Render Function starts here
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={[styles.inputText,{borderColor:this.state.errorColor}]} placeholder="Enter amount here" keyboardType="numeric"
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
