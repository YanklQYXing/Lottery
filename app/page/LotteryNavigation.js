import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from './Home';
import LotteryPage01 from './lottery/LotteryPage01';
import LotteryPage from './lottery/LotteryPage';
import {Platform} from 'react-native'


const initialPage = 'Home'; // ios的loading页放在App里边
// 状态栏高度
const height = Platform.OS === 'ios' ? 50 : 30;
// 右侧padding值
const paddingR = Platform.OS === 'ios' ? 0 : 45;
// title字体大小
const titleSize = 16;
// title颜色
const titleColor = '#232326';

const LotteryNavigation = StackNavigator({
        Home:{
            screen:Home,
            navigationOptions: {
                title:'抽奖',
                headerBackTitle: null,
                headerBackTitleStyle: {
                    color: 'white',
                },
                headerStyle: {
                    backgroundColor: 'white',
                    height: height,
                    paddingRight: paddingR,
                    elevation:1,
                },
                headerTitleStyle: {
                    fontSize: titleSize,
                    color: titleColor,
                    alignSelf: 'center',
                },
                //按压返回按钮显示的颜色 API > 5.0 有效
                headerPressColorAndroid: 'gray',
                //返回按钮的颜色
                headerTintColor: 'black',
                //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
                gesturesEnabled: true,
            }
        },LotteryPage01:{
            screen:LotteryPage01,
            navigationOptions: {
                title:'简单抽奖',
                headerBackTitle: null,
                headerBackTitleStyle: {
                    color: 'white',
                },
                headerStyle: {
                    backgroundColor: 'white',
                    height: height,
                    paddingRight: paddingR,
                    elevation:1,
                },
                headerTitleStyle: {
                    fontSize: titleSize,
                    color: titleColor,
                    alignSelf: 'center',
                },
                //按压返回按钮显示的颜色 API > 5.0 有效
                headerPressColorAndroid: 'gray',
                //返回按钮的颜色
                headerTintColor: 'black',
                //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
                gesturesEnabled: true,
            }
        },LotteryPage:{
            screen:LotteryPage,
            navigationOptions: {
                title:'正式抽奖',
                header: null,
            }
        },
    },
    {
        initialRouteName: initialPage, // 设置默认到第一页
            headerMode: 'float',
            mode:'card',
    }
)


export default LotteryNavigation;