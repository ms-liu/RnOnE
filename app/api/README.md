# api 说明
### 默认携带参数
```
?channel=baidu&sign=9e78374433ef3ab2468344bf5b9e9f48&version=4.3.2&uuid=ffffffff-ee5e-7402-2332-1dee62cce3ff&platform=android
```
- channel:APK下载渠道名称
- sign:签名信息
- uuid:设备编号
- platform：设备平台类型 android/ios/web
### 域名
```
http://v3.wufazhuce.com:8000/api/
```
### API获取地址
```
/api
```
### 日历
```
/feeds/list/参数
```
- 参数：月份日期
- 例：_**/feeds/list/2017-09**_
```
{
res: 0,
data: [
    {
        id: 13217,
        date: "2017-09-05",
        cover: "http://image.wufazhuce.com/FkKj9g840EF2WTwHIFmXeodnb7N8"
    },
    {
        id: 13148,
        date: "2017-09-04",
        cover: "http://image.wufazhuce.com/FrDZZC-3o3SZowxiNhaP1wc0N1A1"
    },
    {
        id: 13146,
        date: "2017-09-03",
        cover: "http://image.wufazhuce.com/FtlVNZSN1ROiGLnD4zdSGAWDtbHc"
    },
    {
        id: 13144,
        date: "2017-09-02",
        cover: "http://image.wufazhuce.com/FtCjSX944FE3I62c-sR0UwkfRcOw"
    },
    {
        id: 13142,
        date: "2017-09-01",
        cover: "http://image.wufazhuce.com/Fop7r5O5t8HwzewNlBob6sRaXp0x"
    }
    ]
}
```
### 获取推荐数据
```
/channel/one/参数/0
```
- 参数：日历日期->2017-09-05
- 例：/channel/one/2017-09-05/0
```
{
    res: 0,
    data: {
        id: "4443",
        weather: {
        city_name: "地球",
        date: "2017-09-05",
        temperature: "-275",
        humidity: "120",
        climate: "对流层",
        wind_direction: "一阵妖风",
        hurricane: "36级",
        icons: {
        day: "weather_icon_unknown",
        night: "weather_icon_unknown_night"
        }
        },
        date: "2017-09-05 06:00:00",
        content_list: [
            {
                id: "13217",
                category: "0",
                display_category: 6,
                item_id: "1824",
                title: "摄影",
                forward: "美德很难鉴定，而且即便存在也是一次性的，所以如果最后对人喜欢的标准降低到了“长得好看”，那是明智的。",
                img_url: "http://image.wufazhuce.com/FkKj9g840EF2WTwHIFmXeodnb7N8",
                like_count: 3773,
                post_date: "2017-09-05 06:00:00",
                last_update_date: "2017-09-04 10:45:24",
                author: { },
                video_url: "",
                audio_url: "",
                audio_platform: 2,
                start_video: "",
                has_reading: 0,
                volume: "VOL.1795",
                pic_info: "Igor Rand",
                words_info: "三三",
                subtitle: "",
                number: 0,
                serial_id: 0,
                serial_list: [ ],
                movie_story_id: 0,
                ad_id: 0,
                ad_type: 0,
                ad_pvurl: "",
                ad_linkurl: "",
                ad_makettime: "",
                ad_closetime: "",
                ad_share_cnt: "",
                ad_pvurl_vendor: "",
                content_id: "1824",
                content_type: "0",
                content_bgcolor: "#FFFFFF",
                share_url: "http://m.wufazhuce.com/one/1824",
                share_info: {
                    url: "http://m.wufazhuce.com/one/1824",
                    image: "http://image.wufazhuce.com/FkKj9g840EF2WTwHIFmXeodnb7N8",
                    title: "VOL.1795",
                    content: "美德很难鉴定，而且即便存在也是一次性的，所以如果最后对人喜欢的标准降低到了“长得好看”，那是明智的。"
                },
                share_list: {
                    wx: {
                        title: "",
                        desc: "",
                        link: "http://m.wufazhuce.com/one/1824?channel=singlemessage",
                        imgUrl: "",
                        audio: ""
                    },
                    wx_timeline: {
                        title: "",
                        desc: "",
                        link: "http://m.wufazhuce.com/one/1824?channel=timeline",
                        imgUrl: "",
                        audio: ""
                    },
                    weibo: {
                        title: "ONE一个 美德很难鉴定，而且即便存在也是一次性的，所以如果最后对人喜欢的标准降低到了“长得好看”，那是明智的。——三三 下载ONE一个APP:http://weibo.com/p/100404157874",
                        desc: "",
                        link: "http://m.wufazhuce.com/one/1824?channel=weibo",
                        imgUrl: "",
                        audio: ""
                    },
                    qq: {
                        title: "",
                        desc: "",
                        link: "http://m.wufazhuce.com/one/1824?channel=qq",
                        imgUrl: "",
                        audio: ""
                    }
                },
                tag_list: [ ],
                orientation: "1"
            }
        ],
        menu: {
            vol: "1795",
            list: [
                {
                content_type: "1",
                content_id: "2759",
                title: "你好，小确丧时代",
                tag: {
                        id: "7",
                        title: "ONE STORY"
                    }
                },
            ]
        }
    }
}
```