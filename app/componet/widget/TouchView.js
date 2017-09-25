/**
 *===========================================
 * Description:TouchView
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/20
 *
 * Email:ms_liu163@163.com
 *===========================================
 */
'use strict';
import React,{Component} from 'react';
import {TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import CommonUtils from '../../util/CommonUtils'

export default class TouchView extends Component{
    render(){
        if (CommonUtils.checkAndroid()){
            return(
                <TouchableNativeFeedback
                    {...this.props}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                </TouchableNativeFeedback>
            );

        }else {
            return(
                <TouchableHighlight
                    {...this.props}
                >

                </TouchableHighlight>
            )
        }

    }
}



