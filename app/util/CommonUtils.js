/**
 *===========================================
 * Description:CommonUtils 常用工具类
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/7
 *===========================================
 */

import {
    Platform,
}from 'react-native'
import TimeUtils from "./TimeUtils";
import LogUtils from "./LogUtils";
import StringValue from "../res/value/StringValue";

export default class CommonUtils{
    static checkAndroid(){
        return Platform.OS === 'android';
    }
    static checkIOS(){
        return Platform.OS === 'ios';
    }
    static checkWeb(){
        return Platform.OS === 'web';
    }

    static checkFunction(func){
        return typeof func === 'function';
    }
    static checkArray(arr){
        return Object.prototype.toString.call(arr) ==='[object Array]';
    }

    static replaceSeparate(src,srcSeparate,desSeparate){
        srcSeparate = srcSeparate ?srcSeparate:'-';
        desSeparate = desSeparate?desSeparate:' / ';
        return src.replace(new RegExp(srcSeparate,'g'),desSeparate);
    };

    static replaceByRegPattern(srcStr,pattern,desElement){
        let match = srcStr.toString().match(pattern);
        // LogUtils.logMsg('=match=='+match);
        return srcStr.replace(match,desElement);
    }

    static randomNum(min,max){
        return min + Math.round(Math.random()*(max-min));
    }

    static getNoMoreDataTip(){
        return StringValue.noMore[CommonUtils.randomNum(0,StringValue.noMore.length -1)]
    }

    static getLoadingConflictTip(){
        return StringValue.loadingConflictTip[CommonUtils.randomNum(0,StringValue.loadingConflictTip.length-1)]
    }

    static getEmptyDataTip(){
       return StringValue.empty[CommonUtils.randomNum(0,(StringValue.empty.length -1))]
    }

    static getNetErrorTip(){
        return StringValue.loadError[CommonUtils.randomNum(0,(StringValue.loadError.length -1))]
    }

    static joinClickJavaScript(btnNames,className,postMessage){
        return `
            var ${btnNames} = document.getElementsByClassName('${className}');
            if (${btnNames} && ${btnNames}.length>0) {
                var btn = ${btnNames}[0];
                btn.onclick=function(){
                    if (this.className.indexOf('disable')<0) {
                        window.postMessage(JSON.stringify(${JSON.stringify(postMessage)}))
                    }
                }
            }
        `;
    }

    static getDailyIcon = (date,separate)=>{
        let index = date?date.split(separate?separate:'-')[2]:TimeUtils.getCurrentDayOfMonth();
        switch (parseInt(index)){
            case 1:
                return require('../res/image/daily/day1.png');
            case 2:
                return require('../res/image/daily/day2.png');
            case 3:
                return require('../res/image/daily/day3.png');
            case 4:
                return require('../res/image/daily/day4.png');
            case 5:
                return require('../res/image/daily/day5.png');
            case 6:
                return require('../res/image/daily/day6.png');
            case 7:
                return require('../res/image/daily/day7.png');
            case 8:
                return require('../res/image/daily/day8.png');
            case 9:
                return require('../res/image/daily/day9.png');
            case 10:
                return require('../res/image/daily/day10.png');
            case 11:
                return require('../res/image/daily/day11.png');
            case 12:
                return require('../res/image/daily/day12.png');
            case 13:
                return require('../res/image/daily/day13.png');
            case 14:
                return require('../res/image/daily/day14.png');
            case 15:
                return require('../res/image/daily/day15.png');
            case 16:
                return require('../res/image/daily/day16.png');
            case 17:
                return require('../res/image/daily/day17.png');
            case 18:
                return require('../res/image/daily/day18.png');
            case 19:
                return require('../res/image/daily/day19.png');
            case 20:
                return require('../res/image/daily/day20.png');
            case 21:
                return require('../res/image/daily/day21.png');
            case 22:
                return require('../res/image/daily/day22.png');
            case 23:
                return require('../res/image/daily/day23.png');
            case 24:
                return require('../res/image/daily/day24.png');
            case 25:
                return require('../res/image/daily/day25.png');
            case 26:
                return require('../res/image/daily/day26.png');
            case 27:
                return require('../res/image/daily/day27.png');
            case 28:
                return require('../res/image/daily/day28.png');
            case 29:
                return require('../res/image/daily/day29.png');
            case 30:
                return require('../res/image/daily/day30.png');
            case 31:
                return require('../res/image/daily/day31.png');
            default:
                return require('../res/image/daily/dayDefault.png');
        }
    };
    static getActDailyIcon = (date,separate)=>{
        let index = date?date.split(separate?separate:'-')[2]:TimeUtils.getCurrentDayOfMonth();
        switch (index){
            case 1:
                return require('../res/image/daily/day1_act.png');
            case 2:
                return require('../res/image/daily/day2_act.png');
            case 3:
                return require('../res/image/daily/day3_act.png');
            case 4:
                return require('../res/image/daily/day4_act.png');
            case 5:
                return require('../res/image/daily/day5_act.png');
            case 6:
                return require('../res/image/daily/day6_act.png');
            case 7:
                return require('../res/image/daily/day7_act.png');
            case 8:
                return require('../res/image/daily/day8_act.png');
            case 9:
                return require('../res/image/daily/day9_act.png');
            case 10:
                return require('../res/image/daily/day10_act.png');
            case 11:
                return require('../res/image/daily/day11_act.png');
            case 12:
                return require('../res/image/daily/day12_act.png');
            case 13:
                return require('../res/image/daily/day13_act.png');
            case 14:
                return require('../res/image/daily/day14_act.png');
            case 15:
                return require('../res/image/daily/day15_act.png');
            case 16:
                return require('../res/image/daily/day16_act.png');
            case 17:
                return require('../res/image/daily/day17_act.png');
            case 18:
                return require('../res/image/daily/day18_act.png');
            case 19:
                return require('../res/image/daily/day19_act.png');
            case 20:
                return require('../res/image/daily/day20_act.png');
            case 21:
                return require('../res/image/daily/day21_act.png');
            case 22:
                return require('../res/image/daily/day22_act.png');
            case 23:
                return require('../res/image/daily/day23_act.png');
            case 24:
                return require('../res/image/daily/day24_act.png');
            case 25:
                return require('../res/image/daily/day25_act.png');
            case 26:
                return require('../res/image/daily/day26_act.png');
            case 27:
                return require('../res/image/daily/day27_act.png');
            case 28:
                return require('../res/image/daily/day28_act.png');
            case 29:
                return require('../res/image/daily/day29_act.png');
            case 30:
                return require('../res/image/daily/day30_act.png');
            case 31:
                return require('../res/image/daily/day31_act.png');
            default:
                return require('../res/image/daily/dayDefault_act.png');
        }
    };

}