/**
 *===========================================
 * Description:HorizontalScrollComponent 水平滚动组件
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/25
 *
 * Email:ms_liu163@163.com
 *===========================================
 */
'use strict';

import React,{PureComponent} from 'react';
import {} from 'react-native';
import CommonUtils from "../../util/CommonUtils";
import {ScrollView} from "react-native";
import TouchView from "./TouchView";


export default class HorizontalScrollComponent extends PureComponent{

    static property = {
        loadScrollData:React.PropTypes.func,
        onItemClickCallback:React.PropTypes.func,
    };

    componentDidMount() {
        const {
            loadScrollData
        } = this.props;
        if (CommonUtils.checkFunction(loadScrollData))
            loadScrollData();
    }

    render() {
        return (
            <ScrollView  horizontal={true} removeClippedSubviews ={true} showsHorizontalScrollIndicator ={false}>
                {this.renderChildrenView()}
            </ScrollView>
        )
    }

    renderChildrenView(){
        const {
            scrollData,
            onItemClickCallback,
        } = this.props;
        if (!CommonUtils.checkArray(scrollData))
            return;
        let result = [];
        for (let i=0;i<scrollData.length;i++){
            let itemData = scrollData[i];
            result.push(
                    <TouchView key={i} onPress={()=>CommonUtils.checkFunction(onItemClickCallback)?onItemClickCallback(i,itemData):{}}>
                        {this.renderItemView(i,itemData)}
                    </TouchView>
                );
        }
        return result;
    }

    renderItemView(index, itemData){

    }
}