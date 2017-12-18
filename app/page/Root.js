import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NetInfo,
    Animated,
    Platform,
    StatusBar,
} from 'react-native';
import LotteryNavigation from './LotteryNavigation';



// 配置redux
// @NetInfoDecorator
export default class Root extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        return (
            <View style={styles.container}>
                <LotteryNavigation/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: 'rgb(217, 51, 58)',
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
});
