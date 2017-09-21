/**
 *===========================================
 * Description:StyleScheme 项目配色约束表
 *
 * Author:M-Liu
 *
 * CrateDate:2017/9/8
 *===========================================
 */
import {StyleSheet} from 'react-native';

/**
 * 颜色
 * @type {{}}
 */
const colorScheme ={
    hawkesBlue: '#DCDFE3',
    bittersweet: '#FD6F69',
    paleRose: '#EBDEDF',
    monaLisa: '#FB9B9A',

    colorPrimary:'#fff',
    colorAccent:'#FD6F69',


    grey: '#7F7F7F',
    pageBackground: '#F9FAFB',
    textColor:'#616161',
    textColor2:'#7E8C9D',
    lineColor:'#eee',
    tipTextColor:'#9e9e9e',
    tipTextColorHighlight:'#FD7055',
    tabDefaultColor:'#9e9e9e'
};

/**
 * 尺寸
 * @type {{}}
 */
const dimensScheme = {
    appBarHeight:50,
    bottomBarHeight:55,
    matchParent:'100%',
    barTextSize:18,
    commonTextSize:14,
    commonTitleTextSize:22,
    commonTipTextSize:12,

    commonPadding:12,
};

export  default {
    ...colorScheme,
    ...dimensScheme,
}


