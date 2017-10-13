/**
 *===========================================
 * Description:网络数据请求管理组件
 *      存在一个比较严重的逻辑BUG ，一个请求被发起，没有终止方法
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
import BaseLoadComponent from "../base/BaseLoadComponent";

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
                      return this.httpCacheManager
                          .saveCache(url,this.doFetch(url,method,body),doCache)
                          .then(defaultHandleResponse);
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
        // LogUtils.logMsg('do get request \r\n url '+url+'\r\n& doCache = '+doCache);
        return this.doRequest(url,'GET',null,doCache);
    };

    /**
     * request by post
     * @url full url
     * @jsonPostData you want post data
     * @doCache true do cache ;false not cache
     * */
    doPostRequest = (url,jsonPostData,doCache = false) =>{
        // LogUtils.logMsg('do post request \r\n url '+url+'\r\n post data = '+jsonPostData+'\r\n& doCache = '+doCache);
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
        // let startTime = TimeUtils.getCurrentTimestamp();
        return fetchFunc().then(result => {
            // LogUtils.logMsg(`${requestInfo} `);
            // \r\nresult = ${JSON.stringify(result)};
            // \r\ntook time = ${ TimeUtils.getCurrentTimestamp() - startTime}ms`);
            return result;
        }).catch(err => {
            LogUtils.logMsg(`${requestInfo} ${err}`);
            return {status:BaseLoadComponent.Error,data:null,msg:'网络链接异常，请检查网络~'};
        })
    };



}