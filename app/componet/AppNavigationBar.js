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