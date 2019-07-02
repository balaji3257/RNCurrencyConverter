'use strict'
/**
 * https://github.com/vikrantnegi/react-native-searchable-flatlist/blob/master/src/SearchableList.js
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native';

export default class CurrencyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'Default Value',
            pickerOpacity: 0,
            loading: false,
            data: [],
            error: null
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    /**
     * @description: Fetch Random user information as JSON data from 'randomuser.me'
     */
    makeRemoteRequest = () => {
        const url = 'https://randomuser.me/api/?&results=5';
        this.setState({
            loading: true
        });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.results,
                    error: res.error || null,
                    loading: false
                });
                this.arrayHolder = res.results;
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }
    /**
     * @description: Toggle picker by changing the opacity of the picker
     */
    togglePicker = () => {
        this.setState({
            pickerOpacity: 1
        });
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
                        autoFocus={true}
                        autoCorrect={true}
                        onChangeText={(text) => this.searchFilterFunction(text)}
                        placeholder='Search Here'></TextInput>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={{
                            alignSelf: 'center', marginVertical: 10, borderBottomWidth: 0.2,
                            flexDirection: 'row', justifyContent:'space-between', width:'90%'
                        }}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={{uri: item.picture.thumbnail}} 
                                style={{height: 30, width: 30, marginHorizontal:10, borderRadius: 12}}  />
                                <View style={{marginBottom: 3}}>
                                    <Text style={{fontWeight: 'bold'}}>{item.name.first}  {item.name.last}</Text>
                                    <Text>{item.email}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text style={{alignSelf:"center", textAlign:'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
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
        flexDirection: 'row', alignSelf: 'center', justifyContent: 'center',
        backgroundColor:'#A4B0BD', borderRadius:12, marginTop: 3
    },
    SeachBar: {
        width:'90%', alignSelf: 'center',paddingLeft: 20
    },
    icon: {
        height: 22, width: 22, margin: 5
    },
    item: {
        fontSize: 18,
        alignSelf: 'center'
    },
})
