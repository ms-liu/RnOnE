/**
 *===========================================
 * Description:DetailPage 详情页面
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/27
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';
import React,{PureComponent} from 'react';
import BaseUIComponent from "../../base/BaseUIComponent";
import BaseLoadComponent from "../../base/BaseLoadComponent";
import LogUtils from "../../util/LogUtils";
import {StyleSheet, Text, View, WebView,ScrollView,StatusBar} from "react-native";
import StyleScheme from "../../res/value/StyleScheme";
import CommonUtils from "../../util/CommonUtils";
import ConvenientWebView from "../widget/ConvenientWebView";
const styles = StyleSheet.create({
    body:{
        height:StyleScheme.bottomBarHeight,
        width:'100%',
        flex:1,
    },
});
export default class EssayDetailPage extends BaseUIComponent{
    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    renderNavigatorTitle(){
        const {title} = this.getNavigationParams();
        return title;
    }
    renderBody(){
        const {contentId} = this.getNavigationParams();
        return (
            <View style={styles.body}>
                <DetailContent
                    contentId = {contentId}
                    onScrollCallback = {(result)=>this.handleScroll(result)}
                />
                <View
                    style={{position:'absolute',bottom:0,width:'100%',height:StyleScheme.appBarHeight,backgroundColor:'#0005'}}
                />
             </View>
        )
    }
    lastTop=0;
    top = 0;
    handleScroll(result){
        this.top =result;
        if (this.lastTop <= this.top){//手势上滑->页面内容下滑
            this.mNavigationBar.hide();
        }else {//手势下滑->页面内容上滑
            this.mNavigationBar.show();
        }
        this.lastTop = this.top;
    }
}

class DetailContent extends BaseLoadComponent{
    static property={
        onScrollCallback:React.PropTypes.func,
    };
    constructor(props){
        super(props);
        this.state ={pageStatus:BaseLoadComponent.Loading};
    }

    viewStatusController(){
        return this.state.pageStatus;
    }

    loadData(){
        const{
            contentId,
        } = this.props;
        this.mApi.getDetailData(contentId).then(result=>{
            this.setState({data:result.data,pageStatus:result.status});
        })
    }
    pattern = /<div class="one-authors-box">[\s\S]*<div style="height:50px; ">/;
    pattern1 = /<div class="one-relates-box"[\s\S]*<div style="height:50px; ">/;
    pattern2 = /class="placeholder-one-night-mode one-webview" style="margin-left: 20px;margin-right: 20px;"/;
    replaceStr1 = `<div style="height:${StyleScheme.appBarHeight+24}px; ">`;
    replaceStr2 = `class="placeholder-one-night-mode one-webview" style="margin-left: 20px;margin-right: 20px;margin-top: ${StyleScheme.appBarHeight+24}px;"`;
    renderSuccess(){
        const {data} = this.state;
        const {onScrollCallback } = this.props;
        let html = data.html_content;
        //替换底部 作者、评论
        html = CommonUtils.replaceByRegPattern(html,this.pattern,this.replaceStr1);
        html = CommonUtils.replaceByRegPattern(html,this.pattern1,this.replaceStr1);
        //为布局加上 appBarHeight+24的margin-top
        html = CommonUtils.replaceByRegPattern(html,this.pattern2,this.replaceStr2);
        return(
            <ConvenientWebView
                     source={{html:html}}
                     startInLoadingState={true}
                     renderLoading={()=>{return this.renderLoadingView()}}
                     renderError = {()=>{return this.renderErrorView()}}
                     onScroll={(result)=>{if (CommonUtils.checkFunction(onScrollCallback)){onScrollCallback(result)} }}
            />
        );
    };
//
}