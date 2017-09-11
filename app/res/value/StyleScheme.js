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
    textColor:'#000',
    textColor2:'#7E8C9D',
    lineColor:'#E2EAF2',
    tipTextColor:'#B5B5B5',
    tipTextColorHighlight:'#FD7055'
};

/**
 * 尺寸
 * @type {{}}
 */
const dimensScheme = {
    appBarHeight:55,
    matchParent:'100%',
};

export  default {
    ...colorScheme,
    ...dimensScheme,
}


