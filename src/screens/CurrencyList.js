'use strict'

import React from 'react';
import {
    StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator,
     Button
} from 'react-native';


const Currencies =
    [
      { name: 'CAD', desc:'Canadian dollar'},
      { name: 'HKD', desc:'Hong Kong dollar'},
      { name: 'ISK', desc:'Icelandic krona'},
      { name: 'PHP', desc:'Philippine peso'},
      { name: 'DKK', desc:'Danish krone'},
      { name: 'HUF', desc:'Hungarian forint'},
      { name: 'CZK', desc:'Czech koruna'},
      { name: 'GBP', desc:'Pound sterling'},
      { name: 'RON', desc:'Romanian leu'},
      { name: 'SEK', desc:'Swedish krona'},
      { name: 'IDR', desc:'Indonesian rupiah'},
      { name: 'INR', desc:'Indian rupee'},
      { name: 'BRL', desc:'Brazilian real'},
      { name: 'RUB', desc:'Russian ruble'},
      { name: 'HRK', desc:'Croatian kuna'},
      { name: 'JPY', desc:'Japanese yen'},
      { name: 'THB', desc:'Thai baht'},
      { name: 'CHF', desc:'Swiss franc'},
      { name: 'EUR', desc:'European euro'},
      { name: 'MYR', desc:'Malaysian ringgit'},
      { name: 'BGN', desc:'Bulgarian lev'},
      { name: 'TRY', desc:'Turkish lira'},
      { name: 'CNY', desc:'Chinese Yuan Renminbi'},
      { name: 'NOK', desc:'Norwegian krone'},
      { name: 'NZD', desc:'New Zealand dollar'},
      { name: 'ZAR', desc:'South African rand'},
      { name: 'USD', desc:'United States dollar'},
      { name: 'MXN', desc:'Mexican peso'},
      { name: 'SGD', desc:'Singapore dollar'},
      { name: 'AUD', desc:'Australian dollar'},
      { name: 'ILS', desc:'Israeli new shekel'},
      { name: 'KRW', desc:'South Korean won'},
      { name: 'PLN', desc:'Polish zloty'}
    ]



export default class CurrencyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isSearchBarVisible : false,
            currencyTargetId: props.navigation.getParam('targetCurrId'),
            flatListData : Currencies
        };
        this.arrayholder = Currencies;
    }

    /**
     * @description: Search filter function
     */
    searchFilterFunction = (text) => {
        const listOfCurrencies = Currencies
        console.log(listOfCurrencies)
        console.log(`user text ${text}`)
        let newData = listOfCurrencies.filter(item => {
            const itemData = `${item.name.toUpperCase()}   
            ${item.desc.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) != -1;
        });
       this.setState({
           flatListData: newData
       })
    };

    /**
     * @description: to update the from and to currency for conversion
     * @param: currency selction from the Flat list component
     */
    updateCurrencySelction = (currencySelection) => {
        const currTargetId = this.state.currencyTargetId;
        if(currTargetId === 'From'){
            this.props.navigation.navigate('HomeScreen', {fromCurrency: currencySelection.desc});
        }else{
            this.props.navigation.navigate('HomeScreen', {toCurrency: currencySelection.desc});
        }
    }

     /***
     * @description: toggle search bar 
     */
    toggleSearchBar = () => {
        this.setState({
            isSearchBarVisible:!this.state.isSearchBarVisible,
            flatListData: Currencies

        });
    }

   componentDidMount(){
        this.props.navigation.setParams({ toggleSearchBar: this.toggleSearchBar });    
   }


    static navigationOptions = ({ navigation }) => {
        return {
          title: `${navigation.getParam('targetCurrId')} Currecy` ,
          headerRight: (
            <TouchableOpacity onPress = {navigation.getParam('toggleSearchBar')}>
            <Image style={styles.icon}
                    source={require('../assets/icons/searchicon.png')} />   
            </TouchableOpacity>
          )
        };
      };

    _returnSearchBar = () =>{
        if(this.state.isSearchBarVisible){
            return(
                <View style={styles.searchContainer}>
                <TextInput style={styles.SeachBar}
                            autoFocus={true}
                            autoCorrect={false}
                            placeholderTextColor={'white'}
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            placeholder='Search Here'>
                            
                </TextInput>
                
                </View>
            )
        }
    }
     
    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#4834DF" />
              </View>
            );
          }
        return (
            <View style={styles.container}>
                {this._returnSearchBar()}
                <FlatList
                    
                    data={this.state.flatListData}
                    renderItem={({item}) => 
                            <View style={styles.listTextContainer}>
                                <TouchableOpacity style={styles.touchContainer} onPress={() => {this.updateCurrencySelction(item)}}>
                                    <View  style={{flexDirection:'row',alignItems:'center'}}>
                                        <Image style={styles.currecyIcon}source={require('../assets/flags/australia.png')}/>
                                        <View style={{marginBottom: 5}}>
                                            <Text style={styles.listText}>{item.desc}</Text>
                                        </View>
                                    </View>
                                    <Text style={{
                                            fontSize: 16, fontWeight:'bold', color:'#2475B0' ,
                                          }}>{item.name}</Text>
                                </TouchableOpacity>
                                </View>
                            }
                    keyExtractor={item => item.name}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor:'#e3f2fd',
        height: 45,
        borderRadius: 8,
        marginTop:1
    },
    SeachBar: {
        width:'90%', 
        alignSelf: 'center',
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: 28, width: 28, margin: 10, alignSelf:'center'
    },
    listTextContainer:{
        borderBottomWidth: 0.5, 
        width: '90%',
        alignSelf:'center',
        height: 'auto',
        marginBottom: 8,
        borderColor:'#3498DB'
    },
    touchContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    listText:{
            fontSize: 18,
            fontWeight: '400',
            color: '#192A56',
            marginLeft:10
    },
    currecyIcon:{
        width: 40, 
        height: 40,
        margin: 6,
        marginLeft:0
    }
})
