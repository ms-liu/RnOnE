/**
 *===========================================
 * Description:自动轮播组件
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/25
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';
import React,{Component} from 'react';

import Swiper  from 'react-native-swiper'
import TouchView from "./TouchView";
import CommonUtils from "../../util/CommonUtils";

export default class AutoCarouselComponent extends Component{
    static property = {
        loadCarouseData:React.PropTypes.func,
        onItemClickCallback:React.PropTypes.func,
    };


    constructor(props){
        super(props);
        this.renderPageView = this.renderPageView.bind(this);
        this.renderSwiperDotView = this.renderSwiperDotView.bind(this);
    }

    componentDidMount(){
        const {
            loadCarouseData
        } = this.props;

        if (CommonUtils.checkFunction(loadCarouseData))
            loadCarouseData();
    }

    render(){
        const {
            carouseShow,
        } = this.props;
        if (carouseShow){
            return (
                <Swiper
                    {...this.props}
                    index={0}
                    autoplay = {true}
                    dot={this.renderSwiperDotView()}
                    activeDotColor={'white'}
                    removeClippedSubviews={true}
                    paginationStyle={{
                        top: 12,
                        left: 0,
                        right: 0,
                        flexGrow:0,
                        flexShrink:1,
                        paddingRight:12,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                    }}
                    >
                    {this.renderPageView()}
                </Swiper>

            )
        }else {
            return this.renderDefaultView();
        }
    }

    renderDefaultView(){

    }

    componentWillUnmount(){

    }

    renderSwiperDotView() {

    }

    renderPageView() {
        const {
            carouseData,
            onItemClickCallback,
        } = this.props;
        let result = [];
        for(let i = 0;i<carouseData.length;i++){
            let itemData = carouseData[i];
            result.push(
                <TouchView  key= {i}  onPress={()=>CommonUtils.checkFunction(onItemClickCallback)?onItemClickCallback(i,itemData):{}}>
                    {this.renderItemView(i,itemData)}
                </TouchView>
            )
        }
        return result;
    }

    renderItemView(index,itemData) {

    }
}

