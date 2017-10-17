/**
 *===========================================
 * Description:SerialDetailPage 详情页面——音乐
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
import LogUtils from "../../util/LogUtils";
import Toast from "../widget/Toast";
import PopupWindowComponent from "../widget/PopupWindowComponent";
import HorizontalScrollComponent from "../widget/HorizontalScrollComponent";
import TouchView from "../widget/TouchView";
import AppNavigationBar from "../widget/AppNavigationBar";
import TransparentNavigationBar from "../widget/TransparentNavigationBar";
const styles = StyleSheet.create({
    body:{
        height:StyleScheme.bottomBarHeight,
        width:'100%',
        flex:1,
    },

});
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class MusicDetailPage extends BaseUIComponent{
    mPlayerAnimationTimer = null;
    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {playFlex:0}
    }

    renderNavigator(){
        const params = this.getNavigationParams();
        return(
            <TransparentNavigationBar
                style={{ paddingTop:24,height:StyleScheme.appBarHeight+24}}
                ref={navigationBar=>this.mNavigationBar = navigationBar}
                onBackIconClick={()=>{
                    this.goBack()}}
                title={this.renderNavigatorTitle()}
            />
        );
    }

    setPageShowMode(){
        return BaseUIComponent.PAGE_TRANSLUCENT;
    }

    setTranslucentMode(){
        return true;
    }
    setStatusBarColor(){
        return 'transparent';
    }

    setStatusBarStyle(){
        return BaseUIComponent.STATUS_BAR_LIGHT;
    }

    renderNavigatorTitle(){
        const {title} = this.getNavigationParams();
        return title;
    }

    // togglePopupWindow(){
    //     return true;
    // }

    toggleAlertDialog(){
        return true;
    }

    renderBody(){
        const {contentId} = this.getNavigationParams();
        const {playFlex,data} = this.state;
        return (
            <View style={styles.body}>
                <MusicDetailContent
                    contentId = {contentId}
                    patchPopupWindowComponent = {()=>{return this.mPopupWindow}}
                    patchAlertDialogComponent = {()=>{return this.mDialog}}
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
                        <Text style={{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTipTextSize}}>{data?data.praisenum:''}</Text>
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
    reseted = false;
    handleScroll(result){
        this.top =result;
        let ratio = result/150.0;
        if (ratio <1){
            this.reseted = false;
            this.resetStatusBar({statusBarStyle:BaseUIComponent.STATUS_BAR_LIGHT});
            this.mNavigationBar.setRatio(ratio);
        }else {
            if (!this.reseted){
                this.reseted = true;
                this.resetStatusBar({statusBarStyle:BaseUIComponent.STATUS_BAR_DARK});
            }

            this.mNavigationBar.setRatio(1);
        }
    }

    handleData(data) {
        if(data){
            this.setState({data:data});
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
        this.resetStatusBar();
        this.mPlayerAnimationTimer && clearTimeout(this.mPlayerAnimationTimer);
        super.componentWillUnmount();
    }
}

class MusicDetailContent extends BaseLoadComponent{
    static OPEN_SELECT_SERIAL_JS = CommonUtils.joinClickJavaScript('serialBtns','one-serial-nav-ids-btn',{eType:2,eName:'openSelectSerial',value:{}});
    static OPEN_PRE_STORIES_JS = CommonUtils.joinClickJavaScript('preBtns','one-serial-nav-prev',{eType:3,eName:'openPreStories',value:{}});
    static OPEN_NEXT_STORIES_JS = CommonUtils.joinClickJavaScript('nextBtns','one-serial-nav-next',{eType:4,eName:'openNextStories',value:{}});

    mWebView = null;
    mDialog = null;
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
        } = this.props;
        this.mContentId = contentId;
        this.doLoadData()
    }
    doLoadData(){
        const{
            onLoadDataCallback,
        } = this.props;
        this.state ={pageStatus:BaseLoadComponent.Loading};
        this.mApi.getMusicData(this.mContentId).then(result=>{
            CommonUtils.checkFunction(onLoadDataCallback) && onLoadDataCallback(result.data);
            this.setState({data:result.data,pageStatus:result.status});
            // if (result.status === BaseLoadComponent.Success) {
            //     this.mApi.getSerialListData(result.data.serial_id).then(result2 => {
            //         this.setState({serialData: result2.data});
            //     });
            // }
        });
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
        // html = CommonUtils.replaceByRegPattern(html,this.pattern2,this.replaceStr2);
        return(
            <View style={{flex:1}}>
                <ConvenientWebView
                         source={{html:html}}
                         ref={webView => { this.mWebView = webView;}}
                         startInLoadingState={true}
                         injectJavaScripts = {()=>{return [
                             // SerialDetailContent.OPEN_SELECT_SERIAL_JS,
                             // SerialDetailContent.OPEN_PRE_STORIES_JS,
                             // SerialDetailContent.OPEN_NEXT_STORIES_JS,
                         ]}}
                         onMessage={(event)=>{this.handleMessage(JSON.parse(event.nativeEvent.data))}}
                         renderLoading={()=>{return this.renderLoadingView()}}
                         renderError = {()=>{return this.renderErrorView()}}
                         onScroll={(result)=>{if (CommonUtils.checkFunction(onScrollCallback)){onScrollCallback(result)} }}
                />

            </View>
        );
    };

    handleMessage(result) {
        const {
            contentId,
            patchPopupWindowComponent,
            patchAlertDialogComponent,
        } = this.props;
        const{
            serialData
        } = this.state;
        // if (!serialData){
        //     Toast.show(CommonUtils.getNetErrorTip());
        //     return;
        // }
        switch (result.eType){
            // case 2:
            //     if (CommonUtils.checkFunction(patchAlertDialogComponent)){
            //         this.mDialog = patchAlertDialogComponent();
            //         this.mDialog.setContentView(this.renderDialogContentView(serialData));
            //         this.mDialog.show();
            //     }
            //     break;
            // case 3:
            //     // Toast.show('前一张');
            //     for(let i=0;i<serialData.list.length;i++){
            //         let item = serialData.list[i];
            //         if (parseInt(item.id) === parseInt(this.mContentId) && i>0){
            //             item = serialData.list[i-1];
            //             this.mContentId = item.id;
            //             this.doLoadData();
            //             return;
            //         }
            //     }
            //     break;
            // case 4:
            //     for(let i=0;i<serialData.list.length;i++){
            //         let item = serialData.list[i];
            //         if (parseInt(item.id) === parseInt(this.mContentId) && i<(serialData.list.length-1)){
            //             item = serialData.list[i+1];
            //             this.mContentId = item.id;
            //             this.doLoadData();
            //             return;
            //         }
            //     }
            //     break;
            default:

                break;
        }
    }

    renderDialogContentView(serialData) {
        return (
            <View style={{flex:1,padding:StyleScheme.commonPadding}}>


            </View>
        )
    }
//
// <TouchView onPress={()=>{this.mDialog && this.mDialog.hide()}}>
// <Image style={{width:25,height:25,}} source={require('../../res/image/close_gray.png')}/>
// </TouchView>
// <Text style={{alignSelf:'center',color:StyleScheme.titleColor,fontSize:16,paddingVertical:StyleScheme.commonPadding}}>
// {`${serialData.title}${parseInt(serialData.finished) === 0?'(未完结)':''}`}
// </Text>
// <View style={{backgroundColor:StyleScheme.lineColor,width:'100%',height:0.5,marginBottom:StyleScheme.commonPadding}}/>

//
// <SerialListComponent
// scrollData = {serialData.list}
// onItemClickCallback={(index,itemData)=>this.onSerialMenuClick(index,itemData)}
// />
    onSerialMenuClick(index, itemData) {
        this.mDialog && this.mDialog.hide();
        this.mContentId = itemData.id;
        this.doLoadData();
    }
}

// class SerialListComponent extends HorizontalScrollComponent{
//     renderItemView(index,itemData){
//         this.marginRight =0;
//         this.marginLeft =0;
//         return(
//             <View style={{
//                 borderRadius:4,
//                 borderWidth:0.5,
//                 height:60,
//                 width:60,
//                 borderColor:StyleScheme.lineColor,
//                 marginRight:StyleScheme.commonPadding,
//                 justifyContent:'center',
//                 alignItems:"center"
//             }}>
//                <Text style={{color:StyleScheme.textColor2,fontSize:16}}> {itemData.number}</Text>
//             </View>
//         )
//     }
// }
