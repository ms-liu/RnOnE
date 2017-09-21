/**
 *===========================================
 * Description:TimeUtils 时间处理工具类
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/7
 *===========================================
 */
import LogUtils from "./LogUtils";

export default class TimeUtils{
    static getCurrentTimestamp = ()=>{
        return new Date().getTime();
    };

    static getCurrentDayOfMonth =()=>{
        return new Date().getDate();
    };

    static getCurrentDay = (separate)=>{
        separate = separate?separate:'-';

        return TimeUtils.getCurrentYear()
            +separate
            +(TimeUtils.getCurrentMonth()<10?'0'+TimeUtils.getCurrentMonth():TimeUtils.getCurrentMonth())
            +separate
            +TimeUtils.getCurrentDayOfMonth();
    };
    static getCurrentYear = ()=>{
        return new Date().getFullYear();
    };
    static getCurrentMonth = ()=>{
        return  new Date().getMonth()+1;
    };

    static parserDate = (date)=>{
        date = (date+'').split(' ')[0];
        if ( date.toString() === TimeUtils.getCurrentDay()){
            return '今天';
        }else {
           let dates = date.split('-');
           if (parseInt(dates[0]) === TimeUtils.getCurrentYear()){
               return dates[1]+'月'+dates[2]+'日';
           }else {
               return dates[0]+'年'+dates[1]+'月'+dates[2]+'日';
           }

        }
    }

}