import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,FlatList
} from 'react-native';

export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      conversionResult: '0.00',
      inrValue: 0,
      isLoading: true,
      globalCurrencyRate:''
    }
    this.convButtonPressed = this.convButtonPressed.bind(this);
  }
  componentDidMount(){
    this.getRealTimeCurrencyConversionRates();
  }

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

  handleChangeInput = (text) => {
    this.setState({ inrValue: text })
  }

  render(){
    return(
      <View style={styles.container}>      
        <View style={styles.resultViewer}>
          <Text style={styles.outputText}>{this.state.conversionResult}</Text>
        </View>
        <View style={
            { justifyContent: 'center', alignItems:'center', flexDirection: 'row',
            backgroundColor:'#b2dfdb', marginTop: 20, borderRadius: 12
            }}>
          <Image style={
                {
                  width: 25,height: 25,marginLeft: 10
                }} 
                source={require('./src/assets/icons/indian.png')}/>
                <View
                  style={{
                    backgroundColor:"gray", width:2, height:'80%', marginLeft:10
                  }}
                  >
                </View>
          
            <TextInput style={
              {   
                flex: 1, color:'black',
                fontSize: 20, fontWeight: 'bold', paddingLeft: 20,
                height: 50
              }
            }
              placeholder="Enter amount"
              placeholderTextColor="black"
              keyboardType="numeric"
              onChangeText={this.handleChangeInput}
              />
        </View>
        <View style={{   
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: 30,
          marginHorizontal: -5,
          justifyContent: 'space-between',
          paddingTop: 40
        }}>
              <TouchableOpacity onPress={()=>this.convButtonPressed('USD')} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>USD</Text>
              </TouchableOpacity >
              <TouchableOpacity onPress={()=>this.convButtonPressed('EUR')} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>EUR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.convButtonPressed('AUD')} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>AUD</Text>
              </TouchableOpacity>
        </View>
  </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#487EB0',
    alignItems: 'center',
    padding: 20
  },
  resultViewer: {
    height: 80,
    width: '100%',
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: "center",
    borderRadius: 20,
    marginTop: 60,
  },
  outputText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputViewer: {
    height: 80,
    width: '95%',
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  inputText: {
    height: 60,
    width: '100%',
    fontWeight: '600',
    fontSize: 23
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    width: '28.33%',
    height: 50,
    borderWidth: 2,
    backgroundColor: '#67E6DC',
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  }
});
