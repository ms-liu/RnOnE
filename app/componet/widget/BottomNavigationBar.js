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
import StyleScheme from '../../res/value/StyleScheme';
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