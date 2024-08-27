---
tags:
    - JS基础
    - 八股文
categories:
    - JavaScript
---

# 【JS基础】作用域

JavaScript是一种灵活且强大的编程语言，其作用域概念是理解其行为的关键之一。在这篇博客中，我们将深入探讨JavaScript作用域的各个方面，包括作用域类型、变量声明的关键字（var、let、const）的区别、经典案例以及作用域链等。

## 作用域类型
在JavaScript中，主要有三种作用域类型：

**全局作用域（Global Scope）**： 全局作用域是指在代码的任何地方都能访问的作用域，它存在于整个程序的生命周期中。

**函数作用域（Function Scope）**： 函数作用域是指在函数内部声明的变量只能在该函数内部访问，外部无法访问。

**块级作用域（Block Scope）**： 块级作用域是指在块（如if语句、for循环、while循环、{ }代码块等）内部声明的变量只能在该块内部访问，外部无法访问。ES6引入了块级作用域的概念。

## var、let、const的区别
在JavaScript中，变量声明有三种关键字：var、let和const。它们之间的主要区别在于变量的可变性和作用域。

**var**： 使用var关键字声明的变量存在于函数作用域中，且可以被重复声明。

**let**： 使用let关键字声明的变量存在于块级作用域中，且不允许重复声明。

**const**： 使用const关键字声明的变量也存在于块级作用域中，但其值一旦被赋予就不能再改变。

## var与let的经典案例

以下案例可以清楚地展示出var和let之间的差异：

```javascript
// 使用 var 声明
var x = 10;
if (true) {
    var x = 20;
    console.log(x); // 输出 20
}
console.log(x); // 输出 20

// 使用 let 声明
let y = 10;
if (true) {
    let y = 20;
    console.log(y); // 输出 20
}
console.log(y); // 输出 10
```

## let的实现原理
let关键字的实现可以借助闭包和函数作用域的特性。通过创建函数作用域内的变量，可以实现类似于块级作用域的效果。

下面是一个示例代码：

```javascript
// 使用立即执行的匿名函数创建块级作用域
(function() {
    let blockScopedVar = 'I am a block-scoped variable';
    console.log(blockScopedVar); // 输出 'I am a block-scoped variable'
})();

// 在函数外部访问局部变量会报错
console.log(blockScopedVar); // Uncaught ReferenceError: blockScopedVar is not defined
```

在这个示例中，blockScopedVar被限制在了匿名函数内部，外部无法直接访问它，从而实现了类似于块级作用域的效果。

利用这种方法，我们可以在需要的地方创建块级作用域，避免了变量污染和命名冲突的问题。

这种技巧结合了闭包和函数作用域的特性，是实现块级作用域的一种常见做法。

## 作用域链
作用域链是指在 JavaScript 中通过词法作用域确定变量访问规则的机制。当查找变量时，JavaScript 引擎会沿着作用域链向上查找，直到找到变量或者到达全局作用域为止。