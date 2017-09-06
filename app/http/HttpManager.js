/**
 *===========================================
 * Description:网络数据请求组件
 *
 * Author:M-Liu
 *
 * Time:2017/9/4
 *===========================================
 */
import LogUtils from "../util/LogUtils";
import HttpCacheManager from "./HttpCache";
import {BASE_URL,CACHE_TOGGLE,convertResponse,defaultHandleResponse}from'./HttpConfig';
import React, { Component } from 'react';

export default class HttpManager extends Component{

    /**
     * Constructor
     *  1、create LogUtils
     *  2、create HttpCacheManager
     * */
    constructor(){
        super();
        this.httpCacheManager = new HttpCacheManager();
    }

    /**
     *  request by get
     *  @url full url
     *  @doCache true do cache ;false not cache
     * */
    doGetRequest =(url,doCache = true)=>{
        const fetchFunc = ()=> {
            return fetch(url,{
                method:'GET',
                headers:{
                    Accept:'*/*',
                    'Content-Type':'application/json'
                }
            }).then(convertResponse)
        };
        return this.httpCacheManager.saveCache(url,fetchFunc(),doCache).then(defaultHandleResponse);
    };

    /**
     * request by post
     * @url full url
     * @jsonPostData you want post data
     * @doCache true do cache ;false not cache
     * */
    doPostRequest = (url,jsonPostData,doCache = true) =>{
        LogUtils.errorMsg('do post request \r\n url '+url+'\r\n post data = '+jsonPostData+'\r\n& doCache = '+doCache);
        const fetchFunc = ()=>{
            return fetch({
                method:'POST',
                headers:{
                    Accept:'*/*',
                    'Content-Type':'application/json'
                },
                body:jsonPostData
            }).then(convertResponse);
        };
        return this.httpCacheManager.saveCache(url,fetchFunc(),doCache).then(defaultHandleResponse);
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

    getDataCacheToLocal = this.doGet(true);
    getDataNoCahe = this.doGet(false);

    postDataCacheToLocal = this.doPost(true);
    postDataNoCache = this.doPost(false);

    /**
     * print data and cost time
     * @param requestInfo
     */
    printRequest = requestInfo => fetchFunc =>{
        let startTime = new Date().getTime();
        return fetchFunc().then(result => {
            LogUtils.logMsg(`${requestInfo} : 
            \r\nresult = ${JSON.stringify(result)};
            \r\ntook time = ${new Date().getTime() - startTime}ms`);
            return result;
        }).catch(err => {
            LogUtils.logMsg(`${requestInfo} ${err}`);
            return Promise.reject(err);
        })
    };



}