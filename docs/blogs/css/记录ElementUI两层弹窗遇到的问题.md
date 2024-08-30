---
tags:
    - element-ui
    - css
categories:
    - CSS
---

# 记录ElementUI两层弹窗遇到的问题

昨天在公司项目开发过程中，遇到一个样式问题，下面我按`发现问题`-`解决问题`的过程描述一下。

## 问题1：内层弹框被外层弹框挡住了

**发现问题**

![需求](/blog/requirement.png)

如果所示，需求是点击下拉框出现标签选择的下拉列表，然后在弹框底部新增标签的操作，新增标签的左侧是一个颜色选择下拉框。所以问题归根结底就是`element-ui的弹框嵌套`问题。

组件代码写完，我发现长这样：

![弹框嵌套问题](/blog/下拉框嵌套问题.png)

是的，内层弹框被外层弹框挡住了。

**解决问题**

第一时间想到的是内层弹框z-index比外层小，打开dev-tool一看，果然如此，一顿操作把z-index改大后，看起来很完美：

![z-index改好后](/blog/zIndex改好后.png)

## 问题2：内层弹框选中后把外层弹框关闭了

**发现问题**

然后我点击选择其中一个颜色，什么？把我外层弹框都关了？？？

![黑人问号脸](/blog/黑人问号脸.jpg)

**解决问题**

第一时间我想到的是事件冒泡导致点击事件冒泡到上层弹框了，于是写代码阻止了事件冒泡，结果没什么卵用。

再看看dom结构，发现弹框dom节点都被渲染到了body层，因为两个弹框都在body下了，所以是同级结构，不存在事件冒泡的问题。

想起来element-ui默认是把弹框渲染到body底部的，所以下拉框组件应该是有个属性取消它的默认渲染行为，让内层正常渲染到外层弹框里面。于是代码加上了`popper-append-to-body={false}`（不要觉得代码奇怪，这里用了jsx）

```vue
<el-select
    value={this.tagColor}
    slot="prepend"
    placeholder="请选择"
    popper-class="color_popper"
    popper-append-to-body={false}
    onInput={val => {
        this.tagColor = val;
    }}
>
...
</el-select>
```

结果内层下拉框不见了！！！

![消失的下拉框](/blog/消失的下拉框.png)

再看看样式，原来弹框的定位是absolute，而且在全局样式改成了`position: absolute!important;`。

解决方案本来也很简单，外层保持absolute，内层改成fixed就可以了，但问题就在于两个弹框都是全局`position: absolute!important;`，我是用组件提供的`popper-class`属性去改定位也没用，因为优先级没有全局高。

```html
<el-select
    ...
    popper-class="color_popper"
>
...
</el-select>
```
```css
.color_popper {
    position: fixed!important; // 没用，优先级没有全局的 position: absolute!important; 高
}
```

这时候比较考验我们对css优先级熟悉程度了，其实css选择器上可以在弹框类名前面加多一层父节点的css类名，这样就会提升你的优先级：

```css
.create_bar .color_popper {
    position: fixed!important;
}
```

至此，问题完美解决。

## 总结

1. 要了解element-ui的弹框是默认渲染在body节点下的，可以通过设置阻止这个默认行为。
2. 要了解定位的知识：`absolute`、`fixed` 会合理使用。
3. 要了解css选择器优先级，而且`!important`尽量少用。

