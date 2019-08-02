import React from "react";
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity,Alert,ActivityIndicator
,Dimensions } from "react-native";
import LineChart from "react-native-responsive-linechart";
import Data from '../Data';
import moment from 'moment'

 


export default class App extends React.Component {

  
    constructor(props){
      
      super(props);
     
      this.state={
        isMapDataFetching : false,
        activeTileIndex: 4,
        fromCurrency: 'USD',
        toCurrency:'INR',
        baseCurrency:'USD',
        graphXData: [],
        graphYData:[],
        mapConfigElementButtons :[
          {id:0, value:'10', subKey:'days', xStepSize:'0.4'},
          {id:1, value:'1',subKey:'months', xStepSize:'0.2'},
          {id:2, value:'3',subKey:'months', xStepSize:'0.5'},
          {id:3, value:'6', subKey:'months', xStepSize:'0.5'},
          {id:4, value:'1', subKey:'years', xStepSize:'1'},
          {id:5, value:'5', subKey:'years', xStepSize:'2'}
        ],
        // startDate: this.findStartDate(this.currentDate, 1, 'years'),
        // endDate: this.findEndDate(this.currentDate),
      }
    }

    componentDidMount(){
      this.fetchRateFromApi(this.findStartDate(1, 'year'));
    }

    /**
     * @description: return start and end date based on the current date
     */
    // findDate = (year, month, date) => {
    //   let eDate = new Date();
    //   var sDate = new Date();
    //   return{
    //       'startDate':`${sDate.getFullYear()-year}-${(sDate.getMonth()+1) - month}-${sDate.getDate() - date}`,
    //       'endDate':`${eDate.getFullYear()}-${eDate.getMonth()+1}-${eDate.getDate()}`}
    // }


     /**
     * @description: return start date based on the current date
     */
    findStartDate = ( value, key) => {
      return moment().subtract(value, key).format('YYYY-MM-DD');
    }
    

    //  /**
    //  * @description: return end date based on the current date
    //  */
    // findEndDate = () =>{
    //   return moment().format('YYYY-MM-DD');
    // }

    /**
     * @description: set start and end date states 
     */
    setStartEndDate = (item) =>{
        this.setState({
          activeTileIndex: item.id, 
         });
        this.fetchRateFromApi(this.findStartDate(item.value, item.subKey));
    }

    /**
     * @description: used to load data from Rest API
     */
    fetchRateFromApi = (startDate) => {
      const currentDate= moment().format('YYYY-MM-DD');
      let baseURI = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${currentDate}&symbols=${this.state.fromCurrency},${this.state.toCurrency}&base=${this.state.baseCurrency}`
      // console.log(`baseURI= ${baseURI}`)
      this.setState({
        isMapDataFetching: true
      })
      fetch(baseURI)
        .then(response => response.json())
        .then(data => { 
          this.LoadData(data) 
          this.setState({
            isMapDataFetching: false
          })
        })
        .catch(error => { console.log(error) 
          this.setState({
            isMapDataFetching: false
          })
        });
    }

    LoadData = (results) => {
      xOutPutArray = []
      let xData = [];
			let yData = [];
			for(let i = 0; i < Object.keys(results.rates).length; i++){
				mainOutPutObject = {}
				dateValue = Object.keys(results.rates)[i]
				ratesObject = results.rates[dateValue]
				mainOutPutObject['x'] = dateValue;
				mainOutPutObject['y'] = parseFloat(ratesObject[this.state.toCurrency].toFixed(3));
				xOutPutArray.push(mainOutPutObject);
			}

			newOutPutArray = xOutPutArray.sort((a, b) =>{
				return new Date(a.x) - new Date(b.x);
			})

			for( let i = 0 ; i < newOutPutArray.length; i++ ){
				xData.push(newOutPutArray[i].x)
				yData.push(newOutPutArray[i].y)
      }
      this.setState({
        graphXData: [...xData],
        graphYData: [...yData],
      })
    }

    returnMapConfigurations = (activeTileIndex) => {
     let mapConfig = {
        line: {
          visible: true,
          strokeWidth: 2,
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
          labelFontSize: 20
        },
        dataPoint: {
          visible: false,
          color: "#777",
          radius: 3,
          label: { visible: false, marginBottom: 25 },
          labelFontSize: 3
        },
        grid: {
          stepSize: 2
        },
        yAxis: {
          labelColor: "#54a0ff",
        },
        xAxis: {
          visible: true
        },
        insetY: 10,
        insetX: 10
      };
      this.state.mapConfigElementButtons.map((item, index) => {
        if(activeTileIndex === item.id ){
            mapConfig.grid.stepSize = item.xStepSize;
        }
        if( activeTileIndex === index && index === 0 ){
          mapConfig.dataPoint.visible = true;
          //mapConfig.xAxis.visible = true;
          //console.log(this.state.graphXData);
        }
      })
      return mapConfig;
    }
  
    getXLabelData = () =>{
      // this method can be remodified with replace and regex techniques
      let xLabelArray = [];
      let dateArray = this.state.graphXData;
      let dataLength = this.state.graphXData.length;
      let summingFactor = dataLength/5;
      for(var i = 0; i < dataLength; i ++){
        if( i == summingFactor){
          xLabelArray.push(dateArray[i]);
          summingFactor += summingFactor;
        }else{
          xLabelArray.push("")
        }
      xLabelArray.push(dateArray[dateArray.length-1])
      console.log(JSON.stringify(xLabelArray))
     
      return xLabelArray;
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
                  this.state.mapConfigElementButtons.map((item, index) => (
                    <TouchableOpacity key={item.id}  onPress={()=>{
                                    this.setStartEndDate(item)
                                      }}>
                      <View style={[styles.mapConfigText,index === this.state.activeTileIndex ? styles.activeTileStyles : styles.tileStyles]}>
                        <Text style={{color:'#fff', fontSize:12, fontWeight:'bold'}}>{item.value}</Text>
                        <Text style={{color:'#fff', fontSize:12, fontWeight:'bold'}}>{item.subKey}</Text>
                      </View>
                    </TouchableOpacity> ))
                }
          </View>
        <ScrollView style={{ height: "100%", flex: 1 , width: '100%'}}>
          <View style={{ margin: 10, height: 200, elevation: 2, backgroundColor: "#fff", shadowColor: "black", shadowOpacity: 0.5}}>
            <Text style={{fontSize:15, alignSelf:'center', fontWeight:'400'}}>{this.state.fromCurrency}/{this.state.toCurrency}</Text>
            <Text style={{fontSize:15, alignSelf:'center', fontWeight:'400'}}>1 USD = xINR</Text>
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            {this.state.isMapDataFetching ? <ActivityIndicator
                          animating={true}
                          style={styles.indicator}
                          size="large"
                        /> 
                        :
                <LineChart style={{ flex: 1 }}  config={this.returnMapConfigurations(this.state.activeTileIndex)} data={this.state.graphYData} />
            }
            </View>
          </View>       
        </ScrollView>
      </View>
    );
  }
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  indicator:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
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
    height:50,
    flexDirection: 'row',
    width: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  mapConfigText:{
    height:50,
    alignSelf:'center',
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
    padding: 4,
    width: (width-20)/6
  },
  tileStyles: {
    backgroundColor: '#29b6f6'
  },
  activeTileStyles: {
    backgroundColor: '#4f83cc'
  }
  
})


            
