/**
 *===========================================
 * Description:全部推荐页
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/11
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image
} from 'react-native';
import RefreshFlatList from "../widget/RefreshFlatList";
import StyleScheme from "../../res/value/StyleScheme";
import BaseRefreshComponent from "../widget/BaseRefreshComponent";
import TimeUtils from "../../util/TimeUtils";
import CommonUtils from "../../util/CommonUtils";

const styles = StyleSheet.create({
    itemImageStyle:{
        flex:1,
        width:'100%',
        height:200,
    },
    flatContainerStyle:{
        flex:1,
    },
    flatListStyle:{
        // flex:1,
        alignSelf:'flex-start',
        width:'100%',
        flexShrink:0,
    },
});

export default class AllPage extends BaseRefreshComponent{
    static propety = {
    };
    constructor(props){
        super(props);
    }

    componentWillMount(){
        super.componentWillMount();
    }

    renderEmptyView(){
        return(<Text>暂无数据</Text>)
    }
    itemSeparatorComponent() {
        return(<View style={{height:10,backgroundColor:'white'}}/>);
    }

    doLoadMoreData() {
        this.setState({viewStatus:RefreshFlatList.LOADING_MORE});
        this.mApi.getDate('2018-08').then(result => {
            if (result.data === null || result.data.length === 0){
                this.setState({viewStatus:RefreshFlatList.NO_MORE});
            }else {
                let newData = this.state.data.concat(result.data);
                this.setState({data:newData,viewStatus:RefreshFlatList.END_REQUEST});
            }
        });
    }

    doRefreshData() {
        this.mApi.getDate('2017-09').then(result => {
            this.setState({data:result.data,viewStatus:RefreshFlatList.END_REQUEST});
        });
    }

    bindItemViewModel(itemData,index) {
           return(
               <View>
                    <Image source={{uri:itemData.cover}}  style={styles.itemImageStyle}/>
               </View>
           );
    }
}





