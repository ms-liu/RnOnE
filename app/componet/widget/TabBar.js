/**
 *===========================================
 * Description:底部菜单栏
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/11
 *===========================================
 */


'use strict';
import React,{Component} from 'react';

import {
    Image,
    Platform,
    StyleSheet, Text,
    TouchableNativeFeedback,
    TouchableOpacity, View

} from 'react-native';

import StyleScheme from "../../res/value/StyleScheme";
import LogUtils from "../../util/LogUtils";
import CommonUtils from "../../util/CommonUtils";
import TouchView from "./TouchView";
import TimeUtils from "../../util/TimeUtils";

export default class TabBar extends Component {

   static property = {
        tabBarResources: React.PropTypes.array.isRequired,
       goToPage: React.PropTypes.func,
       activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array
    };

    constructor(props){
        super(props);
        LogUtils.logMsg(JSON.stringify(props));
    }

    render(){
        return (
            <View style={styles.navBarContainer}>
                {this.renderTabBarItem()}
            </View>
        );

    }

    renderTabBarItem() {
        const {
            tabBarResources,
            activeTab,
            tabs,
            goToPage,
        } = this.props;
        return tabs.map((tab,index)=>{
            return (
                <TouchView key={index} onPress={()=>{
                    // LogUtils.logMsg('=====1=='+TimeUtils.getCurrentTimestamp());
                    goToPage(index);
                    // LogUtils.logMsg('===2===='+TimeUtils.getCurrentTimestamp());

                }}>
                    <View
                        style={styles.itemContainer} >
                        <Image
                            style={[styles.itemImage,
                                activeTab === index?{tintColor:StyleScheme.colorAccent}:{tintColor:StyleScheme.tabDefaultColor}]}
                            source={tabBarResources[index][activeTab === index ? 1 : 0]}/>
                        <Text style={
                            [styles.itemText,
                                activeTab === index?{color:StyleScheme.colorAccent}:{color:StyleScheme.tabDefaultColor}]} >
                            {index===0?'Daily':'All'}
                            </Text>
                    </View>
                </TouchView>
            )

        });
    }
}

const styles = StyleSheet.create({
    navBarContainer:{
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:StyleScheme.lineColor,
        width:"100%",
        height:StyleScheme.bottomBarHeight,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    itemContainer:{
        flex:1,
        flexDirection:'column',
        // height:StyleScheme.bottomBarHeight,
        justifyContent:'center',
        alignItems:'center',
    },
    itemImage:{
        width: StyleScheme.bottomBarHeight/2,
        height: StyleScheme.bottomBarHeight/2,
    },
    itemText:{
        fontSize:14,
        fontWeight:'bold'
    },
});





