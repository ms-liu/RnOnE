/**
 *===========================================
 * Description:BaseLoadComponent
 *  带加载效果和逻辑的组件
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */

'use strict';
import React,{Component} from 'react'
import {
    Platform,
    NativeModules,
    StyleSheet,
    View,
    Animated, ScrollView, Text,
} from 'react-native'
import LogUtils from "../util/LogUtils";
import StyleScheme from '../res/value/StyleScheme'
import BaseComponent from "./BaseComponent";
import Api from "../api/Api";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        paddingTop:StyleScheme.appBarHeight,
        backgroundColor:StyleScheme.textColor2,
    },
});

export default  class BaseLoadComponent extends BaseComponent{
    static Loading = 0;//加载中
    static Error = 1;//加载失败
    static Empty = 2;//暂无数据
    static Success = 3;//加载成功

    constructor(props){
        super(props);
        this.mApi = new Api();
    };

    render(){
        switch (this.viewStatusController()){
            case BaseLoadComponent.Success:
                return this.renderSuccess();
            case BaseLoadComponent.Error:
                return this.renderErrorView();
            case BaseLoadComponent.Empty:
                return this.renderEmptyView();
            case BaseLoadComponent.Loading:
            default:
                return this.renderLoadingView()
        }
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>加载中</Text>
            </View>
        );
    }

    renderErrorView() {
        return(
          <View style={styles.container}>
              <Text>网络异常加载失败</Text>
          </View>
        );
    }

    renderEmptyView() {
        return(
            <View style={styles.container}>
                <Text>暂无数据</Text>
            </View>
        );
    }

    renderSuccess() {

    }

    /**
     * 页面状态控制器
     * @returns {number}
     */
    viewStatusController() {
        return BaseLoadComponent.Loading;
    }
}

