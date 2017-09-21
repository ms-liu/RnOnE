/**
 *===========================================
 * Description:BaseRefreshComponent
 *  下拉刷新，上拉加载 基础页面
 *
 *  @method {@see BaseRefreshComponent.doRefreshData}
 *  下拉数据刷新方法
 *
 *  @method {@see BaseRefreshComponent.doLoadMoreData}
 *  上拉数据加载方法
 *
 *  @method {@see BaseRefreshComponent.ItemSeparatorComponent}
 *  分割线条目分割线
 *
 *
 *  @state viewStatus
 *  显示状态{@see [RefreshFlatList.REFRESHING,RefreshFlatList.LOADING_MORE,RefreshFlatList.NO_MORE,RefreshFlatList.END_REQUEST,]}
 *
 *  @state pageStatus
 *  页面状态{@see [BaseLoadComponent.Loading,BaseLoadComponent.Error,BaseLoadComponent.Empty,BaseLoadComponent.Success]}
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/13
 *
 * Email:ms_liu163@163.com
 *===========================================
 */
'use strict';
import React,{Component} from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';
import BaseLoadComponent from "../../base/BaseLoadComponent";
import RefreshFlatList from "../widget/RefreshFlatList";
import StyleScheme from "../../res/value/StyleScheme";


const styles = StyleSheet.create({
    flatListStyle:{
        // flex:1,
        alignSelf:'flex-start',
        width:'100%',
        flexShrink:0,
    },
});

export default class BaseRefreshComponent extends BaseLoadComponent{
    constructor(props){
        super(props);
        this.bindItemViewModel = this.bindItemViewModel.bind(this);
        this.doRefreshData = this.doRefreshData.bind(this);
        this.doLoadMoreData = this.doLoadMoreData.bind(this);
        this.state ={pageStatus:BaseLoadComponent.Success,toggleLoadMore:false,viewStatus:RefreshFlatList.REFRESHING};
    }
    /**
     * 数据加载方法,重写无效,请使用{@see doRefreshData}
     * @override BaseLoadComponent.loadData
     * @returns {XML}
     */
    loadData(){
        this.doRefreshData()
    }
    /**
     * 页面状态控制器，重写无效
     * @override BaseLoadComponent.viewStatusController
     * @returns {XML}
     */
    viewStatusController(){
        return this.state.pageStatus;
    }

    /**
     * 发生错误时显示View，建议重写
     * @override BaseLoadComponent.renderErrorView
     * @returns {XML}
     */
    renderErrorView(){

    }
    /**
     * 没有数据时显示View,建议重写
     * @override BaseLoadComponent.renderEmptyView
     * @returns {XML}
     */
    renderEmptyView(){

    }

    renderNavigator(){
        return <View/>;
    }

    /**
     * @override BaseLoadComponent.renderSuccess
     * @returns {XML}
     */
     renderSuccess(){
        const {data,viewStatus,toggleLoadMore}= this.state;
        return(
                <RefreshFlatList
                    contentContainerStyle = {styles.flatListStyle}
                    androidRefreshProgressColors={[StyleScheme.colorAccent]}
                    androidProgressBackgroundColor = {StyleScheme.colorPrimary}
                    tipTextColor={StyleScheme.tipTextColor}
                    iOSRefreshProgressColor={StyleScheme.colorAccent}
                    scrollEventThrottle = {1}
                    data={data}
                    bindItemViewModel={(itemData,index)=>this.bindItemViewModel(itemData,index)}
                    toggleRefresh = {this.toggleRefresh()}
                    toggleLoadMore = {this.toggleLoadMore()}
                    doRefreshData={()=>{this.doRefreshData()}}
                    doLoadMoreData={()=>{this.doLoadMoreData()}}
                    viewStatus={viewStatus}
                    ItemSeparatorComponent ={this.itemSeparatorComponent}
                    ListEmptyComponent={this.renderEmptyView}
                />
        );
    }

    /**
     * 控制打开下拉刷新功能
     * @returns {boolean} true 打开
     */
    toggleRefresh(){
         return true
    }

    /**
     * 控制打开上拉加载功能
     * @returns {boolean} true 打开
     */
    toggleLoadMore(){
         return false
    }

    /**
     * 条目分割线，建议重写
     * @returns {XML}
     * @constructor
     */
    itemSeparatorComponent() {
        return(<View />);
    }

    /**
     * 上拉加载更多，数据请求方法
     */
    doLoadMoreData() {

    }

    /**
     * 下拉刷新，数据请求方法
     */
    doRefreshData(){

    }

    /**
     * 绑定每个条目View
     * @param itemData 每个条目对应的数据
     * @param index 条目位置
     * @returns {XML}
     */
    bindItemViewModel(itemData,index) {
        return(<View />);
    }
}





