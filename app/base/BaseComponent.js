/**
 *===========================================
 * Description:BaseComponent
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */
import React,{Component} from 'react'
import {
    View,
} from 'react-native'
import LogUtils from "../util/LogUtils";

export default  class BaseComponent extends Component{
    constructor(props){
        super(props);
    };

    // getDefaultProps(){
    //     LogUtils.logMsg("====>getDefaultProps");
    // };
    //
    // getInitialState(){
    //     LogUtils.logMsg("====>getInitialState");
    // };

    componentWillMount(){
        LogUtils.logMsg("====>componentWillMount");
    }

    render(){
        LogUtils.logMsg("====>render");
    }

    componentDidMount(){
        LogUtils.logMsg("====>componentDidMount");
    }

    componentWillReceiveProps(){
        LogUtils.logMsg("====>componentWillReceiveProps");
    }

    // shouldComponentUpate (){
    //     LogUtils.logMsg("====>shouldComponentUpate");
    // }
    //
    // componentWillUpate(){
    //     LogUtils.logMsg("====>componentWillUpate");
    // }

    componentDidUpdate(){
        LogUtils.logMsg("====>componentDidUpdate");
    }

    componentWillUnmount(){
        LogUtils.logMsg("====>componentWillUnmount");
    }
}

