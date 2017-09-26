/**
 *===========================================
 * Description:BaseComponent
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/6
 *===========================================
 */
'use strict';
import React,{Component,PureComponent} from 'react'
import {
    Platform,
    NativeModules,
    BackHandler,

} from 'react-native'
import LogUtils from "../util/LogUtils";
import OrientationIOS from 'react-native-orientation'
import Toast from "../componet/widget/Toast";
import NavigationActions from "../../node_modules/react-navigation/lib-rn/NavigationActions";

export default  class BaseComponent extends PureComponent{


    constructor(props){
        super(props);
        this.loadData = this.loadData.bind(this);
        this.onBackAndroid = this.onBackAndroid.bind(this);
        const {Orientation: OrientationAndroid} = NativeModules;
        let Orientation;
        if (Platform.OS === 'ios') {
            Orientation = OrientationIOS;
        } else {
            Orientation = OrientationAndroid;
        }
        this.controlOrientation(Orientation);
    };

    static navigationOptions  = {
        title:'NewP',
        gesturesEnabled:true,
        cardStack:{
            gesturesEnabled: true,
        }
    };

    getNavigation(context){
        context = context?context:this;
        return context.props.navigation;
    }

    getNavigationState(context){
        context = context?context:this;
        return context.props.navigation.state;
    }

    getNavigationParams(context){
        context = context?context:this;
        try{
            return context.props.navigation.state.params;
        }catch (e){
            LogUtils.errorMsg('last page don\'t carry any params ');
        }
    }

    navigateNewPage(pageName,params,context){
        context = context?context:this;
        if (params){
            params['navigatorCallback'] = (result)=>context.navigatorCallback(result);
        }else {
            params = {navigatorCallback:(result)=>context.navigatorCallback(result)};
        }
        context.props.navigation.navigate(pageName,params);
    }

    goBack(context){
        context = context?context:this;
        context.props.navigation.goBack();
    }

    reset(pageName,params,context){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: pageName, params: params})
            ]
        });
        context = context?context:this;
        context.props.navigation.dispatch(resetAction);
    }

    navigatorCallback(result){

    }

    /**
     * 屏幕方向控制
     * default:controller.lockToPortrait();
     * @param controller
     *  <p>controller.lockToPortrait();</p>
     *  <p>controller.lockToLandscape();</p>
     *  <p>controller.lockToLandscapeLeft();</p>
     *  <p>controller.lockToLandscapeRight();</p>
     */
    controlOrientation(controller){
        controller.lockToPortrait();
    }

    /**
     * 组件将要被挂载
     * 不可见，不可交互 ，UI未被初始化
     */
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
        // LogUtils.logMsg("====>componentWillMount");
    }

    /**
     * 展示内容
     * 可见
     */
    render(){
        // LogUtils.logMsg("====>render");
    }

    /**
     * 组件挂载完成
     * 可见 可交互
     */
    componentDidMount(){
        // LogUtils.logMsg("====>componentDidMount");
        this.loadData();
    }

    /**
     * 接受到Props被修改
     */
    componentWillReceiveProps(){
        // LogUtils.logMsg("====>componentWillReceiveProps");
    }

    /**
     * 更新组件显示内容完成
     */
    componentDidUpdate(){
        // LogUtils.logMsg("====>componentDidUpdate");
    }

    /**
     * 组件被移除
     * 不可见
     */
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
        // LogUtils.logMsg("====>componentWillUnmount");
    }

    onBackAndroid() {
        return false;
    }

    /**
     * 请求网络数据
     */
    loadData() {

    }
}

