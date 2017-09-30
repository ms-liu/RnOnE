/**
 *===========================================
 * Description:App启动入口文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */

import React  from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
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
import Toast from "./componet/widget/Toast";
import AllPage from "./componet/page/AllPage";
import TouchView from "./componet/widget/TouchView";
const styles = StyleSheet.create({

    navigatorStyle:{
        width:'100%',
        flex:1,
        position:'absolute',
        paddingLeft:StyleScheme.commonPadding+25,
        paddingRight:StyleScheme.commonPadding,
        height:StyleScheme.appBarHeight,
        backgroundColor:StyleScheme.colorPrimary,
        alignItems:'center',
        borderBottomColor:StyleScheme.lineColor,
        borderBottomWidth:1,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    navigatorText:{
        flexGrow:2,
        textAlign:'center',
        width:'80%',
        color:StyleScheme.textColor,
        fontSize:StyleScheme.barTextSize
    },
    navigatorIcon:{
        flexShrink:1,
        tintColor:StyleScheme.tabDefaultColor,
        width:25,
        height:25,
    },

    bottomNavigatorStyle:{
        paddingTop:StyleScheme.appBarHeight,
        height:StyleScheme.bottomBarHeight,
        width:'100%',
    },

});

const TAB_BAR_RESOURCES = [
    [CommonUtils.getDailyIcon(), CommonUtils.getActDailyIcon()],
    [require('./res/image/all.png'), require('./res/image/all_act.png')],
];

let lastClickTime = 0;
export default class App extends BaseUIComponent {
    static DAILY_POSITION=0;
    static ALL_POSITION=1;
    static PAGE_STATE_VALUE ={
        date:TimeUtils.getCurrentDay(),
        cityName:'上海',
        title:'NewP',
    };
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
                LogUtils.logMsg(JSON.stringify(error));
            },
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
        );
        this.doChangeTitle(App.DAILY_POSITION);
    }

    onHeaderIconClick() {
        switch (this.currentIndex){
            case App.DAILY_POSITION:
                this.navigateNewPage('CalendarPage',{date:App.PAGE_STATE_VALUE.date});
                break;
            case App.ALL_POSITION:
            default:
                Toast.show('搜搜');
                break;
        }
    }

    renderNavigator(){
        const {
            title,
            icon,
        }= this.state;
        return (
            <View style={styles.navigatorStyle}>
                <Text style={styles.navigatorText}>{title}</Text>
                <TouchView onPress={()=>{this.onHeaderIconClick()}}>
                    <Image
                        style={styles.navigatorIcon} source={icon}/>
                </TouchView>
            </View>
        )
    }

    renderBody(){
        const _this = this;
        const {date,cityName,refresh} =this.state;
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                locked={true}
                onChangeTab={(re)=>{this.doChangeTitle(re.i);}}
                scrollWithoutAnimation={false}
                prerenderingSiblingsNumber={2}
                initialPage={0}
                renderTabBar={()=>{
                    return <TabBar  tabBarResources={TAB_BAR_RESOURCES}/>
                }}
                style={styles.bottomNavigatorStyle}
            >
                <DailyPage
                    date = {date}
                    cityName = {cityName}
                    refresh = {refresh}
                    onItemClick = {(item)=>{this.handleItemClick(item);}}
                    onMenuItemClick = {(item)=>{this.handleItemClick(item,true)}}
                    changeNavigator ={(title)=>{
                        App.PAGE_STATE_VALUE.title = title;
                        _this.doChangeTitle(App.DAILY_POSITION)}
                    }
                />
                <AllPage

                />
            </ScrollableTabView>
        );
    }

    doChangeTitle(index) {
        this.currentIndex = index;
        switch (index){
            case App.ALL_POSITION:
                this.setState({title:'NewP',icon:require('./res/image/search_night.png')});
                break;
            case App.DAILY_POSITION:
            default:
                this.setDailyPageState();
                break;
        }
    }

    onBackAndroid(){
        let now = new Date().getTime();
        if ((now - lastClickTime) < 3000) {//2.5秒内点击后退键两次推出应用程序
            return false;
        }
        lastClickTime = now;
        Toast.show('再按一次退出');
        return true;
    }

    navigatorCallback(result){
        App.PAGE_STATE_VALUE.date = result.date;
        this.setDailyPageState(true);
    }

    setDailyPageState(refresh=false){
        this.setState({
            title:App.PAGE_STATE_VALUE.title,
            date:App.PAGE_STATE_VALUE.date,
            cityName:App.PAGE_STATE_VALUE.cityName,
            refresh:refresh,
            icon:CommonUtils.getDailyIcon(App.PAGE_STATE_VALUE.date)
        });
    }

    handleItemClick(item,isMenu) {
        let title = '';
        switch (!isMenu?item.category:item.content_type){
            case '0'://图文
                title = '图文';
                break;
            case '4'://音乐
                title = '音乐';
                break;
            case '5'://影视
                title = '影视';
                break;
            case '8'://电台
                title = '电台';
                break;
            case '6'://广告
                title = '广告';
                break;
            case '1'://阅读
                title = '阅读';
                break;
            case '2'://连载
                title = '连载';
                break;
            case '3'://问答
                title = '问答';
                break;
            default:
                title = 'NewP';
                break;
        }
        title = !isMenu?(item.tag_list.length>0?item.tag_list[0].title:title):(item.tag?item.tag.title:title);
        let contentId = !isMenu?item.item_id:item.content_id;
        let bgColor = !isMenu?item.content_bgcolor:'';
        this.navigateNewPage('DetailPage',{title:title,contentId:contentId,bgColor:bgColor});
    }
}
