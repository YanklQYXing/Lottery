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
    Animated,
    Alert,
} from 'react-native';
import { NavigationActions,HeaderBackButton } from 'react-navigation';

let _this=undefined;
let navigation = undefined;

const width = Dimensions.get('window').width;
const heightAll = Dimensions.get('window').height;
// 状态栏高度
const height = Platform.OS === 'ios' ? 70 : 50+20;

// view需padding的值
const paddingLeft = 15;

const viewWidth = width-40; // 最外层宽
const lvWidth = (width-40-paddingLeft*2)/3; // 里层view宽
const lWidth = (width-40-paddingLeft*2)/3-2; // 图片宽

const viewHeight = ((width-40)*(805/899));
const lvHeight = ((width-40-paddingLeft*2)*(805/899))/3-2;// 805/899
const lHeight = ((width-40-paddingLeft*2)*(805/899))/3-2-2;// 805/899

// 3. 1元抵扣券  4.100元抵扣券 6.1元抵扣券  7.5元抵扣券 9.1元抵扣券
// const lotteryName = ['奖品0','奖品1','奖品2','奖品3','奖品4','奖品5','奖品6','奖品7','奖品8','奖品9'];
const lotteryName1 = ['谢谢惠顾','谢谢惠顾','1元抵扣券','100元抵扣券','谢谢惠顾','1元抵扣券','5元抵扣券','谢谢惠顾','1元抵扣券','谢谢惠顾'];
const lotteryName = ['10元抵扣券','10元抵扣券','谢谢参与','5元抵扣券','1元抵扣券','谢谢参与','1元抵扣券','5元抵扣券'];
const lotteryIv = [
    require('../../src/money10_02.png'),
    require('../../src/money10_01.png'),
    require('../../src/think02.png'),
    require('../../src/money5_01.png'),
    require('../../src/money1_01.png'),
    require('../../src/thinks01.png'),
    require('../../src/money1_02.png'),
    require('../../src/money5_02.png'),
];
const styles = [
    {backgroundColor:'red',borderColor:'gold',borderWidth:2},
    {backgroundColor:'indianred',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'lightcoral',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'lightsalmon',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
    {backgroundColor:'white',borderColor:'#f4f4f4',borderWidth:1},
];
const lottery_bg = require('../../src/lottery_bg.png')
const lottery_bg02 = require('../../src/lottery_bg02.png')
const lottery_btn = require('../../src/lottery_btn.png')
const lotterying = require('../../src/lotterying.png')
const open01 = require('../../src/open01.png')
const open02 = require('../../src/open02.png')

const intervalTime = 100; // 间隔时间

class LotteryPage extends Component {

    constructor(props) {
        super(props);
        _this=this;
        navigation = props.navigation;
        this.state = {
            lotteryName:lotteryName,
            name:'',
            currentCheck:-1, // 当前选中的那一个
            endCheck:5, // 最终选中的那个（第几个）
            isUseful:true, // 开奖按钮是否可用
            styles:[],
            choujNum:0, //抽奖次数
            choujState:false, // 抽奖状态
            isShow:false, // 是否显示抽奖结果
            isHave:false, // 是否抽中奖
            promptPosition: new Animated.Value(0),
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
        // 测试抽奖
        let c = [0,1,2,3,4,5,6,7,8,9]
        let indexnoc = Math.floor((Math.random()*c.length));
        switch (c[indexnoc]){ // 返回数据从1开始需要减去1才能从0开始
            case 0:
            case 1:
            case 4:
            case 7:
            case 9:
                // 没有奖
                const noL = [2,5];
                let indexnoL = Math.floor((Math.random()*noL.length));
                this.setState({
                    choujState:true,
                    endCheck:noL[indexnoL]+1,
                    isHave:false,
                })
                break;
            case 2:
            case 5:
            case 8:
                // 获取1元
                const l1 = [4,6];
                let indexl1 = Math.floor((Math.random()*l1.length));
                this.setState({
                    choujState:true,
                    endCheck:l1[indexl1]+1,
                    isHave:true,
                })
                break;
            case 6:
                // 5元
                const l5 = [3,7];
                let indexl5 = Math.floor((Math.random()*l5.length));
                this.setState({
                    choujState:true,
                    endCheck:l5[indexl5]+1,
                    isHave:true,
                })
                break;
            case 3:
                // 10元
                const l10 = [0,1];
                let indexl10 = Math.floor((Math.random()*l10.length));
                this.setState({
                    choujState:true,
                    endCheck:l10[indexl10]+1,
                    isHave:true,
                })
                break;
            default:
                this.setState({
                    choujState:true,
                    endCheck:2,
                    isHave:false,
                })
                break;
        }
        // this.setState({
        //      endCheck:data.price>0&&data.price<=10?(data.price):0,
        // })
        setTimeout(()=>{
            console.log('-----c[indexnoc]-----',c[indexnoc])
            console.log('-----选中的那个-----',this.state.endCheck)
            console.log('-----isHave-----',this.state.isHave)
            this.allTime = this.round*lotteryIv.length*intervalTime + (this.state.endCheck-1)*intervalTime;
            this.start();
        },100)
    }

    start=()=>{
        this.timer = setInterval(function () {
            this.allTime = this.allTime-intervalTime;
            if(this.second===lotteryIv.length-1){
                this.second = 0;
            }else {
                this.second++;
            }
            let s = [];
            let w = this.second;
            for(let i = 0;i<lotteryIv.length;i++){
                if (this.allTime === 0){
                    if(i===w){
                        s.push(styles[0]);
                    }else {
                        s.push({});
                    }
                }else {
                    s.push(styles[w]);
                    if(this.state.endCheck/2===0){
                        if(w===lotteryIv.length-1){
                            w = 0;
                        }else {
                            w++;
                        }
                    }else {
                        if(w===0){
                            w = lotteryIv.length-1;
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
                setTimeout(()=>{
                    this.setState({
                        isShow:true,
                        currentCheck:-1,
                    })
                    setTimeout(()=>{
                        Animated.timing(this.state.promptPosition, {
                            toValue: 1,
                            duration: 500
                        }).start(() => {
                        })
                    },100)
                },300)
            }
        }.bind(this), intervalTime);
    }

    componentWillMount() {
    }


    componentDidMount() {
    }


    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }


    render() {

        let choujiangnum = this.state.choujNum;
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, Platform.OS === 'ios' ? 20 : 0]
        });

        return (
            <Image source={lottery_bg} style={{width:width,height:heightAll}}>
                <View style={[shoppingStyles.container,{padding:0,}]}>

                    <View style={[{height:50,justifyContent:'space-between',alignItems:'center',flexDirection:'row',
                    paddingRight:15,},{paddingLeft:0}]}>
                        <HeaderBackButton onPress={()=>{this.props.navigation.goBack()}} tintColor={'white'}/>
                    </View>

                    <Image source={lottery_bg02} style={{width:viewWidth,height:viewHeight,position:'absolute',left:20,right:20,bottom:100,
                    justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'row',flexWrap:'wrap',width:viewWidth-30,height:viewHeight-30,}}>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[0]} style={{width:lWidth,height:lHeight,}}>

                                </Image>
                                {
                                    this.state.currentCheck === 0?
                                        <Image source={lotterying} style={{width:lWidth,height:lHeight,position:'absolute',left:1,top:1}}/>
                                        :null
                                }
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[1]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 1?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[2]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 2?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[7]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 7?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                    justifyContent:'center',alignItems:'center'},
                    {}]}>
                                <Image source={lottery_btn} style={{width:lWidth,height:lHeight,}}>
                                    <TouchableOpacity activeOpacity={0.7} style={{width:lWidth,height:lHeight,justifyContent:'center',alignItems:'center'}} onPress={()=>
                                    {
                                        this.startLottery()
                                    }}>
                                        <Text style={{color:'white',fontSize:18,backgroundColor:'transparent'}}>{"立即抽奖"}</Text>
                                    </TouchableOpacity>
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[3]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 3?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[6]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 6?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[5]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 5?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                            <View style={[{width:lvWidth,height:lvHeight,padding:1,
                                justifyContent:'center',alignItems:'center'},]}>
                                <Image source={lotteryIv[4]} style={{width:lWidth,height:lHeight,}}>
                                    {
                                        this.state.currentCheck === 4?
                                            <Image source={lotterying} style={{width:lWidth,height:lHeight,}}/>
                                            :null
                                    }
                                </Image>
                            </View>
                        </View>
                    </Image>
                </View>
                {
                    this.state.isShow?
                        <TouchableOpacity
                            onPress={()=>{
                                    this.setState({
                                        isShow:false,
                                    })
                                     setTimeout(() => {
                                         Animated.timing(this.state.promptPosition, {
                                             toValue: 0,
                                             duration: 0
                                         }).start()
                                     }, 200);
                                }
                            }
                            activeOpacity={1}
                            style={{position:'absolute',width:width,height:heightAll,backgroundColor:'rgba(50,50,50,0.5)',justifyContent:'center',alignItems:'center'}}>
                            <Animated.View style={[{width:(width-120),height:((width-120)/682)*795,justifyContent:'center',alignItems:'center'},{top: positionY,opacity: this.state.promptPosition}]}>
                                <Image source={this.state.isHave&&this.state.name!='谢谢参与'?open01:open02} style={{width:(width-120),height:((width-120)/682)*795,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity
                                        onPress={()=>{

                                        }
                                    }
                                        style={{width:(width-120),flex:1,}}
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({
                                                isShow:false,
                                            })
                                            setTimeout(() => {
                                                 Animated.timing(this.state.promptPosition, {
                                                     toValue: 0,
                                                     duration: 0
                                                 }).start()
                                             }, 200);
                                        }
                                    }
                                        style={{width:(width-120),height:50,}}
                                    ></TouchableOpacity>
                                    {
                                        this.state.isHave&&this.state.name!='谢谢参与'?
                                            <Text style={{color:'white',fontSize:20,position:'absolute',top:(((width-120)/682)*795)/3,}}>抽中{this.state.name}</Text>
                                            :null
                                    }
                                    {
                                        this.state.isHave&&this.state.name!='谢谢参与'?
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    Alert.alert('抽奖结果',this.state.name)
                                                    this.setState({
                                                        isShow:false,
                                                    })
                                                    setTimeout(() => {
                                                         Animated.timing(this.state.promptPosition, {
                                                             toValue: 0,
                                                             duration: 0
                                                         }).start()
                                                     }, 200);
                                                }
                                            }
                                                style={{width:(width-120),height:50,position:'absolute',top:(((width-120)/682)*795)/2,}}
                                            ></TouchableOpacity>
                                            :null
                                    }
                                </Image>
                            </Animated.View>
                        </TouchableOpacity>
                        :null
                }
            </Image>
        )
    }

}


const shoppingStyles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    }
});

export default (LotteryPage)