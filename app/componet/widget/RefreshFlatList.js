/**
 *===========================================
 * Description:RefreshFlat
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/12
 *
 * Email:ms_liu163@163.com
 *===========================================
 */
import React,{Component} from 'react';
import {}from 'react-native';
import {FlatList,View} from "react-native";
import LogUtils from "../../util/LogUtils";
import {Text,} from "react-native";
import {RefreshControl} from "react-native";
import StyleScheme from "../../res/value/StyleScheme";
import  RefreshLayoutConsts from "react-native/Libraries/Components/RefreshControl/RefreshControl";

export default class RefreshFlatList extends Component {
    static REFRESHING = 1;
    static LOADING_MORE = 2;
    static NO_MORE = 3;
    static END_REQUEST = 4;

    static property = {
        doRefreshData:React.PropTypes.func,
        doLoadMoreData:React.PropTypes.func,
        contentContainerStyle:React.PropTypes.StyleSheet,
        refreshingTipMsg:React.PropTypes.string,
        loadingTipMsg:React.PropTypes.string,
        noMoreDataTipMsg:React.PropTypes.string,
        viewStatus:React.PropTypes.number,
        toggleRefresh:React.PropTypes.bool,
        toggleLoadMore:React.PropTypes.bool,
    };

    constructor(props){
        super(props);
        this.onEndReached = this.onEndReached.bind(this)
    }

    _keyExtractor = (item, index) =>index;

    listFooterComponent(){
        return(
          <Text>
              加载更多
          </Text>
        );
    };

    listHeaderComponent(){
        return(
          <Text>
              下拉刷新
          </Text>
        );
    };

    bindRefreshControl(){
        const{
            toggleRefresh,
            refreshingTipMsg,
            viewStatus,
        }=this.props;
        return(
            <RefreshControl
                refreshing={viewStatus === RefreshFlatList.REFRESHING}
                onRefresh={()=>this.doRefreshData()}
                //android config
                enabled = {toggleRefresh}
                colors={[StyleScheme.colorAccent]}
                size={RefreshLayoutConsts.SIZE.DEFAULT}
                progressBackgroundColor={StyleScheme.colorPrimary}

                //iOS config
                title={refreshingTipMsg}
                titleColor={StyleScheme.tipTextColor}
                tintColor={StyleScheme.colorAccent}
            />
        );
    }

    onEndReached(){
        LogUtils.logMsg('========onEndReached=')
    }

    render() {
        const{
            data,
            bindItemViewModel,
            contentContainerStyle
        } = this.props;

        return (
            <FlatList
                data={data}
                contentContainerStyle = {contentContainerStyle}
                refreshControl={this.bindRefreshControl()}
                keyExtractor={this._keyExtractor}
                renderItem={({item,index})=>{return bindItemViewModel(item,index)}}
                onEndReached = {this.onEndReached}
                onEndReachedThreshold = {0.5}
            />
        );
    }

    /**
     * 第一次网络请求 or 进行刷新数据操作
     */
    doRefreshData() {
        const {
            doRefreshData,
            viewStatus,
        } = this.props;
        switch (viewStatus){
            case RefreshFlatList.REFRESHING:
                // todo add plugin , show Toast
                LogUtils.logMsg('current refreshing');
                break;
            case RefreshFlatList.LOADING_MORE:

                break;
            case RefreshFlatList.NO_MORE:
            case RefreshFlatList.END_REQUEST:
                doRefreshData();
                break;
            default:
                LogUtils.errorMsg('viewStatus is invalid,Current ViewStatus'+viewStatus);
                break;
        }
    }

    /**
     * 进行数据加载操作
     */
    doLoadMoreData(){
        const {
            doLoadMoreData,
            viewStatus,
        } = this.props;
        switch (viewStatus){
            case RefreshFlatList.REFRESHING:
            case RefreshFlatList.END_REQUEST:
                doLoadMoreData();
                break;
            case RefreshFlatList.LOADING_MORE:
                // todo add plugin , show Toast
                LogUtils.logMsg('current loading_more');
                break;
            case RefreshFlatList.NO_MORE:
                // todo add plugin , show Toast
                LogUtils.logMsg('current no_more');
                break;
        }
    }
}

// ListFooterComponent={this.listFooterComponent()}
// ListHeaderComponent = {this.listHeaderComponent()}