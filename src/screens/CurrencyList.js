'use strict'

import React from 'react';
import {
    StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator,
     Button
} from 'react-native';


const Currencies =
    [
      { thumbnail: require('../assets/flags/canada.png'),name: 'CAD', desc:'Canadian dollar'},
      { thumbnail: require('../assets/flags/hong-kong.png'),name: 'HKD', desc:'Hong Kong dollar'},
      { thumbnail: require('../assets/flags/iceland.png'),name: 'ISK', desc:'Icelandic krona'},
      { thumbnail: require('../assets/flags/philippines.png'),name: 'PHP', desc:'Philippine peso'},
      { thumbnail: require('../assets/flags/denmark.png'),name: 'DKK', desc:'Danish krone'},
      { thumbnail: require('../assets/flags/hungary.png'),name: 'HUF', desc:'Hungarian forint'},
      { thumbnail: require('../assets/flags/czech-republic.png'),name: 'CZK', desc:'Czech koruna'},
      { thumbnail: require('../assets/flags/united-kingdom.png'),name: 'GBP', desc:'Pound sterling'},
      { thumbnail: require('../assets/flags/romania.png'),name: 'RON', desc:'Romanian leu'},
      { thumbnail: require('../assets/flags/sweden.png'),name: 'SEK', desc:'Swedish krona'},
      { thumbnail: require('../assets/flags/indonesia.png'),name: 'IDR', desc:'Indonesian rupiah'},
      { thumbnail: require('../assets/flags/india.png'),name: 'INR', desc:'Indian rupee'},
      { thumbnail: require('../assets/flags/brazil.png'),name: 'BRL', desc:'Brazilian real'},
      { thumbnail: require('../assets/flags/russia.png'),name: 'RUB', desc:'Russian ruble'},
      { thumbnail: require('../assets/flags/croatia.png'),name: 'HRK', desc:'Croatian kuna'},
      { thumbnail: require('../assets/flags/japan.png'),name: 'JPY', desc:'Japanese yen'},
      { thumbnail: require('../assets/flags/thailand.png'),name: 'THB', desc:'Thai baht'},
      { thumbnail: require('../assets/flags/switzerland.png'),name: 'CHF', desc:'Swiss franc'},
      { thumbnail: require('../assets/flags/european-union.png'),name: 'EUR', desc:'European euro'},
      { thumbnail: require('../assets/flags/malaysia.png'),name: 'MYR', desc:'Malaysian ringgit'},
      { thumbnail: require('../assets/flags/bulgaria.png'),name: 'BGN', desc:'Bulgarian lev'},
      { thumbnail: require('../assets/flags/turkey.png'),name: 'TRY', desc:'Turkish lira'},
      { thumbnail: require('../assets/flags/china.png'),name: 'CNY', desc:'Chinese Yuan Renminbi'},
      { thumbnail: require('../assets/flags/norway.png'),name: 'NOK', desc:'Norwegian krone'},
      { thumbnail: require('../assets/flags/new-zealand.png'),name: 'NZD', desc:'New Zealand dollar'},
      { thumbnail: require('../assets/flags/south-africa.png'),name: 'ZAR', desc:'South African rand'},
      { thumbnail: require('../assets/flags/united-states-of-america.png'),name: 'USD', desc:'United States dollar'},
      { thumbnail: require('../assets/flags/mexico.png'),name: 'MXN', desc:'Mexican peso'},
      { thumbnail: require('../assets/flags/singapore.png'),name: 'SGD', desc:'Singapore dollar'},
      { thumbnail: require('../assets/flags/australia.png'),name: 'AUD', desc:'Australian dollar'},
      { thumbnail: require('../assets/flags/israel.png'),name: 'ILS', desc:'Israeli new shekel'},
      { thumbnail: require('../assets/flags/south-korea.png'),name: 'KRW', desc:'South Korean won'},
      { thumbnail: require('../assets/flags/portugal.png'),name: 'PLN', desc:'Polish zloty'}
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
            this.props.navigation.navigate('HomeScreen', {fromCurrency: currencySelection.name});
        }else{
            this.props.navigation.navigate('HomeScreen', {toCurrency: currencySelection.name});
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
                                        <Image style={styles.currecyIcon}source={item.thumbnail}/>
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
