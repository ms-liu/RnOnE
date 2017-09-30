/**
 *===========================================
 * Description:AppNavigationBar
 * 头部导航菜单栏
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */

import React,{Component,PureComponent} from 'react';
import StyleScheme from '../../res/value/StyleScheme'
import {
    NativeModules,
    StyleSheet,
    View,
    Animated, Image, Text
} from 'react-native';
import LogUtils from "../../util/LogUtils";
import TouchView from "./TouchView";
import CommonUtils from "../../util/CommonUtils";
import * as Easing from "react-native/Libraries/Animated/src/Easing";
const styles = StyleSheet.create({
    navigatorStyle:{
        width:'100%',
        position:'absolute',
        height:StyleScheme.appBarHeight,
        backgroundColor:StyleScheme.colorPrimary,
        paddingLeft:StyleScheme.commonPadding,
        paddingRight:StyleScheme.commonPadding+25,
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
        paddingTop:StyleScheme.appBarHeight,
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
});
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default class AppNavigationBar extends PureComponent{
    static property ={
        height:React.PropTypes.number
    };

    constructor(props){
        super(props);
        this.state = {translateValue:new Animated.Value(0)}
    }

    render(){
        const {
            title,
            onBackIconClick
        } = this.props;
        const{
            translateValue
        } = this.state;
        return(
            <Animated.View style={[
                styles.navigatorStyle,
                {
                    transform: [{translateY: translateValue}]

                }
                ]}>
                <TouchView onPress={()=>{CommonUtils.checkFunction(onBackIconClick)?onBackIconClick():{}}}>
                    <Image
                        style={styles.navigatorIcon}
                        source={require('../../res/image/aliwx_common_back_btn_normal.png')}/>
                </TouchView>
                <Text style={styles.navigatorText}>{title}</Text>
            </Animated.View>
        );
    }


    // spring  //弹跳
    // linear  //线性
    // easeInEaseOut  //缓入缓出
    // easeIn  //缓入
    // easeOut  //缓出
    // keyboard  //键入
    doingAnimation = false;
    doDrawerAnimation(hide = true) {
        const {translateValue}=this.state;
        translateValue.addListener((result)=>{
            if (parseInt(result.value) === 0 || parseInt(result.value) === 0-StyleScheme.appBarHeight){
                this.doingAnimation = false;
            }else {
                this.doingAnimation = true;
            }
        });
        Animated.timing(
            translateValue,
            {
                toValue:hide?0-StyleScheme.appBarHeight:0,
                duration:300,
                easing: Easing.linear//线性运动

            }
        ).start();
    }
    show(){
        const {translateValue}=this.state;
        if ((parseInt(JSON.stringify(translateValue)) < 0) && !this.doingAnimation){
            this.doDrawerAnimation(false);
        }
    }

    hide(){
        const {translateValue}=this.state;
        if ((parseInt(JSON.stringify(translateValue)) === 0 && !this.doingAnimation)){
            this.doDrawerAnimation();
        }
    }
}