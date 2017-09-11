/**
 *===========================================
 * Description:网络请求配置文件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import LogUtils from "../util/LogUtils";

export const CACHE_TOGGLE = true;
export const BASE_URL = 'http://v3.wufazhuce.com:8000/api/';

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
    if (response.res === 0) {
        return response.data;
    } else {
        LogUtils.logMsg(response.msg);
        throw response.msg;
    }
};
