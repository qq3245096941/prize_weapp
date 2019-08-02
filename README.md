# wxapp_prize
>抽奖小程序前端，使用wepy开发

wepy开发文档：[wepy](https://tencent.github.io/wepy/document.html#/)

假如你不想立即安装wepy，那么``dist``文件夹就是小程序打包好的前端包。
***

在微擎中安装当前模块[抽奖小程序后端](https://github.com/qq3245096941/module_prize)，然后生成一个小程序

然后在src/siteinfo.js中定义
```
var siteinfo = {
  "uniacid": "2", //微擎小程序的uniacid
  "acid": "2", //微擎小程序的acid
  "multiid": "0",
  "version": "1.0",
  "m":"v_prize",
  "siteroot": "https://zjcx.hbyygb.cn/app/index.php",//写上自己的域名
  "design_method": "3"
};
module.exports = siteinfo;
```
即可
***
本小程序只适用于wepy 1.7.*版本。首先查看你的wepy版本
```
wepy -v
```
如果出现
```
1.7.3
```
则就可以直接编译项目了
```
wepy build --watch
```
***
如果出现版本为``2.0.0(alpha)``，请使用命令覆盖当前wepy-cli，wepy-cli2.0版本无法编译低版本项目
```
cnpm install wepy-cli -g
```

