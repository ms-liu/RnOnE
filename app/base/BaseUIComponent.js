/**
 *===========================================
 * Description:BaseUIComponent
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */
'use strict';
import React,{Component} from 'react'
import {
    Platform,
    NativeModules,
    StyleSheet,
    View,
    StatusBar, Text,
} from 'react-native'

import StyleScheme from '../res/value/StyleScheme'
import BaseComponent from "./BaseComponent";
import BottomNavigationBar from '../componet/widget/BottomNavigationBar'
import AppNavigationBar from '../componet/widget/AppNavigationBar'
import PopupWindowComponent from "../componet/widget/PopupWindowComponent";
import DialogComponent from "../componet/widget/DialogComponent";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:StyleScheme.pageBackground,
    },
});

export default  class BaseUIComponent extends BaseComponent{
    static STATUS_BAR_DARK = 'dark-content';
    static STATUS_BAR_LIGHT = 'light-content';
    static STATUS_BAR_DEFAULT = 'default';

    static PAGE_COMMON= 'page_common';
    static PAGE_TRANSLUCENT= 'page_translucent';
    static PAGE_FULL_SCREEN= 'page_full_screen';

    static ANIMATION_NONE = 'none';
    static ANIMATION_SLIDE = 'slide';
    static ANIMATION_FADE = 'fade';
    mNavigationBar = null;
    mPopupWindow = null;
    mDialog = null;
    constructor(props){
        super(props);
        this.renderNavigator = this.renderNavigator.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.toggleBottomNavigator = this.toggleBottomNavigator.bind(this);
        this.renderNavigatorTitle = this.renderNavigatorTitle.bind(this);
    };

    componentDidMount(){
        StatusBar.setBackgroundColor(this.setStatusBarColor(),true);
        StatusBar.setBarStyle(BaseUIComponent.STATUS_BAR_DARK,true);
        switch (this.setPageShowMode()){
            case BaseUIComponent.PAGE_FULL_SCREEN:
                StatusBar.setHidden(true,this.setFullScreenAnimation());
                break;
            case BaseUIComponent.PAGE_TRANSLUCENT:
                StatusBar.setTranslucent(this.setTranslucentMode());
                break;
            case BaseUIComponent.PAGE_COMMON:
            default:
                break;
        }
        super.componentDidMount();
    }

    /**
     * 返回头部布局
     * @returns {XML}
     */
    renderNavigator(){
        return(
            <AppNavigationBar
                ref={navigationBar=>this.mNavigationBar = navigationBar}
                onBackIconClick={()=>{this.goBack()}}
                title={this.renderNavigatorTitle()}
                />
        );
    }

    /**
     * 获取主体布局
     */
    renderBody(){

    }

    /**
     * 获取底部导航布局
     * @returns {XML}
     */
    renderBottomNavigator(){
        return(
            <BottomNavigationBar />
        );
    }

    /**
     * 底部显示控制器
     * @returns {boolean} false 不显示  true 显示
     */
    toggleBottomNavigator(){
        return false;
    }

    render(){
        super.render();
        return(
            <View style={styles.container}>
                {this.renderBody()}
                {this.renderNavigator()}
                {this.toggleBottomNavigator()?this.renderBottomNavigator():<View/>}
                {this.togglePopupWindow()?this.renderPopupWindow():<View/>}
                {this.toggleAlertDialog()?this.renderAlertDialog():<View/>}
            </View>
        );
    }

    renderNavigatorTitle() {
        return 'NewP'
    }

    setStatusBarColor() {
        return StyleScheme.colorPrimary;
    }

    setTranslucentMode() {
        return false;
    }

    setStatusBarHidden() {
        return false;
    }

    setPageShowMode() {
        return BaseUIComponent.PAGE_COMMON;
    }

    setFullScreenAnimation() {
        return BaseUIComponent.ANIMATION_SLIDE;
    }

    renderPopupWindow() {
        return <PopupWindowComponent  ref={popupWindow=>this.mPopupWindow = popupWindow}


        />;
    }

    togglePopupWindow() {
        return false;
    }


    toggleAlertDialog() {
        return false;
    }

    renderAlertDialog() {
        return <DialogComponent  ref={dialog=>this.mDialog = dialog}/>;
    }

}

