import React from "react";
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,Alert } from "react-native";
import LineChart from "react-native-responsive-linechart";
import Data from '../Data';


export default class App extends React.Component {

    constructor(props){
      super(props);
      this.state={
        mapConfigButtonColor:'#29b6f6',
        nwElement :[
          {id:'1 day'},{id:'3 day'},{id:'10 d'}
          ,{id:'3 m'},{id:'1 year'},{id:'5 year'}
        ],
        activeTileIndex: 0
      }
    }

    mapConfigChangeBCColor=()=>{
      
    }

    mapConfigButtonPressed = index => {
      this.setState({activeTileIndex: index});
    }

  

    loadData = (results) =>{
        let dataLen = Object.keys(results.rates).length
        let outArray = [];
            for(var i = 0; i<dataLen; i++){
                let inputObjectToBePushed = {};
                let date_value = Object.keys(results.rates)[i];
                let dateObject = results.rates[date_value];                        
                inputObjectToBePushed['x'] = date_value;                
                inputObjectToBePushed['y'] =  parseFloat(dateObject.INR.toFixed(3));            
                outArray.push(inputObjectToBePushed);
            }
        console.log('original---')
        console.log(JSON.stringify(outArray))
        outArray.sort(function(a,b){
            return new Date(a.x) - new Date(b.x);
        });
        let data_x = [];
        let data_y = [];

        for(let i = 0 ; i< outArray.length; i++){
            data_x.push(outArray[i].x);
            data_y.push(outArray[i].y);
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartsConfigContainer} elevation={1}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CurrencyList', {targetCurrId:'From',context:'charts'})}}>
            <View style={styles.fromToContainer}>
                <Image style ={styles.fromToContainerFlag} source={require('../assets/flags/united-states-of-america.png')}/>
                <Text style={styles.fromToText}>USD</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.swapContainer}>
                  <Image style ={styles.swapIcon} source={require('../assets/icons/swapHArrows.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View  style={styles.fromToContainer}>
                <Image style ={styles.fromToContainerFlag} source={require('../assets/flags/india.png')}/>
                <Text style={styles.fromToText}>INR</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mapDataConfigContainer}>
              {
                this.state.nwElement.map((item, index) => (
                  <TouchableOpacity key={item.id}  onPress={()=>this.mapConfigButtonPressed(index)}>
                    <View style={[styles.mapConfigTest,index === this.state.activeTileIndex ? styles.activeTileStyles : styles.tileStyles]}>
                      <Text style={{color:'#fff', fontSize:18}}>{item.id}</Text>
                    </View>
                  </TouchableOpacity> ))
              }
        </View>
        <ScrollView style={{ height: "100%", flex: 1 , width: '100%'}}>
          <View style={{ margin: 10, height: 200, elevation: 2, backgroundColor: "#fff", shadowColor: "black", shadowOpacity: 0.5}}>
            <Text style={{fontSize:15, alignSelf:'center', fontWeight:'400'}}>USD/INR</Text>
            <Text>1 USD = xINR</Text>
            <LineChart style={{ flex: 1 }} config={config1} data={data1} />
          </View>       
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chartsConfigContainer:{
      flexDirection: 'row',
      justifyContent:'space-around', 
      margin: 10, 
      backgroundColor: '#0288d1',
      width:'85%',
      padding: 15,
      alignContent:'center',
      borderRadius: 15
  },
  fromToContainer:{
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:35,
    alignItems:'center'
  },
  fromToContainerFlag:{
    height: 30,
    width:30,
    margin: 7
  },
  fromToText:{
      margin: 5,
      fontSize: 20,
  },
  
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  swapIcon:{
    height: 30, 
    width: 30, 
    alignSelf:'center',
    marginTop:5
  },
  mapDataConfigContainer:{
    height:60,
    width:'97%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  mapConfigTest:{
    height:50,
    width:65,
    padding: 4,
    alignSelf:'center',
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  tileStyles: {
    backgroundColor: '#29b6f6'
  },
  activeTileStyles: {
    backgroundColor: '#4f83cc'
  }
  
})



const data1 = [68.795,68.522,68.74,68.947,68.872,68.673,68.827,68.772,68.52,68.481,68.559,68.455,
            68.628,69.05,68.827,68.857,68.948,68.746,68.665,68.685,68.638,68.545,68.374,68.685,68.616,
            68.864,68.682,68.625,68.647,68.83,70.017,69.903,69.926,70.191,70.16,69.825,69.815,69.895,
            70.111,69.91,70.165,70.108,70.618,70.745,71.002,71.215,71.585,71.752,71.959,71.735,72.455,
            72.66,72.223,72.031,71.816,72.518,72.977,72.385,72.012,72.192,72.68,72.695,72.607,72.592,72.491,72.912,73.378,73.361,73.577,73.773,74.062,74.407,74.227,74.092,73.565,73.805,73.462,73.627,73.607,73.342,73.557,73.57,73.163,73.277,73.46,73.42,73.626,73.98,73.449,72.443,73.08,72.96,72.499,72.409,72.505,72.89,72.675,72.303,71.977,71.896,71.657,71.491,71.305,70.687,70.652,70.878,70.764,70.58,69.849,69.62,70.412,70.534,70.518,70.914,70.802,72.41,71.906,71.999,71.61,71.976,71.61,70.54,70.246,69.818,70.124,70.143,70.269,70.041,69.633,70.181,70.152,69.658,69.628,70.144,70.394,70.395,70.535,70.829,71.106,71.126,71.057,71.117,71.232,71.381,71.306,71.119,71.068,71.144,71.184,71.179,71.106,71.285,71.813,71.644,71.576,71.472,71.272,71.136,70.645,70.824,71.178,71.369,71.401,71.453,71.155,71.115,71.128,70.922,71.167,71.279,70.858,70.891,70.886,70.559,70.263,69.988,70.16,69.857,69.639,69.594,69.476,69.043,68.536,68.983,68.818,68.562,68.977,68.915,68.865,69.141,69.332,69.176,69.32,68.753,68.425,69.162,69.249,69.644,69.334,69.15,68.968,69.156,69.425,69.566,69.425,69.394,69.642,69.85,70.286,70.017,69.833,69.586,69.374,69.26,69.41,69.414,69.702,69.993,69.998,70.558,70.406,70.355,70.043,70.205,69.657,69.692,69.698,69.948,69.545,69.529,69.606,69.821,69.886,69.717,69.264,69.258,69.332,69.251,69.486,69.591,69.448,69.32,69.514,69.781,69.946,69.724,69.667,69.432,69.546,69.411,69.347,69.152,69.101,69.002,68.936,68.957,68.845,68.509,68.481,68.565,68.524,68.584,68.365,68.641,68.525,68.687,68.866,68.899,68.817,68.933,68.93];
const config1 = {
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: "#54a0ff"
  },
  area: {
    visible: true,
    gradientFrom: "#2e86de",
    gradientFromOpacity: 1,
    gradientTo: "#87D3FF",
    gradientToOpacity: 1
  },
  tooltip: {
    visible: true,
    labelFontSize: 10
  },
  dataPoint: {
    visible: false,
    color: "#777",
    radius: 1,
    label: { visible: true, marginBottom: 25 },
    labelFontSize: 5
  },
  grid: {
    stepSize: 1
  },
  yAxis: {
    labelColor: "#54a0ff",
    
  },
  insetY: 20,
  insetX: 20
};