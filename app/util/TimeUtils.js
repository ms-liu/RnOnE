/**
 *===========================================
 * Description:TimeUtils 时间处理工具类
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/7
 *===========================================
 */

export default class TimeUtils{
    static getCurrentTimestamp = ()=>{
        return new Date().getTime();
    }
}