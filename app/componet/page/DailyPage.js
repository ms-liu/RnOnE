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
import RefreshFlatList from "../widget/RefreshFlatList";

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
        flexShrink:0,
    },
});

export default class DailyPage extends BaseLoadComponent{
    constructor(props){
        super(props);
        this.bindItemViewModel = this.bindItemViewModel.bind(this);
        this.doRefreshData = this.doRefreshData.bind(this);
        this.doLoadMoreData = this.doLoadMoreData.bind(this);
        this.state ={pageStatus:DailyPage.Success,viewStatus:RefreshFlatList.REFRESHING};
    }

    loadData(){
        this.mApi.getDate('2017-09').then(result => {
            this.setState({data:result.data,viewStatus:RefreshFlatList.END_REQUEST});
        });
    }

    viewStatusController(){
        return this.state.pageStatus;
    }

    renderSuccess(){
        const {data,viewStatus}= this.state;
        return(
            <RefreshFlatList
                contentContainerStyle = {styles.flatListStyle}
                scrollEventThrottle = {1}
                data={data}
                bindItemViewModel={(itemData,index)=>this.bindItemViewModel(itemData,index)}
                toggleRefresh = {true}
                doRefreshData={()=>{this.doRefreshData()}}
                doLoadMoreData={()=>{this.doLoadMoreData()}}
                viewStatus={viewStatus}
            />
        );
    }

    doLoadMoreData() {
        // this.loadData();

    }

    doRefreshData() {
        // this.loadData();
        this.mApi.getDate('2017-09').then(result => {
            this.setState({data:result.data,pageStatus:DailyPage.Success,viewStatus:RefreshFlatList.END_REQUEST});
        });
    }

    bindItemViewModel(itemData,index) {
           return(
               <View>
                    <Image source={{uri:itemData.cover}}  style={styles.itemImageStyle}/>
               </View>
           );
    }
}





