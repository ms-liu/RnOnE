/**
 *===========================================
 * Description:网络请求配置文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import BaseLoadComponent from "../base/BaseLoadComponent";

export const CACHE_TOGGLE = true;
export const BASE_URL = 'http://v3.wufazhuce.com:8000/api/';
/**
 * 缓存有效时长
 * max efficient time
 * @type {number}
 */
export const MAX_KEEP_ALIVE_TIME = 1000*60*3;

/**
 * covert response
 * */
export const convertResponse = response => {
    return response.json();
};

/**
 * intercept response before save to local
 * @param response
 */
export const interceptResponse = response => {
    if (response.res === 0){
        return true;
    }else {
        return false;
    }
};

/**
 * default proxy handle response
 * @param response
 */
export const defaultHandleResponse = response => {
    const result = {status:0,data:null,msg:''};
    if (response.res === 0) {
        result.data = response.data;
        if (response.data === null || !response.data || result.data.length <=0){
            result.status = BaseLoadComponent.Empty;
            result.msg = '暂无数据';
        }else {
            result.status = BaseLoadComponent.Success;
            result.msg = '成功';
        }
    } else {
        result.status = BaseLoadComponent.Error;
        result.data = null;
        result.msg = `网络错误${response.msg}`;
    }
    return result;
};
