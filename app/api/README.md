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

### 获取每天推荐数据
```
/channel/one/参数1/参数2
```
- 参数1：日历日期->2017-09-05
- 例：/channel/one/2017-09-05/
- 参数2：城市名称->上海
- 例：/channel/one/2017-09-05/上海

### 获取轮播图广告数据
```
/banner/list/3
```

### 获取问答数据
```
/banner/list/5
```

### 获取热门作者数据
```
/author/hot
```

### 获取专题列表数据
```
/list/4?last_id=参数
```
- 参数1：上次数据的最后一个id
- 例：last_id=47,

### 详情页面 —— 阅读
```
/essay/htmlcontent/参数
```
- 参数：页面ID
- 例:/essay/htmlcontent/2828
### 详情页面 —— 连载
```
/serialcontent/htmlcontent/参数
```
- 参数：页面ID
- 例:/serialcontent/htmlcontent/437
### 连载 —— 章节列表
```
/serial/list/参数
```
- 参数:文章id(serial_id)
- 例:/serial/list/49
### 详情页面 —— 问答
```
/question/htmlcontent/参数
```
- 参数：页面ID
- 例:/question/htmlcontent/1879

### 详情页面 —— 音乐
```
/muisc/htmlcontent/参数
```
- 参数：页面ID
- 例:/music/htmlcontent/2418

### 详情页面 —— 影视
```
/movie/htmlcontent/参数
```
- 参数：页面ID
- 例:/movie/htmlcontent/1142

### 详情页面 —— 电台
```
/radio/htmlcontent/参数
```
- 参数：页面ID
- 例:/radio/htmlcontent/2197

### 评论数据
```
/comment/praiseandtime/essay/参数1/参数2
```
- 参数1：详情页面id
- 参数2：上一条评论id
- 例:/api/comment/praiseandtime/essay/2828/55896

| eq  | eq  |
|---|---|
|   |
| eq  |
|   |


