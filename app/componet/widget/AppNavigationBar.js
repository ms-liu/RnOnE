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
import StyleScheme from '../../res/value/StyleScheme'
import {
    StyleSheet,
    View,
    Animated
} from 'react-native';
import LogUtils from "../../util/LogUtils";
const styles = StyleSheet.create({
    navigatorStyle:{
        position:'absolute',
        backgroundColor:StyleScheme.colorPrimary,
        width:StyleScheme.matchParent,
        height:StyleScheme.appBarHeight,
    },
});
export default class AppNavigationBar extends Component{
    static property ={
        height:React.PropTypes.number
    };

    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={[styles.navigatorStyle]}>
            </View>

        );
    }
}