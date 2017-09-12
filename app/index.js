/**
 *===========================================
 * Description:App启动入口文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ScrollView
} from 'react-native';

import LogUtils from './util/LogUtils';
import Api from './api/Api';
import BaseUIComponent from './base/BaseUIComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "./componet/widget/TabBar";
import StyleScheme from "./res/value/StyleScheme";
import TimeUtils from "./util/TimeUtils";
import CommonUtils from "./util/CommonUtils";
import DailyPage from "./componet/page/DailyPage";
const styles = StyleSheet.create({

    bottomNavigatorStyle:{
        height:StyleScheme.bottomBarHeight,
        width:'100%',
        paddingTop:StyleScheme.appBarHeight,
    }
});

const TAB_BAR_RESOURCES = [
    [CommonUtils.getDailyIcon(), CommonUtils.getActDailyIcon()],
    [require('./res/image/all.png'), require('./res/image/all_act.png')],
];


export default class App extends BaseUIComponent {
    constructor(props){
        super(props);
        this.api = new Api();
        this.state.data ='';
    }
    /**
     * @inheritDoc
     */
    controlOrientation(controller) {
        controller.lockToPortrait();
    }

    renderBody(){
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                locked={true}
                onChangeTab={(re)=>{

                    LogUtils.logMsg('=====currentPage>>>>'+re.i);
                    LogUtils.logMsg('=====>>>>'+re.ref);
                    LogUtils.logMsg('=====lastPage>>>>'+re.from);
                }}
                scrollWithoutAnimation={false}
                prerenderingSiblingsNumber={2}
                initialPage={0}
                renderTabBar={()=>{
                    return <TabBar tabBarResources={TAB_BAR_RESOURCES}/>
                }}
                style={styles.bottomNavigatorStyle}
            >
                <DailyPage />
                <View/>
            </ScrollableTabView>
        );

    }


    onBackAndroid(){

    }
}
//<Text style={styles.instructions}>{JSON.stringify({item})}</Text>
