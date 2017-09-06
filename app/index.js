/**
 *===========================================
 * Description:App启动入口文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
} from 'react-native';

import LogUtils from './util/LogUtils';
import Api from './api/Api';
import BaseComponent from './base/BaseComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    itemImageStyle:{
        flex:1,
        width:'100%',
        height:200,
    },
});
export default class App extends BaseComponent {
    constructor(props){
        super(props);
        this.api = new Api();
        this.state = {data:''}
    }
    componentDidMount(){
        super.componentDidMount();
        this.api.getDate('2017-09').then(result => {
            LogUtils.logMsg("APP have bean started"+ JSON.stringify(result));
            this.setState({data:result});
        });
    }

    render() {
        super.render();
        LogUtils.logMsg("APP have bean started");
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    RnOnE
                </Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({item})=> <View><Image source={{uri:item.cover}}  style={styles.itemImageStyle}/><Text style={styles.instructions}>{JSON.stringify({item})}</Text></View>}
                />
            </View>
        );
    }

    onBackAndroid(){

    }
}
