/**
 *===========================================
 * Description:网络数据获取
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/5
 *===========================================
 */
import HttpManager from "../http/HttpManager";
import LogUtils from "../util/LogUtils";

export default class Api{
    COMMON_PARAMETER = '?channel=baidu&sign=9e78374433ef3ab2468344bf5b9e9f48&version=4.3.2&uuid=ffffffff-ee5e-7402-2332-1dee62cce3ff&platform=android';
    constructor(){
        this.http = new HttpManager();
    }

    /**
     * 根据月份日期获取 一月中数据列表
     * @param date xxxx-xx ：2017-09
     */
    getDatesOfMonth = (date)=>{
        return this.http.doGet(true)(`feeds/list/${date}${this.COMMON_PARAMETER}`);
    };

    /**
     * 获取每天推荐数据,带上城市可获取到城市当天天气状况
     * @param date xxxx-xx-xx : 2017-09-18
     * @param city 上海
     */
    getDailyRecommend = (date,city)=>{
        city = city?city:0;
        return this.http.doGet(true)(`channel/one/${date}/${city}${this.COMMON_PARAMETER}`);
    };

    /**
     * 获取广告轮播图数据-ALL
     */
    getCarouseData = ()=>{
        return this.http.doGet(true)(`banner/list/3${this.COMMON_PARAMETER}`);
    };

    /**
     * 获取提问数据-ALL
     */
    getQuestionBannerData = ()=>{
        return this.http.doGet(true)(`banner/list/5${this.COMMON_PARAMETER}`);
    };

    /**
     * 获取热门作者数据-ALL
     */
    getHotAuthorData = ()=>{
        return this.http.doGet(true)(`author/hot${this.COMMON_PARAMETER}`);
    };

    /**
     * 获取专题列表数据-ALL
     */
    getTopicData=(lastId)=>{
        return this.http.doGet(true)(`banner/list/4${this.COMMON_PARAMETER}&${lastId?'last_id='+lastId:''}`);
    };

    /**
     * 获取详情页面数据
     * @param id
     */
    getDetailData=(id)=>{
        return this.http.doGet(true)(`essay/htmlcontent/${id}${this.COMMON_PARAMETER}`);
    };

    /**
     * 根据经纬度 获取地理位置
     * @param latitude
     * @param longitude
     */
    getCityNameBy = (latitude,longitude)=>{
        return this.http.doFetch(`http://maps.google.cn/maps/api/geocode/json?latlng=${latitude},${longitude}&language=CN`)
    };

}