/**
 *===========================================
 * Description:首页每天推荐页
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
    Image, TouchableHighlight
} from 'react-native';
import RefreshFlatList from "../widget/RefreshFlatList";
import StyleScheme from "../../res/value/StyleScheme";
import BaseRefreshComponent from "../widget/BaseRefreshComponent";
import TimeUtils from "../../util/TimeUtils";
import CommonUtils from "../../util/CommonUtils";
import LogUtils from "../../util/LogUtils";
import Toast from "../widget/Toast";
import BaseLoadComponent from "../../base/BaseLoadComponent";
import TouchView from "../widget/TouchView";

const styles = StyleSheet.create({
    flatContainerStyle:{
        flex:1,
    },
    flatListStyle:{
        // flex:1,
        alignSelf:'flex-start',
        width:'100%',
        flexShrink:0,
    },
    itemStyle:{
        alignSelf:'center',
        backgroundColor:StyleScheme.colorPrimary,
        borderColor:StyleScheme.lineColor,
        borderWidth:0.5,
        borderRadius:8,
        width:"95%",
        marginVertical:5,

    },
    itemAuthorStyle:{
        paddingVertical:StyleScheme.commonPadding,
        alignSelf:'center',
        color:StyleScheme.tipTextColor,
        fontSize:StyleScheme.commonTextSize,
    },
    itemContentStyle:{
        alignSelf:'center',
        color:StyleScheme.textColor,
        fontSize:StyleScheme.commonTextSize,
    },

    itemTitleStyle:{
        color:StyleScheme.textColor,
        fontSize:StyleScheme.commonTitleTextSize,
    },
    itemTipStyle:{
        color:StyleScheme.tipTextColor,
        fontSize:StyleScheme.commonTipTextSize,
    },
    itemCoverImageStyle:{
        flex:1,
        width:'100%',
        height:450,
    },
     itemImageStyle:{
         flex:1,
         width:'100%',
         height:200,
         justifyContent:'center',
         flexDirection:'row',
    },
    itemMusicStyle:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:StyleScheme.commonPadding,
        borderTopColor:StyleScheme.lineColor,
        borderTopWidth:1,
    },
    itemMusicAuthorStyle:{
        color:StyleScheme.textColor2,
        fontSize:StyleScheme.commonTipTextSize,
    },
    itemMusicCoverStyle:{

        width:200,
        height:200,
        borderRadius:100,
    }




});

export default class DailyPage extends BaseRefreshComponent{
    static propety = {
        changeNavigator:React.PropTypes.func,
    };
    constructor(props){
        super(props);
    }

    componentWillMount(){
        super.componentWillMount();
    }

    renderEmptyView(){
        return(<Text>暂无数据</Text>)
    }
    itemSeparatorComponent() {
        return(<View style={{height:0,backgroundColor:'transparent'}}/>);
    }

    doLoadMoreData() {
        this.setState({viewStatus:RefreshFlatList.LOADING_MORE});
    }

    doRefreshData() {
        this.mApi.getDailyRecommend('2017-09-20','上海').then(result=>{
            this.changeNavigator(
                result.data.weather.city_name
                +"　"+result.data.weather.climate
                +"　"+result.data.weather.temperature+"℃");
            switch (result.status){
                case BaseLoadComponent.Success:
                    //todo 会多添加一行
                    // result.data.content_list.splice(1,0,result.data.menu);
                    this.setState({data:result.data.content_list,menuData:null,viewStatus:RefreshFlatList.END_REQUEST});
                    break;
                case BaseLoadComponent.Empty:
                    this.setState({viewStatus:RefreshFlatList.EMPTY_DATA});
                    break;
                default:

                    break;
            }
        });
    }


    changeNavigator(info){
        this.props.changeNavigator(info,CommonUtils.getDailyIcon())
    }

    bindItemViewModel(item,index) {
        if (index === 1 && item.list){
            return this.renderListMenuView(item);
        }else {
            /**
             * category 0 图文 1 阅读 2 连载 3 问答 4 音乐 5 影视 6广告 7? 8 电台
             */
            switch (item.category){
                case '0'://图文
                    return this.renderBookView(item);
                case '4'://音乐
                    return this.renderMusicView(item);
                case '5'://影视
                    return this.renderMovieView(item);
                case '8'://电台
                    return this.renderRadioView(item);
                case '6'://广告
                    return<Text>广告</Text>
                case '1'://阅读
                case '2'://连载
                case '3'://问答
                default:
                    return this.renderDefaultView(item);
            }
        }
    }

    renderListMenuView(item) {
        const _this = this;
        const {
            menuData
        } = this.state;

        return(
            <View style={styles.itemStyle}>
                <TouchView onPress={
                    ()=>{
                        menuData?_this.setState({menuData:null}):_this.setState({menuData:item})
                    }
                } >
                    <View style={[{flexDirection:'row',justifyContent:'center',width:'100%',alignItems:'center'}]} >
                        <Text style={styles.itemAuthorStyle}>NewP | VOL.{item.vol}</Text>
                        <Image style={[{width:15,height:15,marginLeft:5}]}
                               source={
                                   menuData?require('../../res/image/arrow_up_black.png'):require('../../res/image/arrow_down_black.png')
                               }
                        />
                    </View>
                </TouchView>
                <View>
                    <FlatList
                        data={menuData?menuData.list:menuData}
                        keyExtractor={(item, index) =>index}
                        renderItem={({item,index})=>{
                            let title = '';
                            switch (item.content_type){
                                case '0'://图文
                                    title =  item.tag?item.tag.title:'图文';
                                    break;
                                case '4'://音乐
                                    title =  item.tag?item.tag.title:'音乐';
                                    break;
                                case '5'://影视
                                    title =  item.tag?item.tag.title:'影视';
                                    break;
                                case '8'://电台
                                    title =  item.tag?item.tag.title:'电台';
                                    break;
                                case '1'://阅读
                                case '2':
                                case '3':
                                default:
                                    title =  item.tag?item.tag.title:'阅读';
                                    title =  item.serial_list?'连载':title;
                                    break;
                            }
                            return(
                                <View style={[{flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',padding:12}]}>
                                    <Image style={[{width:15,height:15,marginHorizontal:12}]} source={require('../../res/image/arrow_right.png')}/>
                                    <View>
                                        <Text>{title}</Text>
                                        <Text>{item.title}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    renderBookView(item) {
        return (
            <View style={styles.itemStyle}>
                <Image
                    style={styles.itemCoverImageStyle}
                    resizeMode={'cover'}
                    source={{uri:item.img_url}}  />
                <Text style={styles.itemAuthorStyle}>{item.title+' | '+item.pic_info}</Text>
                <Text style={[styles.itemContentStyle,{paddingHorizontal:34,lineHeight:28}]}>{item.forward}</Text>
                <Text style={[styles.itemAuthorStyle,{padding:24}]}>{item.words_info}</Text>
                <View
                    style={[{
                        padding:StyleScheme.commonPadding<<1,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'flex-start',
                    }]}
                >
                    <View    style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{width:20,height:20,marginRight:5}]} source={require('../../res/image/bubble_diary.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>小记</Text>
                    </View>
                    <View  style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                    </View>
                </View>
            </View>
        );
    }

    renderMusicView(item) {
        return(
            <View style={[styles.itemStyle,{paddingHorizontal:24}]}>
                <Text style={styles.itemAuthorStyle}>- {item.tag_list.length>0?item.tag_list[0].title:'音乐'} -</Text>
                <Text style={styles.itemTitleStyle}>{item.title}</Text>
                <Text style={[styles.itemAuthorStyle,{alignSelf:'flex-start'}]}>{'文 / '+item.author.user_name}</Text>

                <View style={styles.itemMusicStyle}>
                    <Image
                        style={styles.itemMusicCoverStyle}
                        resizeMode={'cover'}
                        source={{uri:item.img_url}}  />
                    <Image  style={[{position:'absolute',left:'44%',bottom:'44%',width:40,height:40,}]}
                            source={require('../../res/image/play.png')}/>
                    <Image  style={[{position:'absolute',left:0,bottom:StyleScheme.commonPadding,width:30,height:30}]}
                            source={require('../../res/image/music_act.png')}/>
                </View>
                <Text style={styles.itemMusicAuthorStyle}>{item.music_name} · {item.audio_author} | {item.audio_album}</Text>
                <Text style={[styles.itemAuthorStyle,{lineHeight:28,alignSelf:'flex-start'}]}>{item.forward}</Text>
                <View
                    style={[{
                        paddingVertical:StyleScheme.commonPadding,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'flex-start',
                    }]}
                >
                    <View    style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{TimeUtils.parserDate(item.post_date)}</Text>
                    </View>
                    <View  style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                    </View>
                </View>
            </View>
        );
    }

    renderMovieView(item) {
        return(
            <View style={[styles.itemStyle,{paddingHorizontal:24}]}>
                <Text style={styles.itemAuthorStyle}>- {item.tag_list.length>0?item.tag_list[0].title:'影视'} -</Text>
                <Text style={styles.itemTitleStyle}>{item.title}</Text>
                <Text style={[styles.itemAuthorStyle,{alignSelf:'flex-start'}]}>{'文 / '+item.author.user_name}</Text>
                <Image
                    style={styles.itemImageStyle}
                    resizeMode={'cover'}
                    source={{uri:item.img_url}} />
                <Text style={[styles.itemAuthorStyle,{lineHeight:28,alignSelf:'flex-start'}]}>{item.forward}</Text>
                <Text style={[styles.itemAuthorStyle,{lineHeight:28,alignSelf:'flex-end',paddingBottom:12}]}>——《{item.subtitle}》</Text>
                <View
                    style={[{
                        paddingVertical:StyleScheme.commonPadding,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'flex-start',
                    }]}
                >
                    <View    style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{TimeUtils.parserDate(item.post_date)}</Text>
                    </View>
                    <View  style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                    </View>
                </View>
            </View>
        );
    }

    renderRadioView(item) {
        return(
            <View style={[styles.itemStyle,]}>
                <Image
                    style={[styles.itemImageStyle,{height:250}]}
                    resizeMode={'cover'}
                    source={{uri:item.img_url}} >
                    {
                        item.author.user_name?this.renderRadioLastDay(item):this.renderRadioCurrentDay(item)
                    }
                </Image>
            </View>
        );
    }

    renderDefaultView(item) {
        let title = '';
        let userName = '';
        if (item.category === '1'){
            title = item.tag_list.length>0?item.tag_list[0].title:'阅读';
        }else if (item.category === '2'){
            title = item.tag_list.length>0?item.tag_list[0].title:'连载';
        }else if (item.category === '3'){
            title = item.tag_list.length>0?item.tag_list[0].title:'问答';
        }else {
            title = '';
        }
        userName = item.author?item.author.user_name:'作者';
        return(
            <View style={[styles.itemStyle,{paddingHorizontal:24}]}>
                <Text style={styles.itemAuthorStyle}>- {title} -</Text>
                <Text style={styles.itemTitleStyle}>{item.title}</Text>
                <Text style={[styles.itemAuthorStyle,{alignSelf:'flex-start'}]}>{item.answerer?item.answerer.user_name+'答':'文 / '+userName}</Text>
                <Image
                    style={styles.itemImageStyle}
                    resizeMode={'cover'}
                    source={{uri:item.img_url}}  />
                <Text style={[styles.itemAuthorStyle,{lineHeight:28,alignSelf:'flex-start'}]}>{item.forward}</Text>
                <View
                    style={[{
                        paddingVertical:StyleScheme.commonPadding,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'flex-start',
                    }]}
                >
                    <View    style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{TimeUtils.parserDate(item.post_date)}</Text>
                    </View>
                    <View  style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                    </View>
                </View>
            </View>
        );
    }

    renderRadioLastDay() {

        return (<View style={[{
            backgroundColor:'#0008',
            width:'100%',
            height:'100%',
            flexDirection:'column',
            justifyContent:'flex-end',
        }]}>
            <Image style={[{width:40,height:40,position:'absolute',top:24,left:24}]}
                   source={require('../../res/image/fm_logo_white.png')}/>
            <View
                style={[{
                    alignSelf:'flex-end',
                    width:'100%',
                    borderBottomColor:StyleScheme.tipTextColor,
                    borderBottomWidth:0.5,
                    flexDirection:'row',
                    paddingHorizontal:24,
                    paddingVertical:StyleScheme.commonPadding,
                    justifyContent:'center',
                    alignItems:'center'
                }]}
            >
                <Image style={[{width:30,height:30}]} source={require('../../res/image/feeds_radio_play.png')}/>
                <View
                    style={[{
                        paddingHorizontal:StyleScheme.commonPadding,
                        flexDirection:'column',
                        width:'100%',
                        justifyContent:'flex-start',
                    }]}>
                    <Text
                        numberOfLines={1}
                        style={[{
                            color:StyleScheme.colorPrimary,
                            width:'95%',
                            fontSize:StyleScheme.commonTextSize,
                        }]}>
                        {item.volume}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[{
                            fontSize:20,
                            width:'95%',
                            color:StyleScheme.colorPrimary,
                        }]}>
                        {item.title}
                    </Text>
                </View>
            </View>
            <View
                style={[{
                    paddingVertical:StyleScheme.commonPadding,
                    paddingHorizontal:StyleScheme.commonPadding<<1,
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                }]}
            >
                <View    style={[{
                    flexDirection:'row',
                    alignItems:'center',

                }]}>
                    <Image style={[{width:25,height:25,borderRadius:12.5,marginRight:5}]} source={{uri:item.author.web_url}}/>
                    <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.author.user_name}</Text>
                </View>
                <View  style={[{
                    flexDirection:'row',
                    alignItems:'flex-start',
                }]}>
                    <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                    <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                    <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                </View>
            </View>
        </View>);
    }

    renderRadioCurrentDay(item) {
        return (
            <View
                style={[{
                    alignSelf:'flex-end',
                    width:'100%',
                    borderBottomColor:StyleScheme.tipTextColor,
                    borderBottomWidth:0.5,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }]}
            >
                <Text style={[{
                    width:'100%',
                    borderBottomColor:StyleScheme.tipTextColor,
                    borderBottomWidth:0.5,
                    color:StyleScheme.tipTextColor,
                    paddingBottom:12,
                    textAlign:'center'
                }]}>{item.title}</Text>

                <View
                    style={[{
                        paddingVertical:StyleScheme.commonPadding,
                        paddingHorizontal:StyleScheme.commonPadding<<1,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                    }]}
                >
                    <View    style={[{
                        flexDirection:'row',
                        alignItems:'center',

                    }]}>
                        <Image style={[{width:25,height:25,borderRadius:12.5,marginRight:5}]} source={{uri:item.author.web_url}}/>
                    </View>
                    <View  style={[{
                        flexDirection:'row',
                        alignItems:'flex-start',
                    }]}>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginHorizontal:5}]} source={require('../../res/image/bubble_like.png')}/>
                        <Text style={[{color:StyleScheme.tipTextColor,fontSize:StyleScheme.commonTextSize}]}>{item.like_count}</Text>
                        <Image style={[{alignSelf:'flex-end',width:20,height:20,marginLeft:12}]} source={require('../../res/image/bubble_share.png')}/>
                    </View>
                </View>
            </View>
        );
    }
}





