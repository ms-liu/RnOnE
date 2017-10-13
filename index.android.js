/**
 *===========================================
 * Description:Android启动入口文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */

import React, { Component } from 'react';
import {
  AppRegistry,
    Animated
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import * as Easing from "react-native/Libraries/Animated/src/Easing";
import CardStackStyleInterpolator from "react-navigation/lib-rn/views/CardStackStyleInterpolator";

import App from './app';
import CalendarPage from "./app/componet/page/CalendarPage";
import EssayDetailPage from "./app/componet/page/EssayDetailPage";
import SerialDetailPage from "./app/componet/page/SerialDetailPage";

const AppNavigator = StackNavigator({
    //路由配置 page:{screen:PageComponet}
    HomePage: { screen: App },
    CalendarPage: { screen: CalendarPage},
    EssayDetailPage: { screen: EssayDetailPage},
    SerialDetailPage: { screen: SerialDetailPage},
},{
    initialRouteName: 'HomePage', // 初始界面
    mode:'card',//显示模式card
    headerMode:'none',// enum（float、screen、none）
    cardStack: {
            gesturesEnabled: true,
    },
    transitionConfig:()=>{
       return {
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
            transitionSpec: {
                duration: 250,
                easing: Easing.bounce,
                timing: Animated.timing,
            },
        }
    },
    onTransitionStart: (transitionProps,prevTransitionProps)=>{
        // console.log('=====onTransitionStart====='+JSON.stringify(transitionProps));
        // console.log('=====onTransitionStart====='+JSON.stringify(prevTransitionProps));
    },  // 回调
    onTransitionEnd: ()=>{
        // console.log('=========onTransitionEnd====');
    },  // 回调
});
AppRegistry.registerComponent('RnOnE', () => AppNavigator);
