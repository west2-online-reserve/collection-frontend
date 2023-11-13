# const、let、var的区别

const是常量，定义时必须赋初值，值不可修改。只限制变量绑定的值，不会限制引用数据类型内部的变动。如：

``` javascript
const a = 1
a = 2   // 报错

const b = {
    name: '张三'
}
b.name = '李四'     // 不会报错
b = 1   // 报错
```

let是变量。

const和let只在块内有效，即两个花括号之间，相当于局部的值。

var定义的变量是全局的，但一个函数内var的变量不能在函数外访问。

用var定义两个同名变量，后定义的会覆盖掉先定义的。const和let不允许重复定义。

var存在变量提升的特性。当用var定义了一个变量，即便还未执行到，该变量也已经存在了，且值为undefined。

``` javascript
function fun() {
    if (a == undefined) {
        var a = 10
    }
    console.log(a)  // 输出为10
}
```

造成这种现象的原因是，if中用var定义了`a`，因变量提升(hoisting)特性，在执行前`a`被提升到函数作用域顶部，且初始值为undefined，于是if成立，早已存在的`a`由undefined被赋值为10。

将var改用let就不会有这样的问题。

总结：无特殊情况不要用var，声明变量用let。声明对象类型用const，非对象类型用let。

# innerHTML和innerText的区别

``` javascript
<html>
	<head><title>innerHTML与innerText的区别</title></head>
	<body>
		<div id="div1">
			<p id="p1">hello world </p>
		</div>
		<script>
			var div1 = document.getElementById("div1");
			alert(div1.innerHTML);    // <p id="p1">hello world </p>
			alert(div1.innerText)    // hello world
		</script>
	</body>
</html>
```

# 有没有局部元素更新的办法？setInterval刷新后元素如何获得刷新前的值？

# js在forEach中居然不能用break，return只能当continue用

要强行中断循环，chatGPT提供了一种不规范的方法：

``` javascript
const arr = [1, 2, 3, 4, 5];

try {
    arr.forEach(item => {
        if (item === 3) {
            throw new Error('BreakLoop'); // 抛出异常以中断循环
        }
        console.log(item);
    });
} catch (error) {
    if (error.message === 'BreakLoop') {
        // 捕获并忽略 "BreakLoop" 异常
    } else {
        throw error; // 抛出其他异常
    }
}
```

绷