/**
 *===========================================
 * Description:网络请求缓存管理类
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import {
    AsyncStorage,
}from 'react-native';
import storage from 'react-native-simple-store';
import LogUtils from '../util/LogUtils';
import TimeUtils from '../util/TimeUtils';
import {interceptResponse,} from'./HttpConfig'


export default class HttpCacheManager{
    /**
     * 缓存有效时长
     * @type {number}
     */
    MAX_KEEP_ALIVE_TIME = 1000*60*60*30;
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
            if (interceptResponse(value)){ // Confirm current request is valid
                if (this.getCache(key,true)){//check is exist
                    this.updateCache(key,value);//exist=>update value
                }else {
                    storage.save(key,{value:value,date: TimeUtils.getCurrentTimestamp()});//save data to local
                }
            }
            return value;
        }).catch(err=>{
            LogUtils.logMsg(`error:${err}`);
            return Promise.reject(err);
        });
    };

    /**
     * 获取缓存
     * @param key 缓存是的秘钥
     * @param isCheck 是否用于检查有对应key的缓存
     * @returns {Promise.<TResult>}
     */
    getCache = (key,isCheck = false)=>{
       return storage.get(key).then(result=>{
           if (result === null)
               return false;
           if (isCheck)
               return true;
           if (this.checkEfficient(result.date)){
               LogUtils.logMsg('Get data from local storage ,the value  = \r\n'+JSON.stringify(result.value));
               return result.value;
           }else {
               return false;
           }
       });
    };

    /**
     * 检查当前缓存时效性 (半小时内有效)
     * @param time
     * @returns {boolean} True:有效；False:无效
     */
    checkEfficient  = (time)=>{
        return  (TimeUtils.getCurrentTimestamp() - time) < this.MAX_KEEP_ALIVE_TIME;
    };

    /**
     * 删除缓存
     * @param key
     */
    deleteCache = (key)=>{
        storage.delete(key);
    };

    /**
     * 更新缓存
     * @param key
     * @param value
     */
    updateCache = (key,value)=>{
        storage.update(key,{value:value,date: TimeUtils.getCurrentTimestamp()});//update data to local
    }



}