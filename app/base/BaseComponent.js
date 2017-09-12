/**
 *===========================================
 * Description:BaseComponent
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
import OrientationIOS from 'react-native-orientation'//https://github.com/yamill/react-native-orientation

export default  class BaseComponent extends Component{
    constructor(props){
        super(props);
        const {Orientation: OrientationAndroid} = NativeModules;
        let Orientation;
        if (Platform.OS === 'ios') {
            Orientation = OrientationIOS;
        } else {
            Orientation = OrientationAndroid;
        }
        this.controlOrientation(Orientation);
    };

    /**
     * 屏幕方向控制
     * default:controller.lockToPortrait();
     * @param controller
     *  <p>controller.lockToPortrait();</p>
     *  <p>controller.lockToLandscape();</p>
     *  <p>controller.lockToLandscapeLeft();</p>
     *  <p>controller.lockToLandscapeRight();</p>
     */
    controlOrientation(controller){
        controller.lockToPortrait();
    }

    /**
     * 组件将要被挂载
     * 不可见，不可交互 ，UI未被初始化
     */
    componentWillMount(){
        LogUtils.logMsg("====>componentWillMount");
    }

    /**
     * 展示内容
     * 可见
     */
    render(){
        LogUtils.logMsg("====>render");
    }

    /**
     * 组件挂载完成
     * 可见 可交互
     */
    componentDidMount(){
        LogUtils.logMsg("====>componentDidMount");
        this.loadData();
    }

    /**
     * 接受到Props被修改
     */
    componentWillReceiveProps(){
        LogUtils.logMsg("====>componentWillReceiveProps");
    }

    /**
     * 更新组件显示内容完成
     */
    componentDidUpdate(){
        LogUtils.logMsg("====>componentDidUpdate");
    }

    /**
     * 组件被移除
     * 不可见
     */
    componentWillUnmount(){
        LogUtils.logMsg("====>componentWillUnmount");
    }

    /**
     * 请求网络数据
     */
    loadData() {

    }
}

