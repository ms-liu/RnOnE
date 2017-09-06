/**
 *===========================================
 * Description:网络请求缓存类
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import {
    AsyncStorage,
}from 'react-native';
import storage from 'react-native-store';
import LogUtils from '../util/LogUtils';


export default class HttpCacheManager{
    /**
     *
     * @param key 缓存秘钥
     * @param fetchFunc 网络获取Func
     * @param doCache 是否开启缓存
     * @returns {*} 网络请求结果
     */
    saveCache = (key,fetchFunc,doCache= true)=>{
        if (!doCache){
            LogUtils.logMsg('you had closed log info for this url '+key);
            return fetchFunc;
        }
        return fetchFunc.then(value=>{
            LogUtils.logMsg('get data from storage —— key = '+key);
            storage.save(key,value);//save data to local
            return value;
        })
    }
}