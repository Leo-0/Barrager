# Barrager
Barrager
## 插件初体验
第一次尝试写插件，还有很多需要改善的地方
### 调用方法
- 无参调用:
$(selector).barragers();
- 带参调用:
$(selector).barragers({info:"这是弹幕啦！"});
### 清除弹幕
$.fn.barragers.clearAll();
### 一些需要注意的点
- 如果.barragerbox的position设置成了absolute，需要设置selector的overflow为hidden，否则会出现横向滚动条，且会在selector外就看见弹幕；
- 如果.barragerbox的position设置成了fixed，弹幕则是相对于视窗的位置
### 参数
- 默认参数

{
  color: "fff",
  randColor: false,
  duration: 5000,
  variableSpeed: false,
  close: true,
  position: 0,
  info: "Hello world!我是弹幕啦！"
}
- 参数说明
  - color: 设置文本颜色
  - randColor: 是否随机颜色，如果是true则随机颜色，不使用color，false则使用color
  - duration: 动画持续时间
  - variableSpeed: 是否设置每条文本速度不一样，true设置每条文本速度不一样，false一样
  - close: 是否设置显示关闭按钮，true显示，false不显示
  - position: 文本出现位置，相对于底部
  - portrait: 图片url，设置则显示，否则不显示
  - href: 文本链接
  - id: 文本id
  - info: 弹幕文本
