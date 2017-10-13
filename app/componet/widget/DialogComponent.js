/**
 *===========================================
 * Description:DialogComponent 对话框组件
 *
 * Author:M-Liu
 *
 * CrateDate:2017/10/11
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';
import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Dimensions,
    NativeModules,
    View,
    Animated,
    LayoutAnimation,
    Text,
} from 'react-native';
import * as Easing from "react-native/Libraries/Animated/src/Easing";
import TouchView from "./TouchView";
import LogUtils from "../../util/LogUtils";
import StyleScheme from "../../res/value/StyleScheme";
import CommonUtils from "../../util/CommonUtils";
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:'35%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    content:{
        backgroundColor:'transparent',
        borderColor:StyleScheme.lineColor,
        width:0,
        height:0,
        borderWidth:0.5,
        borderRadius:3,
    }
});
const windowHeight  = Dimensions.get('window').height;
const windowWidth  = Dimensions.get('window').width;
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class DialogComponent extends PureComponent{

    constructor(props){
        super(props);
        this.state = {width:0,height:0};
    }

//     const{
//     width,
//     height,
//     backgroundColor,
// } = this.props;
// this.width = width;
// this.height = height;
// this.backgroundColor = backgroundColor;

    render(){
        const{
            contentLayout
        } = this.state;
        return(
            <TouchView onPress={()=>{this.hide()}}>
                    <View style={[
                        styles.container,
                    ]}>
                        <View style={[styles.content,{width:this.state.width,height:this.state.height,backgroundColor:this.state.backgroundColor}]}>
                            {contentLayout}
                        </View>
                    </View>
            </TouchView>
        )
    }

    dismiss(){

    }

    setDialogConfig(config={}){
        if (config.width)
            this.width = config.width;
        if (config.height)
            this.height = config.height;
        if (config.backgroundColor)
            this.backgroundColor = config.backgroundColor;
    }

    setContentView(contentLayout){
        this.setState({contentLayout:contentLayout});
    }

    hide(){
        this.doStrickAnimation();
    }

    show(){
        this.doStrickAnimation(false);
    }

    doStrickAnimation(hide = true){
        LayoutAnimation.configureNext(
            {
                duration: 500,
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
        this.setState({
            width:hide?0:this.width?this.width:'95%',
            height:hide?0:this.height?this.height:200,
            backgroundColor:hide?'transparent':this.backgroundColor?this.backgroundColor:'white',
        })
    }



    // doingAnimation = false;
    // doDrawerAnimation(hide = true) {
    //     const {translateValue}=this.state;
    //     translateValue.addListener((result)=>{
    //         if (parseInt(result.value) === 0 || parseInt(result.value) === windowHeight){
    //             this.doingAnimation = false;
    //         }else {
    //             this.doingAnimation = true;
    //         }
    //     });
    //     Animated.timing(
    //         translateValue,
    //         {
    //             toValue:hide?windowHeight:0,
    //             duration:300,
    //             easing: Easing.linear,//线性运动
    //             useNativeDriver: true,
    //         }
    //     ).start();
    // }
}