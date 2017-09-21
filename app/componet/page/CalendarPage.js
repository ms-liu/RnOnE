/**
 *===========================================
 * Description:CalendarPage 日期选择界面
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/20
 *
 * Email:ms_liu163@163.com
 *===========================================
 */
'use strict';
import React,{Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import BaseComponent from "../../base/BaseComponent";
import BaseRefreshComponent from "../widget/BaseRefreshComponent";
import StyleScheme from "../../res/value/StyleScheme";
import BaseUIComponent from "../../base/BaseUIComponent";
const styles = StyleSheet.create({
    navigatorStyle:{
        width:'100%',
        position:'absolute',
        height:StyleScheme.appBarHeight+24,
        backgroundColor:StyleScheme.colorPrimary,
        paddingTop:24,
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:StyleScheme.lineColor,
        borderBottomWidth:1,
    },
    contentStyle:{
        paddingTop:StyleScheme.appBarHeight+24,
        width:'100%',
        flex:1,
    },
});
export default class CalendarPage extends BaseUIComponent{
    renderNavigator(){
        return (
            <View style={styles.navigatorStyle}>

                <Text style={styles.navigatorText}>{'日期选择'}</Text>
            </View>
        )
    }
    renderBody(){
        return(
            <View style={styles.contentStyle}>
                <CalendarContentPage  />
            </View>
        );
    }
}

class CalendarContentPage extends BaseRefreshComponent{

}




