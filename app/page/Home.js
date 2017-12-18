/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title={'简易抽奖'} onPress={()=>{
                    this.props.navigation.navigate('LotteryPage01');
                }}></Button>
                <Button title={'正式抽奖'} onPress={()=>{
                    this.props.navigation.navigate('LotteryPage');
                }}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

