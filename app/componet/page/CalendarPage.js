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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseComponent from "../../base/BaseComponent";
import BaseRefreshComponent from "../widget/BaseRefreshComponent";
import StyleScheme from "../../res/value/StyleScheme";
import BaseUIComponent from "../../base/BaseUIComponent";
import TouchView from "../widget/TouchView";
import LogUtils from "../../util/LogUtils";
import RefreshFlatList from "../widget/RefreshFlatList";
import CommonUtils from "../../util/CommonUtils";
import TimeUtils from "../../util/TimeUtils";
import BaseLoadComponent from "../../base/BaseLoadComponent";
import Toast from "../widget/Toast";

const styles = StyleSheet.create({
    navigatorStyle:{
        width:'100%',
        position:'absolute',
        height:StyleScheme.appBarHeight+24,
        backgroundColor:StyleScheme.colorPrimary,
        paddingLeft:StyleScheme.commonPadding,
        paddingRight:StyleScheme.commonPadding+25,
        paddingTop:24,
        alignItems:'center',
        borderBottomColor:StyleScheme.lineColor,
        borderBottomWidth:1,
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    navigatorIcon:{
        tintColor:StyleScheme.tabDefaultColor,
        width:25,
        height:25,
    },
    contentStyle:{
        paddingTop:StyleScheme.appBarHeight+24,
        width:'100%',
        flex:1,
    },
    navigatorText:{
        flexGrow:2,
        textAlign:'center',
        width:'80%',
        color:StyleScheme.textColor,
        fontSize:StyleScheme.barTextSize
    },

    lineWrapperStyle: {
        width: '100%',
        paddingLeft:12,
        flex:1,
        flexDirection:'row',
    },
    itemView:{
        width:'50%',
        flexGrow:0,
        flexShrink:1,
        marginRight:12,
        marginTop:12,
        justifyContent:'center',
        borderRadius:4,
        borderWidth:0.5,
        borderColor:StyleScheme.lineColor,
    },
    itemCover:{
        width:'100%',
        height:120,
        borderTopLeftRadius:4,
        borderTopRightRadius:4
    },
    itemText:{
        width:'100%',
        padding:StyleScheme.commonPadding,
        alignContent:'center',
        textAlign:'center',
        fontSize:StyleScheme.commonTextSize,
        color:StyleScheme.tipTextColor
    }
});
export default class CalendarPage extends BaseUIComponent{
    renderNavigatorTitle(){
        const params = this.getNavigationParams();
        return CommonUtils.replaceSeparate(params.date);
    }
    renderBody(){
        const params = this.getNavigationParams();
        return(
            <View style={styles.contentStyle}>
                <CalendarContentPage
                    date = {params.date}
                    navigatorCallback={(result)=>{
                        params.navigatorCallback(result);
                        this.goBack();
                    }}
                />
            </View>
        );
    }
}

class CalendarContentPage extends BaseRefreshComponent {
    constructor(props){
        super(props);
        this.doLoadData = this.doLoadData.bind(this);
    }

    toggleLoadMore(){
        return true;
    }

    toggleRefresh(){
        return false;
    }

    doRefreshData() {
        this.doLoadData();
    }

    doLoadMoreData(){
        this.doLoadData(false);
    }
    month = TimeUtils.getCurrentMonth();
    doLoadData(refresh = true){
        let tempMonth = this.month;
        let {data} = this.state;
        this.setState({viewStatus:refresh?RefreshFlatList.REFRESHING:RefreshFlatList.LOADING_MORE});
        let expectMonth = refresh ?this.month:this.month-1;
        const date = TimeUtils.getDateOfMonth(TimeUtils.getYearOfMoth(expectMonth));
        this.mApi.getDatesOfMonth(date).then(result=>{
            if(result.status === BaseLoadComponent.Success){
                let dataList = result.data;
                if (!dataList[0].month){
                    dataList.splice(0,0,{month:TimeUtils.getYearOfMoth(expectMonth),index:0});
                    dataList.splice(1,0,{month:TimeUtils.getYearOfMoth(expectMonth),index:1});
                }
                if(dataList.length%2 !== 0){
                    dataList.push({date:'',cover:''})
                }
                data = refresh ? dataList : data.concat(dataList);
                this.setState({data:data,endIndex:data.length -1,viewStatus:RefreshFlatList.END_REQUEST});
                this.month = expectMonth;
            }else if (result.status === BaseLoadComponent.Empty){
                this.setState({data:data,viewStatus:refresh?RefreshFlatList.EMPTY_DATA:RefreshFlatList.NO_MORE});
                this.month = tempMonth;
            }else {
                Toast.show(CommonUtils.getNetErrorTip());
                this.month = tempMonth;
            }
        });
    }
    getNumColumns(){return 2;}
    getColumnWrapperStyle() {return styles.lineWrapperStyle;}
    bindItemViewModel(itemData,index) {
        const {date,navigatorCallback,} = this.props;

        const {endIndex,} = this.state;

        let marginBottom = 0;
        // if (endIndex && (index === endIndex || index === endIndex -1)){
        //     marginBottom = 100;
        // }
        if (itemData.month){
            if (itemData.index === 0 ){
                return(
                    <View style={[{
                        width :'100%',
                        paddingRight:12,
                        paddingVertical:StyleScheme.commonPadding>>1,
                        flex:1,
                        justifyContent:'space-between',
                        flexDirection:'row',
                        alignItems:'center'
                    }]}>
                        <View style={[{ flexGrow:2,backgroundColor:StyleScheme.lineColor,height:1,}]}/>
                            <Text style={[{
                                paddingHorizontal:StyleScheme.commonPadding<<1,
                                fontSize:StyleScheme.commonTextSize,
                                color:StyleScheme.tipTextColor
                            }]}>{`${itemData.month}月`}</Text>
                        <View style={[{flexGrow:2,backgroundColor:StyleScheme.lineColor,height:1,}]}/>
                    </View>
                );
            }else {
                return(
                    <View />
                )
            }
        }else {
            return (
                <TouchView onPress={()=>navigatorCallback({date:itemData.date})}>
                    <View style={[styles.itemView,{marginBottom:marginBottom, backgroundColor:itemData.cover?'white':'transparent', borderColor:itemData.date === date?StyleScheme.textColor:StyleScheme.lineColor}]}>
                        {itemData.cover?<Image style={styles.itemCover} source={{uri:itemData.cover}}/> : <View style={styles.itemCover}/>}
                        <Text style={styles.itemText}>{itemData.date?CommonUtils.replaceSeparate(itemData.date):''}</Text>
                    </View>
                </TouchView>
            )
        }
    };
}








