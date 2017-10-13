/**
 *===========================================
 * Description:PopupWindowComponent 弹窗组件
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
import {StyleSheet,Dimensions, View,Animated} from 'react-native';
import * as Easing from "react-native/Libraries/Animated/src/Easing";
import TouchView from "./TouchView";
import LogUtils from "../../util/LogUtils";
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:'#0007',
        height:'100%',
        width:'100%'
    }
});
const windowHeight  = Dimensions.get('window').height;
const windowWidth  = Dimensions.get('window').width;
export default class PopupWindowComponent extends PureComponent{

    constructor(props){
        super(props);
        this.state = {translateValue:new Animated.Value(windowHeight)};
    }


    render(){
        const{
            translateValue
        } = this.state;
        return(
            <TouchView onPress={()=>{this.hide()}}>
                <Animated.View
                    {...this.props}
                    style={[
                        styles.container,
                        {
                            transform: [{translateY: translateValue}]
                        }
                    ]}
                >
                </Animated.View>
            </TouchView>
        )
    }

    dismiss(){
        this.doDrawerAnimation();
    }

    hide(){
        this.doDrawerAnimation();
    }

    show(){
        this.doDrawerAnimation(false);
    }
    doingAnimation = false;
    doDrawerAnimation(hide = true) {
        const {translateValue}=this.state;
        translateValue.addListener((result)=>{
            if (parseInt(result.value) === 0 || parseInt(result.value) === windowHeight){
                this.doingAnimation = false;
            }else {
                this.doingAnimation = true;
            }
        });
        Animated.timing(
            translateValue,
            {
                toValue:hide?windowHeight:0,
                duration:300,
                easing: Easing.linear,//线性运动
                useNativeDriver: true,
            }
        ).start();
    }
}