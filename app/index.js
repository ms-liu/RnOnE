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
    ScrollView
} from 'react-native';

import LogUtils from './util/LogUtils';
import Api from './api/Api';
import BaseComponent from './base/BaseComponent';

const styles = StyleSheet.create({
    itemImageStyle:{
        flex:1,
        width:'100%',
        height:200,
    },
    flatContainerStyle:{
        flex:1,
    },
    flatListStyle:{
        // flex:1,
        alignSelf:'flex-start',
        width:'100%',
        paddingTop:55,
        flexShrink:0,
    },

});
export default class App extends BaseComponent {
    constructor(props){
        super(props);
        this.api = new Api();
        this.state.data ='';
    }
    /**
     * @inheritDoc
     */
    controlOrientation(controller) {
        controller.lockToPortrait();
    }

    componentDidMount(){
        super.componentDidMount();
        this.api.getDate('2017-09').then(result => {
            // LogUtils.logMsg("APP have bean started"+ JSON.stringify(result));
            this.setState({data:result});
        });
    }

    renderBody() {
        return (
            <FlatList

                contentContainerStyle = {styles.flatListStyle}
                onScroll = {(e)=>{super.bindVerticalScrollListener(e)}}
                scrollEventThrottle = {1}

                data={this.state.data}
                renderItem={({item})=>
                <View>
                    <Image source={{uri:item.cover}}  style={styles.itemImageStyle}/>

                </View>
                }
                />
        );
    }

    onBackAndroid(){

    }
}
//<Text style={styles.instructions}>{JSON.stringify({item})}</Text>
