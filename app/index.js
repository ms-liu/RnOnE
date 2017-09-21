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
    Image,
    TouchableOpacity,
    TouchableHighlight,
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
import AppNavigationBar from "./componet/widget/AppNavigationBar";
import Toast from "./componet/widget/Toast";
import AllPage from "./componet/page/AllPage";
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
    navigatorText:{
        textAlign:'center',
        width:'100%',
        color:StyleScheme.textColor,
        fontSize:StyleScheme.barTextSize
    },
    navigatorButton:{
        position:'absolute',
        top:32,
        right:0,
        margin:5,
        width:45,
        height:45,
    },
    navigatorIcon:{
        tintColor:StyleScheme.tabDefaultColor,
        width:25,
        height:25,
    },

    bottomNavigatorStyle:{
        paddingTop:StyleScheme.appBarHeight+24,
        height:StyleScheme.bottomBarHeight,
        width:'100%',
    },

});

const TAB_BAR_RESOURCES = [
    [CommonUtils.getDailyIcon(), CommonUtils.getActDailyIcon()],
    [require('./res/image/all.png'), require('./res/image/all_act.png')],
];


export default class App extends BaseUIComponent {
    static DAILY_POSITION=0;
    static ALL_POSITION=1;
    title1 = '';

    constructor(props){
        super(props);
        this.state = {title:'',icon:''};
        this.mApi = new Api();
    }
    componentWillMount(){
        super.componentWillMount();
        //todo 位置信息
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let longitude = JSON.stringify(position.coords.longitude);//精度
                let latitude = JSON.stringify(position.coords.latitude);//纬度
                LogUtils.logMsg("============="+longitude+"<<<<>>>>"+latitude);
                this.mApi.getCityNameBy(latitude,longitude)
                    .then(result=>{
                        LogUtils.logMsg('========'+JSON.stringify(result));
                   if (result.results !== null && result.results.length >0){
                       let location = result.results[0];
                       LogUtils.logMsg('========'+JSON.stringify(location));
                       let cityInfo = location[0];
                       LogUtils.logMsg(JSON.stringify(cityInfo));
                       Toast.show(cityInfo.long_name);
                   }
                });
            },
            (error) =>{
                LogUtils.errorMsg(JSON.stringify(error));
            },
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
        );
        this.doChangeTitle(App.DAILY_POSITION);
    }
    renderNavigator(){
        const {
            title,
            icon,
        }= this.state;

        const {navigate} = this.props.navigation;


        return (
            <View style={styles.navigatorStyle}>
                <Text style={styles.navigatorText}>{this.state.title}</Text>
                <TouchableOpacity style={[styles.navigatorButton,]} onPress={()=>{ navigate('CalendarPage');}}>
                    <Image
                        style={styles.navigatorIcon} source={this.state.icon}/>
                </TouchableOpacity>
            </View>
        )
    }

    renderBody(){
        const _this = this;
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                locked={true}
                onChangeTab={(re)=>{
                    this.doChangeTitle(re.i);
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
                <DailyPage
                    changeNavigator ={(title)=>{LogUtils.logMsg(title);_this.title1 = title; _this.doChangeTitle(App.DAILY_POSITION)}}
                />
                <AllPage />
            </ScrollableTabView>
        );
    }

    onIconClick() {
        // Toast.show('查看日历');

        // {title:item.value}


    }

    doChangeTitle(index) {
        const _this = this;
        switch (index){
            case App.ALL_POSITION:
                this.setState({title:TimeUtils.getCurrentDay(' / '),icon:CommonUtils.getDailyIcon()});
                break;
            case App.DAILY_POSITION:
            default:
                this.setState({title:_this.title1,icon:CommonUtils.getDailyIcon()});
                break;
        }
    }
}
