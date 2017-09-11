# Day03——【2017-09-06】
### 任务
    1、创建项目Api操作类，实际网络请求API

    2、完成搭建项目UI基本框架搭建

### 创建项目API操作类
```
/**
 *===========================================
 * Description:网络数据获取
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/5
 *===========================================
 */
import HttpManager from "../http/HttpManager";

export default class Api{
    COMMON_PARAMETER = '?channel=baidu&sign=9e78374433ef3ab2468344bf5b9e9f48&version=4.3.2&uuid=ffffffff-ee5e-7402-2332-1dee62cce3ff&platform=android';
    constructor(){
        this.http = new HttpManager();
    }

    getDate = (date)=>{
        return this.http.doGet(true)(`feeds/list/${date}${this.COMMON_PARAMETER}`);
    }
}
```
### 搭建基本UI框架
- 创建BaseComponent
```
/**
 *===========================================
 * Description:BaseComponent
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */
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
import BottomNavigationBar from '../componet/BottomNavigationBar'
import AppNavigationBar from '../componet/AppNavigationBar'
import StyleScheme from '../res/value/StyleScheme'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:StyleScheme.pageBackground,
    },
});

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
        // this.setState({transAnimate:55,})
        this.state = {transAnimate:new Animated.Value(55)};
        // console.log(this.state.transAnimate);
        this.lastTop = 0;
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

    componentWillMount(){
        LogUtils.logMsg("====>componentWillMount");

    }


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
        return(
            <View style={styles.container}>
                {this.renderBody()}
                {this.renderNavigator()}
                {this.toggleBottomNavigator()?this.renderBottomNavigator():<View/>}
            </View>
        );
    }
    componentDidMount(){
        LogUtils.logMsg("====>componentDidMount");
    }

    componentWillReceiveProps(){
        LogUtils.logMsg("====>componentWillReceiveProps");
    }

    componentDidUpdate(){
        LogUtils.logMsg("====>componentDidUpdate");
    }

    componentWillUnmount(){
        LogUtils.logMsg("====>componentWillUnmount");
    }
}
```
- 底部导航
```
/**
 *===========================================
 * Description:BottomNavigationBar
 * 底部导航菜单栏
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */

import React,{Component} from 'react';
import StyleScheme from '../res/value/StyleScheme'
import {
    StyleSheet,
    View,
} from 'react-native';
const styles = StyleSheet.create({
    bottomStyle:{
        backgroundColor:'rgba(255, 0, 0, 0.6)',
        width:StyleScheme.matchParent,
        height:StyleScheme.appBarHeight,
        alignSelf:'flex-end'
    },
});

export default class BottomNavigationBar extends Component {



    render(){
        return(
            <View style={[styles.bottomStyle]} >

            </View>
        );
    }
}
```
- 头部导航菜单栏
```
/**
 *===========================================
 * Description:AppNavigationBar
 * 头部导航菜单栏
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */

import React,{Component,PropTypes} from 'react';
import StyleScheme from '../res/value/StyleScheme'
import {
    StyleSheet,
    View,
    Animated
} from 'react-native';
import LogUtils from "../util/LogUtils";
const styles = StyleSheet.create({
    navigatorStyle:{
        position:'absolute',
        backgroundColor:StyleScheme.colorAccent,
        width:StyleScheme.matchParent,
        height:StyleScheme.appBarHeight,
    },
});
export default class AppNavigationBar extends Component{
    // static propTypes = {
    //     height:PropTypes.value
    // };

    constructor(props){
        super(props);
        console.log('=====state=='+JSON.stringify(this.state));
        console.log('=====props=='+JSON.stringify(props));
    }


    render(){
        LogUtils.logMsg('===height=='+JSON.stringify(this.props.height));
        return(
            <Animated.View style={[styles.navigatorStyle,{height:this.props.height}]}>
            </Animated.View>

        );
    }
}
```