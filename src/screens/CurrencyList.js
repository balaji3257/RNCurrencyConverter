'use strict'

import React from 'react';
import {
    StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator
} from 'react-native';
import HelpIcon from '../components/Help';


const Currencies =
    {
        CAD: 'Canadian dollar',
        HKD: 'Hong Kong dollar',
        ISK: 'Icelandic krona',
        PHP: 'Philippine peso',
        DKK: 'Danish krone',
        HUF: 'Hungarian forint',
        CZK: 'Czech koruna',
        GBP: 'Pound sterling',
        RON: 'Romanian leu',
        SEK: 'Swedish krona	',
        IDR: 'Indonesian rupiah',
        INR: 'Indian rupee',
        BRL: 'Brazilian real',
        RUB: 'Russian ruble',
        HRK: 'Croatian kuna',
        JPY: 'Japanese yen',
        THB: 'Thai baht	',
        CHF: 'Swiss franc	',
        EUR: 'European euro',
        MYR: 'Malaysian ringgit',
        BGN: 'Bulgarian lev',
        TRY: 'Turkish lira',
        CNY: 'Chinese Yuan Renminbi',
        NOK: 'Norwegian krone',
        NZD: 'New Zealand dollar',
        ZAR: 'South African rand',
        USD: 'United States dollar',
        MXN: 'Mexican peso',
        SGD: 'Singapore dollar',
        AUD: 'Australian dollar',
        ILS: 'Israeli new shekel',
        KRW: 'South Korean won',
        PLN: 'Polish zloty'
    }

export default class CurrencyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currencyTargetId: props.navigation.getParam('targetCurrId')
        };
        this.arrayholder = [];
    }

    /**
     * @description: Search filter function
     */
    searchFilterFunction = (text) => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.title.toUpperCase()}   
            ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) != -1;
        });

        this.setState({ data: newData });
    };

    /**
     * @description: to update the from and to currency for conversion
     * @param: currency selction from the Flat list component
     */
    updateCurrencySelction = (currencySelection) => {
        const currTargetId = this.state.currencyTargetId;
        if(currTargetId === 'From'){
            this.props.navigation.navigate('HomeScreen', {fromCurrency: currencySelection});
        }else{
            this.props.navigation.navigate('HomeScreen', {toCurrency: currencySelection});
        }
    }


    static navigationOptions = ({ navigation }) => {
        return {
          title: `${navigation.getParam('targetCurrId')} Currecy` ,
          headerRight: <HelpIcon />,
        };
      };

     
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
                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Image style={styles.icon}
                            source={require('../assets/icons/searchicon.png')} />
                    </TouchableOpacity>
                    <TextInput style={styles.SeachBar}
                        autoFocus={false}
                        autoCorrect={true}
                        onChangeText={(text) => this.searchFilterFunction(text)}
                        placeholder='Search Here'></TextInput>
                </View>
                <FlatList
                    
                    data={Object.keys(Currencies)}
                    renderItem={({item}) => 
                            <View style={styles.listTextContainer}>
                                <TouchableOpacity style={styles.touchContainer} onPress={() => {this.updateCurrencySelction(item)}}>
                                    <Image style={styles.currecyIcon}source={require('../assets/icons/euro.png')}/>
                                    <View style={{marginBottom: 5}}>
                                        <Text style={styles.listText}>{item}</Text>
                                        <Text style={{
                                            fontSize: 15, color:'#2475B0' , fontWeight:'600',
                                          }}>{Currencies[item]}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            }
                    keyExtractor={item => item}
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
        alignSelf: 'center', 
        justifyContent: 'center',
        backgroundColor:'#A4B0BD',
        borderRadius:12, 
        marginTop: 3
    },
    SeachBar: {
        width:'90%', 
        alignSelf: 'center',
        paddingLeft: 20
    },
    icon: {
        height: 22, width: 22, margin: 5
    },
    listTextContainer:{
        borderBottomWidth: 0.5, 
        width: '90%',
        alignSelf:'center',
        height: 'auto'
    },
    touchContainer:{
        flexDirection: 'row',
        alignItems:'center'
    },
    listText:{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#192A56'
    },
    currecyIcon:{
        width: 30, 
        height: 30,
        marginRight: 10
    }
})
