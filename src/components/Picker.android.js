import React from 'react';
import {
  StyleSheet,
  Text,
  View, Modal,
  TouchableOpacity
} from 'react-native';

export default class CustomPickerAndroid extends React.Component{
  constructor(props){
    super(props);
    this.state={
      language: 'Default Value',
      isModalVisible : false,
      currencyListLocal:  []
    }
  }
  /**
   * @description: change the state to the modal window
   */
  toggleModal =(modalState) => {
      this.setState({
        isModalVisible: modalState
      });
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
  
    render(){
        return(
                <View   style={styles.container} >
                  <Text>Behind the Modal window</Text>
                  <TouchableOpacity onPress={() =>{this.toggleModal(true)}}>
                    <Text>Select value</Text>
                  </TouchableOpacity>
                  <Modal 
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');}}>
                        <View style={styles.modalContainer}>
                          <View>
                            <Text>$Currencies</Text>
                            <TouchableOpacity
                              onPress={() => {
                                this.toggleModal(!this.state.isModalVisible)
                              }}>
                              <Text>Close</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                  </Modal>
                </View>
        );
    }
}



const styles = StyleSheet.create({
  container:{
      marginTop: 50, flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  modalContainer:{
    position: 'absolute', bottom: 0, right: 0, left: 0, justifyContent:'center', alignItems:'center'
  }
})

