/**
 * 抽奖页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    BackHandler,
    BackAndroid,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

let _this=undefined;
let navigation = undefined;

const width = Dimensions.get('window').width;
const heightAll = Dimensions.get('window').height;
// 状态栏高度
const height = Platform.OS === 'ios' ? 70 : 50+20;
const lWidth = width/3;
const lHeight = (heightAll-height)/4;
const lotteryName = ['谢谢惠顾','谢谢惠顾','1元抵扣券','100元抵扣券','谢谢惠顾','1元抵扣券','5元抵扣券','谢谢惠顾','1元抵扣券','谢谢惠顾'];
const styles = [
    {backgroundColor:'red',borderColor:'gold',borderWidth:2},
    {backgroundColor:'indianred',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'lightcoral',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'lightsalmon',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'lightpink',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
];

const intervalTime = 30; // 间隔时间

class LotteryPage01 extends Component {

    constructor(props) {
        super(props);
        _this=this;
        this.state = {
            lotteryName:lotteryName,
            name:'抽奖名称',
            currentCheck:-1, // 当前选中的那一个
            endCheck:5, // 最终选中的那个（第几个）
            isUseful:true, // 开奖按钮是否可用
            styles:[],
            choujNum:0, //抽奖次数
            choujState:false, // 抽奖状态
        };
        this.second = 0;
        this.round = 3; // 转的圈数
        // this.allTime = this.round*10*intervalTime + (this.state.endCheck-1)*intervalTime;
        this.allTime = 0;
    }


    // 开始抽奖 设置定时器转圈
    startLottery(){
        if (this.timer) {
            return
        }
        if(this.state.choujState){
            return;
        }
        let c = [0,1,2,3,4,5,6,7,8,9]
        let indexnoc = Math.floor((Math.random()*c.length));
        this.setState({
            choujState:true,
            endCheck:c[indexnoc]+1,
        })
        setTimeout(()=>{
            this.allTime = this.round*10*intervalTime + (this.state.endCheck-1)*intervalTime;
            this.start();
        },100);
    }

    start=()=>{
        this.timer = setInterval(function () {
            this.allTime = this.allTime-intervalTime;
            if(this.second===9){
                this.second = 0;
            }else {
                this.second++;
            }
            let s = [];
            let w = this.second;
            for(let i = 0;i<10;i++){
                if (this.allTime === 0){
                    if(i===w){
                        s.push(styles[0]);
                    }else {
                        s.push({});
                    }
                }else {
                    s.push(styles[w]);
                    if(this.state.endCheck/2===0){
                        if(w===9){
                            w = 0;
                        }else {
                            w++;
                        }
                    }else {
                        if(w===0){
                            w = 9;
                        }else {
                            w--;
                        }
                    }
                }
            }
            this.setState({
                name: this.state.lotteryName[this.second],
                styles:s,
                currentCheck:this.second,
            })
            if (this.allTime === 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.allTime = 0;
                this.second = 0;
                this.setState({
                    choujState:false,
                })
            }
        }.bind(this), intervalTime);
    }

    componentWillMount() {
    }


    componentDidMount() {
    }


    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.timer && clearInterval(this.timer);
    }


    render() {

        // console.log(this.state.endCheck);
        // console.log(this.state.styles);
        let choujiangnum = this.state.choujNum;

        return (
            <View style={[shoppingStyles.container,{padding:0}]}>
                <View style={{flexDirection:'row',flexWrap:'wrap',width:width,flex:1}}>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[0]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===0?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}
                        >{this.state.lotteryName[0]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[1]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===1?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[1]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[2]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===2?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[2]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[9]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===9?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[9]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},
                    {}]}>
                        <Text style={{color:'red',fontSize:17,}}>{this.state.name}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[3]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===3?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[3]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[8]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===8?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[8]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},
                    {}]}>
                        <TouchableOpacity activeOpacity={0.7} style={{width:lWidth,height:lHeight,justifyContent:'center',alignItems:'center'}} onPress={()=>
                        {
                            this.startLottery()
                        }}>
                            <Text style={{color:'#333',fontSize:20,}}>{"开始"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[4]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===4?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[4]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[7]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===7?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[7]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[6]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===6?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[6]}</Text>
                    </View>
                    <View style={[{width:lWidth,height:lHeight,borderWidth:1,borderColor:'#f4f4f4',
                    justifyContent:'center',alignItems:'center'},this.state.styles.length!=0?this.state.styles[5]:
                    {}]}>
                        <Text style={
                            this.state.currentCheck===5?{color:'white',fontSize:15,}:
                            {color:'#333',fontSize:14,}}>{this.state.lotteryName[5]}</Text>
                    </View>
                </View>
            </View>
        )
    }

}


const shoppingStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
});

export default (LotteryPage01)