import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Picker, Modal,
} from 'react-native';


class HelpIcon extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        modalVisible: false,
      }
    }

  /**
   * @description: set the visible propperty for the Modal window
   */
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render(){
    return(
      <View>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={ () => { this.setModalVisible(!this.state.modalVisible) }}>
            <Text style={styles.helpIcon}>Help</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal animationType="slide" transparent={false}
            visible={this.state.modalVisible}>
            <View style={{ marginTop: 22 }}>
              <View>
                <TouchableOpacity onPress={ () => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                  <Text style={styles.closeButton}>close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversionResult: '0.00',
      inrValue: 0,
      isLoading: true,
      globalCurrencyRate: null,
      modalVisible: false,
      fromCurrency: 'USD',
      toCurrency: "INR"
    }
    this.convButtonPressed = this.convButtonPressed.bind(this);
  }

  componentDidMount() {
    // fetch the currency coinversion rates
    this.getRealTimeCurrencyConversionRates();
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
  getRealTimeCurrencyConversionRates = async () => {
    return fetch('https://api.exchangeratesapi.io/latest?base=INR')
      .then((response) => response.json())
      .then((responseJson) => {
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
  convButtonPressed = (currencyType) => {
    var currencyRate = 0.00
    if ((this.state.inrValue === 0) || (isNaN(this.state.inrValue))) {
      Alert.alert("Please enter some amount in 'INR' format")
    } else {
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
      this.setState({ conversionResult: parseFloat(Number(this.state.inrValue) * currencyRate).toFixed(4).toString() })
    }
  }

  static navigationOptions ={
    headerRight: <HelpIcon/>,
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

        <View style={styles.pickerContainer}>
          <Text style={styles.fromText}>FROM</Text>
          <TouchableOpacity style={styles.languagePicker} onPress={ ()=> {this.props.navigation.navigate('CurrencyList')}} >
            <Text style={styles.languagePicker}>{this.state.fromCurrency}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => { this.rotateButtonPressed }}>
            <Image source={require('../assets/icons/swap.png')}
              style={styles.currRotateButton} />
          </TouchableOpacity>
        </View>

        <View style={[styles.pickerContainer, { alignSelf: 'flex-end' }]}>
        <TouchableOpacity style={styles.languagePicker} onPress={ ()=> {this.props.navigation.navigate('CurrencyList')}} >
            <Text style={styles.languagePicker}>{this.state.toCurrency}</Text>
          </TouchableOpacity>
          <Text style={styles.fromText}>TO</Text>
        </View>

        <TouchableOpacity style={styles.convertButtonContainer}
          onPress={() => this.convButtonPressed('USD')} >
          <Text style={styles.buttonText}>CONVERT</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>2344.99 EUR</Text>
          <Text style={styles.resultCurrenyText}>1 USD = 0.90 EUR</Text>
        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#2475B0',justifyContent: 'center'
  },
  helpIcon: {
    color: 'white', 
    fontSize: 18, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    padding: 14, 
    fontWeight:'bold'
  },
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center'
  },
  inputContainer: {
    marginVertical: 40
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
    flex: 3, textAlignVertical:'center', textAlign:'center', fontWeight: 'bold', fontSize: 18
  },
  lanItem: {
    textAlign: 'center', textAlignVertical: 'center'
  },
  pickerContainer: {
    width: '70%', flexDirection: 'row', backgroundColor: '#e0f7fa'
    , alignSelf: 'flex-start', borderRadius: 25, height: 45

  },
  fromText: {
    flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: 23,
    fontWeight: '500', backgroundColor: '#25CCF7', color: '#fff'
  },
  currRotateButton: {
    width: 30, height: 30, margin: 20
  },
  convertButtonContainer: {
    marginTop: 40, backgroundColor: '#2475B0', width: '75%', justifyContent: 'center', alignItems: 'center'
    , height: 60, borderRadius: 25, flexDirection: 'row'
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  resultText: {
    fontSize: 45, fontWeight: '600', color: '#ff8f00'
  },
  resultCurrenyText: {
    fontSize: 18, fontWeight: 'bold', fontStyle: 'italic'
  },

  closeButton: {
    fontSize: 30,
    fontWeight: 'bold', textAlign: 'right', marginHorizontal: 30
  }, statusBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
