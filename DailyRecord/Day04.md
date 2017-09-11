# Day04——【2017-09-07】
### 任务
    1、完善HtppCache缓存功能
    2、完成HttpManage网络请求功能

### HttpCache
- 增加获取缓存功能
- 增加删除缓存功能
- 增加更新缓存功能
- 增加检查时效性功能

```
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
```

### HttpManager
- 拆分合并get和post请求
- 进一步封装Fetch请求

```
/**
 *===========================================
 * Description:网络数据请求管理组件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import LogUtils from "../util/LogUtils";
import TimeUtils from '../util/TimeUtils';
import HttpCacheManager from "./HttpCache";
import {BASE_URL,CACHE_TOGGLE,convertResponse,defaultHandleResponse}from'./HttpConfig';
import React, { Component } from 'react';

export default class HttpManager extends Component{

    /**
     * Constructor
     *  1、create HttpCacheManager
     * */
    constructor(){
        super();
        this.httpCacheManager = new HttpCacheManager();
    }
    /**
     * Encapsulate Fetch
     * @param url full url
     * @param method request type => 'GET' or 'POST'
     * @param body request body => just for POST method
     * */
    doFetch = (url,method,body = null)=>{
        const data = {
            method:method,
            headers:{
                Accept:'*/*',
                'Content-Type':'application/json',
                body:body,
            },
        };
       return fetch(url,data).then(convertResponse);
    };

    /**
     * do net request
     * @param url full url
     * @param method request type => 'GET' or 'POST'
     * @param body request body => just for POST
     * @param doCache is need cache
     * @returns {*}
     */
    doRequest = (url,method,body=null,doCache = true)=>{
        if (doCache){
            const  result = this.httpCacheManager.getCache(url);
            return  result.then(re=>{
                  if (re){
                      LogUtils.logMsg('get data from cache ');
                      return result.then(defaultHandleResponse);
                  }else {
                      LogUtils.logMsg('save cache ');
                      return this.httpCacheManager.saveCache(url,this.doFetch(url,method,body),doCache).then(defaultHandleResponse);
                  }
            });
        }else {
            return this.doFetch(url,method,body).then(defaultHandleResponse);
        }
    };

    /**
     *  request by get
     *  @url full url
     *  @doCache true do cache ;false not cache
     * */
    doGetRequest =(url,doCache = true)=>{
        LogUtils.logMsg('do get request \r\n url '+url+'\r\n& doCache = '+doCache);
        return this.doRequest(url,'GET',null,doCache);
    };

    /**
     * request by post
     * @url full url
     * @jsonPostData you want post data
     * @doCache true do cache ;false not cache
     * */
    doPostRequest = (url,jsonPostData,doCache = false) =>{
        LogUtils.logMsg('do post request \r\n url '+url+'\r\n post data = '+jsonPostData+'\r\n& doCache = '+doCache);
        return this.doRequest(url,'POST',jsonPostData,doCache);
    };

    /**
     *  parser param for get request
     * @param data Object to data
     * @returns {string} params string like '&username=Jack&age=25'
     */
    parserParam = data=>{
        return Object.entries(data).map(([key,value]) => {
            return `${key}=${value}`;
        }).join('&');
    };

    /**
     * encapsulate for doGetRequest
     * @link #doGetRequest
     * @param needCache
     */
    doGet = needCache => (relativePath,data)=>{
        let url = `${BASE_URL}${relativePath}`;
        if(data){
            url.append(`?${this.parserParam(data)}`)
        }
        return this.printRequest(`GET ${url}`)(()=>{
           return this.doGetRequest(url,needCache);
        });
    };

    /**
     * encapsulate for doPostRequest
     * @link #doPostRequest
     * @param needCache
     */
    doPost = needCache => (path,data) => {
        let jsonData = JSON.stringify(data);
        let url = `${BASE_URL}${path}`;
        return this.printRequest(`POST ${url}`)(() => {
            return this.doPostRequest(url,jsonData,needCache);
        })
    };

    /**
     * print data and cost time
     * @param requestInfo
     */
    printRequest = requestInfo => fetchFunc =>{
        let startTime = TimeUtils.getCurrentTimestamp();
        return fetchFunc().then(result => {
            LogUtils.logMsg(`${requestInfo} :
            \r\nresult = ${JSON.stringify(result)};
            \r\ntook time = ${ TimeUtils.getCurrentTimestamp() - startTime}ms`);
            return result;
        }).catch(err => {
            LogUtils.logMsg(`${requestInfo} ${err}`);
            return Promise.reject(err);
        })
    };
}
```