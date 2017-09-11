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

