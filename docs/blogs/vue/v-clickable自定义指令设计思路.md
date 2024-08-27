---
sticky: 1
tags:
    - 自定义指令
categories:
    - Vue
---

# v-clickable自定义指令设计思路

:::tip 背景
经常碰到一种情况，文本要可点击化，然后要写一堆样式，这种场景非常普遍，那么是不是可以把这个需求写成一个公共组件，发布到npm，让所有人都可以方便使用呢？
:::

设计的时候，要考虑几个问题：

1. 形式

:::details UI组件 or 指令 ？
1. 写成UI组件
2. 写成指令
:::

UI组件的话，多少有点“重”，而且对原来的dom结构具有破坏性，而指令不会破坏原有的dom结构，所以指令成了我的最终选择。

2. vue2兼容性

:::warning 兼容vue2要考虑的问题
vue2需求量大不大？兼容成本高不高？打包体积会否有比较大的差距？
:::

- vue2的老项目还是占大多数
- 经过调研，指令源代码本身不需要单独兼容vue2，只是注册指令的时候传入的参数不一样而已，所以零成本，打包体积也没有影响

3. 如何设计

自定义组件/自定义指令的设计，要考虑的是用户使用的心智负担，尽量降到最低。

- 首选，用户可以直接使用 v-clickable 不传参就可以使用
- 其次，用户可以通过 v-clickable="{...}" 的形式传一些参数，达到不同的样式效果

那么，参数又该如何设计呢？

:::details type
为了降低用户心智负担，关于字体颜色没有开放自定义属性，而是提供了 primary(蓝色)/success(绿色)/warning(橙色)/danger(红色)/info(灰色) 五种类型供用户选择，一般有这5种选择已经足够应付绝大多数场景。
:::

::: details button
有些场景，鼠标移过时需要底部有个圆角矩形的浅灰色背景，所以设计了个 button 的 boolean 属性，默认是 false。
:::

::: details link
还有些场景，需要显示下划线，所以设计了一个 link 的 boolean 属性，表示链接样式，默认是 false。
:::

:::warning 注意
button 与 link 不能同时为 true，因为这是两个互斥的样式。但这里也做了降级处理，如果都传 true，则默认是 button，link 则不做处理。
:::

:::info 效果
```html
<span v-clickable>点击</span>
```
<span v-clickable>点击</span>
:::

代码其实非常少，有兴趣的可以移步 [github](https://github.com/rainlam163/v-clickable)，README 也有使用文档。