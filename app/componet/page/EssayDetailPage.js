/**
 *===========================================
 * Description:EssayDetailPage 详情页面——阅读
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
import {
    NativeModules,
    LayoutAnimation,
    StyleSheet,
    Text,
    View,
    Image} from "react-native";
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
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class EssayDetailPage extends BaseUIComponent{
    mPlayerAnimationTimer = null;
    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {playFlex:0}
    }
    renderNavigatorTitle(){
        const {title} = this.getNavigationParams();
        return title;
    }
    renderBody(){
        const {contentId} = this.getNavigationParams();
        const {playFlex} = this.state;
        return (
            <View style={styles.body}>
                <DetailContent
                    contentId = {contentId}
                    onScrollCallback = {(result)=>this.handleScroll(result)}
                    onLoadDataCallback = {(data)=>this.handleData(data)}
                />
                <View
                    style={{
                        position:'absolute',
                        bottom:0,
                        width:'100%',
                        height:StyleScheme.appBarHeight,
                        backgroundColor:'#fffe',
                        borderTopWidth:0.5,
                        borderTopColor:StyleScheme.lineColor,
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'row',
                    }}
                >
                    <View style={{flex:playFlex,zIndex:10,height:'100%',backgroundColor:'red'}} />
                    <View style={{flex:1,flexDirection:'row', justifyContent:'center',
                        alignItems:'center',}}>
                        <Image style={{width:25,height:25,}} source={require('../../res/image/bubble_like.png')} />
                        <Text style={{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTipTextSize}}>1238</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', justifyContent:'center',
                        alignItems:'center',}}>
                        <Image style={{width:25,height:25,}} source={require('../../res/image/bubble_share.png')} />
                        <Text style={{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTipTextSize}}></Text>
                    </View>
                </View>
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

    handleData(data) {
        if(data){
            if (data.audio){
                this.doDelayPlayerAnimation();
            }
        }
    }

    doDelayPlayerAnimation(){
        this.mPlayerAnimationTimer = setTimeout(()=>{
            LayoutAnimation.configureNext(
                {
                    duration: 1500,
                    create: {
                        type: LayoutAnimation.Types.linear,
                        property: LayoutAnimation.Properties.opacity,
                    },
                    update: {
                        type: LayoutAnimation.Types.spring,
                        springDamping: 0.8,
                    },
                    delete: {
                        type: LayoutAnimation.Types.linear,
                        property: LayoutAnimation.Properties.opacity,
                    },
                }
            );
            this.setState({playFlex:3})
        },2000);
    }

    componentWillUnmount(){
        this.mPlayerAnimationTimer && clearTimeout(this.mPlayerAnimationTimer);
        super.componentWillUnmount();
    }
}

class DetailContent extends BaseLoadComponent{
    static property={
        onScrollCallback:React.PropTypes.func,
        onLoadDataCallback:React.PropTypes.func,
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
            onLoadDataCallback,
        } = this.props;
        this.mApi.getEssayDetailData(contentId).then(result=>{
            CommonUtils.checkFunction(onLoadDataCallback) && onLoadDataCallback(result.data);
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