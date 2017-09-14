/**
 *===========================================
 * Description:BaseUIComponent
 *
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
import OrientationIOS from 'react-native-orientation'
import StyleScheme from '../res/value/StyleScheme'
import BaseComponent from "./BaseComponent";
import BottomNavigationBar from '../componet/widget/BottomNavigationBar'
import AppNavigationBar from '../componet/widget/AppNavigationBar'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:StyleScheme.pageBackground,
    },
});

export default  class BaseUIComponent extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {transAnimate:new Animated.Value(55)};
    };


    /**
     * 绑定垂直滚动监听 方便做动画效果
     * @param e
     */
    bindVerticalScrollListener(e){
        //todo 实现 头部滚动动画 效果
    }

    /**
     * 返回头部布局
     * @returns {XML}
     */
    renderNavigator(){
        return(
            <AppNavigationBar
                opacity={0.2}
                height = {this.state.transAnimate}
            />
        );
    }

    /**
     * 获取主体布局
     */
    renderBody(){

    }

    /**
     * 获取底部导航布局
     * @returns {XML}
     */
    renderBottomNavigator(){
        return(
            <BottomNavigationBar />
        );
    }

    /**
     * 底部显示控制器
     * @returns {boolean} false 不显示  true 显示
     */
    toggleBottomNavigator(){
        return false;
    }

    render(){
        super.render();
        return(
            <View style={styles.container}>
                {this.renderBody()}
                {this.renderNavigator()}
                {this.toggleBottomNavigator()?this.renderBottomNavigator():<View/>}
            </View>
        );
    }

}

