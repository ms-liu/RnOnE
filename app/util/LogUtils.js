export default class LogUtils {

    static NOTHING = 0;
    static INFO = 1;
    static ERROR = 2;
    static log_lever = LogUtils.INFO;//you can change this value to change print lever
    static logMsg = msg =>{
        switch (LogUtils.log_lever){
            case LogUtils.ERROR:
                console.error("RnOnE:"+msg+LogUtils.ERROR);
                break;
            case LogUtils.INFO:
                console.log("RnOnE:"+msg);
                break;
            case LogUtils.NOTHING:
            default:
               //do nothing
                break;
        }
    };
   static errorMsg = msg =>{
        if (LogUtils.log_lever !== LogUtils.NOTHING){
            console.log('RnOnE:'+msg);
        }
    }
}

