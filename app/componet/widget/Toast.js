/**
 *===========================================
 * Description:Toast
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/13
 *
 * Email:ms_liu163@163.com
 *===========================================
 */

import toast from '@remobile/react-native-toast';
import {Platform,ToastAndroid} from'react-native';
import CommonUtils from "../../util/CommonUtils";

export default class Toast {
    static show(message){
        if (CommonUtils.checkAndroid()){
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }else if (CommonUtils.checkIOS()){
            toast.showShortBottom(message);
        }else {
            //todo
            alert(message);
        }

    }

    static showLong(message) {
        if (CommonUtils.checkAndroid()){
            ToastAndroid.show(message, ToastAndroid.LONG);
        }else if (CommonUtils.checkIOS()){
            toast.showLongBottom(message);
        }else {
            //todo
            alert(message);
        }
    }
}