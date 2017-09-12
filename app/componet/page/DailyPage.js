/**
 *===========================================
 * Description:首页每天推荐页
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/11
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image
} from 'react-native';
import BaseLoadComponent from "../../base/BaseLoadComponent";
import LogUtils from "../../util/LogUtils";

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

export default class DailyPage extends BaseLoadComponent{
    constructor(props){
        super(props);
        this.state ={viewStatus:DailyPage.Loading};
    }

    loadData(){
        this.mApi.getDate('2017-09').then(result => {
            this.setState({data:result.data,viewStatus:result.status});
        });
    }

    viewStatusController(){
        return this.state.viewStatus;
    }

    renderSuccess(){
        return(
            <FlatList
                contentContainerStyle = {styles.flatListStyle}
                scrollEventThrottle = {1}
                data={this.state.data}
                renderItem={({item})=>
                    <View >
                        <Image source={{uri:item.cover}}  style={styles.itemImageStyle}/>
                    </View>
                }
            />
        );
    }
}





