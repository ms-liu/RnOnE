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

    getDatesOfMonth = (date)=>{
        return this.http.doGet(true)(`feeds/list/${date}${this.COMMON_PARAMETER}`);
    };

    getDailyRecommend = (date,city)=>{
        city = city?city:0;
        return this.http.doGet(true)(`channel/one/${date}/${city}${this.COMMON_PARAMETER}`);
    };

    getCityNameBy = (latitude,longitude)=>{
        return this.http.doFetch(`http://maps.google.cn/maps/api/geocode/json?latlng=${latitude},${longitude}&language=CN`)
    }

}