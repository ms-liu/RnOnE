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

export default class CommonUtils{
    static getDailyIcon = ()=>{
        switch (TimeUtils.getCurrentDayOfMonth()){
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
    static getActDailyIcon = ()=>{
        switch (TimeUtils.getCurrentDayOfMonth()){
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
    }
}