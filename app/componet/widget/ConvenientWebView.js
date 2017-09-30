/**
 *===========================================
 * Description:ConvenientWebView 便捷的WebView
 *  1、存在默认实现，
 *  2、实现页面滚动监听、
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/29
 *
 * Email:ms_liu163@163.com
 *===========================================
 */

'use strict';
import React,{PureComponent} from 'react';
import {WebView} from 'react-native';
import CommonUtils from "../../util/CommonUtils";
import LogUtils from "../../util/LogUtils";

export default class ConvenientWebView extends PureComponent{
    static SCROLL_EVENT_JS = "window.addEventListener('scroll',()=>window.postMessage(JSON.stringify({eType:1,eName:'onScroll',value:document.body.scrollTop})))";
    mWebView = null;
    static property={
        onScroll:React.PropTypes.func,
    };

    render(){
        const {
            onLoad,
            onMessage
        } = this.props;

        return(
            <WebView
                {...this.props}
                ref={webView => { this.mWebView = webView;}}
                onLoad ={()=>{
                    if (CommonUtils.checkFunction(onLoad))
                        onLoad();
                    this.onWebVieOnLoad()}}
                startInLoadingState={true}
                javaScriptEnabled = {true}
                onMessage={(event)=>{
                    if (CommonUtils.checkFunction(onLoad))
                        onMessage();
                    this.onWebViewMessage(JSON.parse(event.nativeEvent.data))
                }}
            />
        )
    }
    onWebVieOnLoad() {
        this.mWebView && this.mWebView.injectJavaScript(ConvenientWebView.SCROLL_EVENT_JS);
    }
    onWebViewMessage(result) {
        switch (result.eType){
            case 1:
                if (CommonUtils.checkFunction(this.props.onScroll))
                    this.props.onScroll(parseInt(result.value));
                break;
            default:

                break;
        }
    }
}