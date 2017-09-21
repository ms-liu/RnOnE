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
import {Platform,FlatList,View} from "react-native";
import LogUtils from "../../util/LogUtils";
import {Text,} from "react-native";
import {RefreshControl} from "react-native";
import Toast from "../widget/Toast";
import  RefreshLayoutConsts from "react-native/Libraries/Components/RefreshControl/RefreshControl";
import StringValue from "../../res/value/StringValue";
import CommonUtils from "../../util/CommonUtils";
import StyleScheme from "../../res/value/StyleScheme";


export default class RefreshFlatList extends Component {
    static REFRESHING = 1;//正在刷新
    static LOADING_MORE = 2;//正在加载
    static NO_MORE = 3;//没有更多数据
    static END_REQUEST = 4;//结束请求
    static EMPTY_DATA = 5;//结束请求

    static property = {
        doRefreshData:React.PropTypes.func,
        doLoadMoreData:React.PropTypes.func,

        androidRefreshProgressColors:React.PropTypes.array,
        androidProgressBackgroundColor:React.PropTypes.string,
        iOSRefreshProgressColor:React.PropTypes.string,

        contentContainerStyle:React.PropTypes.StyleSheet,
        refreshingTipMsg:React.PropTypes.string,
        loadingTipMsg:React.PropTypes.string,
        tipTextColor:React.PropTypes.string,
        noMoreDataTipMsg:React.PropTypes.string,

        viewStatus:React.PropTypes.number,

        toggleRefresh:React.PropTypes.bool,
        toggleLoadMore:React.PropTypes.bool,

        onEndReachedThreshold:React.PropTypes.number,
        ItemSeparatorComponent:React.PropTypes.func,
        NoMoreComponent:React.PropTypes.func,
        RefreshingComponent:React.PropTypes.func,
        LoadingMoreComponent:React.PropTypes.func,
        ListEmptyComponent:React.PropTypes.func,
    };

    constructor(props){
        super(props);
        this.onEndReached = this.onEndReached.bind(this)
        this.defaultListEmptyComponent = this.defaultListEmptyComponent.bind(this)
        this.defaultItemSeparatorComponent = this.defaultItemSeparatorComponent.bind(this)
    }

    _keyExtractor = (item, index) =>index;

    listFooterComponent(){

        const {
            viewStatus,
            LoadingMoreComponent,
            NoMoreComponent,
            RefreshingComponent,
            toggleLoadMore
        } = this.props;
        // if (!toggleLoadMore){
        //     return (<View/>);
        // }
        switch (viewStatus){
            case RefreshFlatList.REFRESHING:
                return (<View/>);
            case RefreshFlatList.NO_MORE:
                return(
                    <Text>
                        {StringValue.noMore[CommonUtils.randomNum(0,StringValue.noMore.length -1)]}
                    </Text>
                );
            case RefreshFlatList.END_REQUEST:
                return <View/>;
                break;
            case RefreshFlatList.LOADING_MORE:
                return(
                    <Text>
                        正在努力加载中...
                    </Text>
                );
            default:
                LogUtils.errorMsg('viewStatus is invalid,Current ViewStatus'+viewStatus);
                break;
        }
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
            iOSRefreshProgressColor,
            tipTextColor,
            androidProgressBackgroundColor,
            androidRefreshProgressColors,
        }=this.props;
        return(
            <RefreshControl
                refreshing={viewStatus === RefreshFlatList.REFRESHING}
                onRefresh={()=>this.doRefreshData()}
                //android config
                enabled = {toggleRefresh}
                colors={androidRefreshProgressColors}
                size={RefreshLayoutConsts.SIZE.DEFAULT}
                progressBackgroundColor={androidProgressBackgroundColor}

                //iOS config
                title={refreshingTipMsg}
                titleColor={tipTextColor}
                tintColor={iOSRefreshProgressColor}

            />
        );
    }

    onEndReached(){
        this.doLoadMoreData();
    }
    _separator(){
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    };

    render() {
        const{
            data,
            bindItemViewModel,
            contentContainerStyle,
        } = this.props;

        return (
            <FlatList
                data={data}
                contentContainerStyle = {contentContainerStyle}
                refreshControl={this.bindRefreshControl()}
                keyExtractor={this._keyExtractor}
                renderItem={({item,index})=>{return bindItemViewModel(item,index)}}
                onEndReachedThreshold = {0.5}
                onEndReached = {()=>this.onEndReached()}
                ListFooterComponent={this.listFooterComponent()}
                ItemSeparatorComponent={this.defaultItemSeparatorComponent}
                ListEmptyComponent = {this.defaultListEmptyComponent}
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
                // Toast.show(StringValue.loadingConflictTip[CommonUtils.randomNum(0,3)]);
                // break;
            case RefreshFlatList.LOADING_MORE:
                Toast.show(StringValue.loadingConflictTip[CommonUtils.randomNum(0,(StringValue.loadingConflictTip-1))]);
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
            toggleLoadMore,
        } = this.props;
        if (!toggleLoadMore)
            return;
        switch (viewStatus){

            case RefreshFlatList.END_REQUEST:
                doLoadMoreData();
                break;
            case RefreshFlatList.REFRESHING:
            case RefreshFlatList.LOADING_MORE:
                Toast.show(StringValue.loadingConflictTip[CommonUtils.randomNum(0,(StringValue.loadingConflictTip.length -1))]);
                break;
            case RefreshFlatList.NO_MORE:
                LogUtils.logMsg('current no_more');
                break;
            default:
                LogUtils.errorMsg('viewStatus is invalid,Current ViewStatus'+viewStatus);
                break;
        }
    }

    defaultItemSeparatorComponent() {
        const {
            ItemSeparatorComponent,
        } = this.props;
        if (CommonUtils.checkFunction(ItemSeparatorComponent)){
            return ItemSeparatorComponent();
        }else {
            return(<View style={{height:2,backgroundColor:'red'}}/>);
        }
    }

    defaultListEmptyComponent() {
        const {
            viewStatus,
            ListEmptyComponent,
        } = this.props;
        let emptyView;
        if ( CommonUtils.checkFunction(ListEmptyComponent)){
            emptyView =  ListEmptyComponent();
        }else {
            emptyView = <Text>{StringValue.empty[CommonUtils.randomNum(0,(StringValue.empty.length -1))]}</Text>;
        }

        if (viewStatus === RefreshFlatList.END_REQUEST && viewStatus === RefreshFlatList.EMPTY_DATA){
            return emptyView;
        }else {
            return <View/>
        }
    }
}

