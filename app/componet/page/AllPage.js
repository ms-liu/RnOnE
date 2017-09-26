/**
 *===========================================
 * Description:全部推荐页
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/11
 *
 * Email:ms_liu163@163.com
 *===========================================
 */


'use strict';

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image, Animated
} from 'react-native';
import RefreshFlatList from "../widget/RefreshFlatList";
import StyleScheme from "../../res/value/StyleScheme";
import BaseRefreshComponent from "../widget/BaseRefreshComponent";
import AutoCarouselComponent from "../widget/AutoCarouselComponent";
import BaseLoadComponent from "../../base/BaseLoadComponent";
import Toast from "../widget/Toast";
import LogUtils from "../../util/LogUtils";
import HorizontalScrollComponent from "../widget/HorizontalScrollComponent";
import StringValue from "../../res/value/StringValue";
import CommonUtils from "../../util/CommonUtils";
import TouchView from "../widget/TouchView";


const styles = StyleSheet.create({

    advertiseWrapper:{
        width:'100%',
        height:250,
        flexGrow:0,
        flexShrink:1,
        flexDirection:'row'
    },
    dotViewStyle:{
        backgroundColor:'transparent',
        width:8,
        height: 8,
        borderColor:'#fff',
        borderRadius: 4,
        borderWidth:1,
        margin:3
    },
    advertiseSlideItem: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionSlideItem:{
        borderRadius:4,
        overflow:'hidden',
        width:250,
        height:150,
    },
    questionTextBg:{
        position:'absolute',
        backgroundColor:'#0008',
        justifyContent:'center',
        alignItems:'center'
    },
    questionTagBg:{
        backgroundColor:'#0002',
        width:50,
        height:50,
        position:'absolute',
        top:0,
        left:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:4,
        borderBottomRightRadius:50
    },
    questionTagStyle:{
        color:'white',
        transform:[{ rotateZ: '-45deg' }],
        fontSize:12
    },
    questionTextStyle:{
        color:'white',
        fontSize:16,
        lineHeight:22,
        padding:12,
        textAlign:'center'
    },

    authorItemStyle:{
        borderRadius:4,
        overflow:'hidden',
        width:250,
        height:180,
        justifyContent:'center',
        alignItems:'center',
    },

    authorIconStyle:{
        borderRadius:30,
        borderWidth:1,
        borderColor:'white',
        width:60,
        height:60,
    },
    authorNameStyle:{
        paddingVertical:10,
        color:'white',
        fontSize:StyleScheme.commonTextSize,
        paddingHorizontal:StyleScheme.commonPadding<<1,
    },

    authorDescStyle:{
        color:'white',
        fontSize:StyleScheme.commonTipTextSize,
        paddingHorizontal:StyleScheme.commonPadding<<1,
        paddingVertical:5,
    },

    commonItem:{
        backgroundColor:'white',
        flex:1,
        width:'100%',
        padding:StyleScheme.commonPadding<<1,
        justifyContent:'center',
        alignItems:'center',
    },
    commonItemImageStyle:{
        borderRadius:4,
        flex:1,
        width:'100%',
        height:200,
    },
    commonItemTextStyle:{
        width:"100%",
        paddingTop:StyleScheme.commonPadding,
        color:StyleScheme.textColor,
        fontSize:16,
        lineHeight:18,
    }
});

export default class AllPage extends BaseRefreshComponent{
    constructor(props){
        super(props);
        this.state ={
            pageStatus:BaseLoadComponent.Success,
            toggleLoadMore:false,
            viewStatus:RefreshFlatList.REFRESHING,
            headerStatus:BaseRefreshComponent.HEADER_SHOW,
            carouseData:[],
            questionData:[],
            hotAuthorData:[],
            carouseShow:false,
        };
    }

    componentWillMount(){
        super.componentWillMount();
    }

    renderEmptyView(){
        return(<Text>暂无数据</Text>)
    }
    itemSeparatorComponent() {
        return(<View style={{height:10,backgroundColor:'transparent'}}/>);
    }

    toggleLoadMore(){
        return true;
    }

    doLoadMoreData() {

        this.doLoadData(false);
    }

    doRefreshData() {
        this.doLoadData(true);
    }

    doLoadData(refresh){
        const{data}= this.state;
        if (!refresh)
            this.setState({viewStatus:RefreshFlatList.LOADING_MORE});
        const lastId = refresh?'':data[data.length-1].id;

        this.mApi.getTopicData(lastId).then(result => {
            if (result.status === BaseLoadComponent.Success){
                let newData=[];
                if (refresh){
                    newData = result.data;
                }else{
                    newData = data.concat(result.data);
                }
                this.setState({data:newData,viewStatus:RefreshFlatList.END_REQUEST});
            }else if (result.status === BaseLoadComponent.Empty){
                if (refresh){
                    this.setState({data:[],viewStatus:RefreshFlatList.END_REQUEST});
                }else {
                    this.setState({viewStatus:RefreshFlatList.NO_MORE});
                }
            }else {
                if (refresh){
                    this.setState({data:[],viewStatus:RefreshFlatList.END_REQUEST});
                }else {
                    this.setState({viewStatus:RefreshFlatList.NO_MORE});
                }
            }
        });
    }

    renderHeaderComponent(){
        const {
            carouseData,
            carouseShow,

            questionData,
            hotAuthorData,
        } = this.state;
        return(
            <View style={{flex:1,flexDirection:'column'}}>
                <View>
                    <AdvertiseComponent
                        style={styles.advertiseWrapper}
                        activeDotColor={StyleScheme.colorPrimary}
                        carouseData = {carouseData}
                        carouseShow = {carouseShow}
                        loadCarouseData={()=>{this.loadAdvertiseData()}}
                        onItemClickCallback={(index,itemData)=>this.onClickBannerItem(index,itemData)}/>
                </View>

                <View style={{backgroundColor:'white',paddingBottom:36,marginTop:12,}}>
                    <Text style={{
                        color:StyleScheme.textColor,
                        fontSize:StyleScheme.commonTextSize,
                        paddingVertical:StyleScheme.commonPadding,
                        paddingHorizontal:StyleScheme.commonPadding<<1}}>{StringValue.questionTitle}</Text>
                    <QuestionComponent
                        scrollData = {questionData}
                        loadScrollData={()=>{this.loadQuestionData()}}
                        onItemClickCallback={(index,itemData)=>this.onClickQuestionItem(index,itemData)}
                    />
                </View>

                <View style={{backgroundColor:'white',paddingBottom:36,marginTop:12,marginBottom:12,}}>
                    <Text style={{
                        color:StyleScheme.textColor,
                        fontSize:StyleScheme.commonTextSize,
                        paddingVertical:StyleScheme.commonPadding,
                        paddingHorizontal:StyleScheme.commonPadding<<1}}>{StringValue.hotAuthorTitle}</Text>
                    <AuthorComponent
                        scrollData = {hotAuthorData}
                        loadScrollData={()=>{this.loadHotAuthorData()}}
                        onItemClickCallback={(index,itemData)=>this.onClickAuthorItem(index,itemData)}
                    />
                </View>
            </View>
        )
    }

    bindItemViewModel(itemData,index) {
           return(
               <TouchView  onPress={()=>{this.onClickCommonItem(index,itemData)}}>
                   <View style={styles.commonItem}>
                       <Image source={{uri:itemData.cover}}  style={styles.commonItemImageStyle}>
                           <View style={styles.questionTagBg}>
                               <Text style={styles.questionTagStyle}>{StringValue.questionTag}</Text>
                           </View>
                       </Image>
                       <Text style={styles.commonItemTextStyle}>{itemData.title}</Text>
                   </View>
               </TouchView>
           );
    }

    /**
     * 加载轮播图数据
     */
    loadAdvertiseData() {
        this.mApi.getCarouseData().then(result=>{
            if (result.status === BaseLoadComponent.Success){
                this.setState({carouseData:result.data,carouseShow:true})
            }
        });
    }

    loadQuestionData() {
        this.mApi.getQuestionBannerData().then(result=>{
            if (result.status === BaseLoadComponent.Success){
                let data = result.data;
                data[0]['tag'] ='start';
                data[data.length-1]['tag'] ='end';
                this.setState({questionData:data})
            }
        });
    }

    loadHotAuthorData() {
        this.mApi.getHotAuthorData().then(result=>{
            if (result.status === BaseLoadComponent.Success){
                let data = result.data;
                data[0]['tag'] ='start';
                data[data.length-1]['tag'] ='end';
                this.setState({hotAuthorData:data})
            }
        });
    }

    onClickCommonItem(index, itemData) {
        Toast.show('Common'+index);
    }
    onClickBannerItem(index, itemData) {
        Toast.show('Banner'+index);
    }
    onClickQuestionItem(index, itemData) {
        Toast.show("问答"+index);
    }
    onClickAuthorItem(index, itemData) {
        Toast.show('作者'+index);
    }
}

class AdvertiseComponent extends AutoCarouselComponent{
    renderDefaultView(){
        return(
            <Image style={[styles.advertiseWrapper,]}
                   source={require('../../res/image/default_hp_image.png')}
            />
        );
    }

    renderSwiperDotView(){
        return (<View style={styles.dotViewStyle} />)
    }

    renderItemView(index,itemData){
        return (<Image style={styles.advertiseSlideItem} source={{uri:itemData.cover}}/>)
    }
}

class QuestionComponent extends HorizontalScrollComponent{
    renderItemView(index,itemData){
        this.marginRight =0;
        this.marginLeft =0;
        if (itemData.tag && itemData.tag === 'start'){
            this.marginLeft =StyleScheme.commonPadding<<1;
            this.marginRight =0;
        }else if (itemData.tag && itemData.tag === 'end'){
            this.marginLeft =StyleScheme.commonPadding;
            this.marginRight =StyleScheme.commonPadding<<1;
        }else {
            this.marginLeft =StyleScheme.commonPadding;
            this.marginRight =0;
        }
        return(
            <View style={{borderRadius:4,marginLeft:this.marginLeft,marginRight:this.marginRight}}>
                <Image style={styles.questionSlideItem} source={{uri:itemData.cover}}/>
                <View style={[styles.questionSlideItem,styles.questionTextBg]}>
                    <View style={styles.questionTagBg}>
                        <Text style={styles.questionTagStyle}>{StringValue.questionTag}</Text>
                    </View>
                    <Text style={styles.questionTextStyle}># {itemData.title}</Text>
                </View>
            </View>
        )
    }
}
class AuthorComponent extends HorizontalScrollComponent{
    renderItemView(index,itemData){
        this.marginRight =0;
        this.marginLeft =0;
        if (itemData.tag && itemData.tag === 'start'){
            this.marginLeft =StyleScheme.commonPadding<<1;
            this.marginRight =0;
        }else if (itemData.tag && itemData.tag === 'end'){
            this.marginLeft =StyleScheme.commonPadding;
            this.marginRight =StyleScheme.commonPadding<<1;
        }else {
            this.marginLeft =StyleScheme.commonPadding;
            this.marginRight =0;
        }
        return(
            <View style={{marginLeft:this.marginLeft,marginRight:this.marginRight,backgroundColor:StyleScheme.tipTextColor}}>
                <Image style={styles.authorItemStyle}
                       defaultSource={require('../../res/image/default_hp_image.png')}
                       source={{uri:itemData.web_url}} blurRadius ={20}>
                    <Image style={styles.authorIconStyle} source={{uri:itemData.web_url}}/>
                    <Text style={styles.authorNameStyle}>{itemData.user_name}</Text>
                    <Text style={styles.authorDescStyle} numberOfLines={2} >　　{itemData.desc}</Text>
                    <Text style={[styles.authorDescStyle,{paddingVertical:0}]}>{itemData.fans_total}关注</Text>
                </Image>
            </View>
        )
    }
}





