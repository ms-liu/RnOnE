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
} from 'react-native';
import App from './app';
import { StackNavigator } from 'react-navigation';
import CalendarPage from "./app/componet/page/CalendarPage";
const TestDemoApp = StackNavigator({
    Home: { screen: App },
    CalendarPage: { screen: CalendarPage},
},{
    initialRouteName: 'Home', // 默认显示界面
    mode:'card',
    headerMode:'none',
    cardStack: {
            gesturesEnabled: true,
    },
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); },  // 回调
});
AppRegistry.registerComponent('RnOnE', () => TestDemoApp);
