# frontends学习笔记

### 基本标签

```html
<html>
    <head>
       <title>第一个页面</title> 
    </head>
    <body>
        222200307叶宇滟
    </body>
</html>
```

- ### ==DOCTYPE== 

  文档类型声明，告诉浏览器用什么html版本打开，位于<html>之前，==不是html标签==

- ### lang

   |en->英文 zh-CN->中文，没有区别，都可以显示，但会显示翻译功能

- <meta charset="UTF-8">

- ```
  <h1>-<h6>
  ```

  标题标签，会根据级别大小粗细不同

- ```html
  <p>
  </p>
  ```

  段落标签

- ```
  <br />
  ```

  换行标签

- ```
  <strong> <b>
  ```

  加粗标签

- ```
  <em>
  ```

  倾斜标签

- ```
  <del>
  ```

  删除线标签

- ```
  <ins>
  ```

  下划线标签

- ```
  <div>
  ```

  大盒子

- ```html
  <span>
  ```

  ==横着展示==，小盒子

- ```html
  <img src="url" alt="ddd" title="提示文本" width="500" height="100" border="15"/> 
  ```

  图像标签，本地要在同一文件夹内,==src必须写==，否则图片不显示

  图片不显示时，用alt后的字符串代替,title后字符串鼠标放在图片上，提示的文档

  width，height设置宽和高，一般修改其中一个，另一个会跟随等比例缩放

  border设置边框，一般通过css进行设置

  属性不分先后，要用空格分隔，属性要写在标签名的后面，值要用双引号 ，==key="value"==

- 路径：相对路径

  ==同一级直接写名字，下一级包名+名字，上一级../名字==

  #### 超链接标签

  ```html
  <a href="跳转目标(地址)" target="目标窗口的弹出方式(_self/_blank)" title="鼠标放在链接上显示的描述">
  ```

- 空格 &nbsp;&nbsp记得加分号

- ul-li 无序列表

- ol-li 有序列表

### 表格

```
<table border="1">
        <caption>
            前端三剑客
        </caption>
        <tr>
            <th>知识点</th>
            <th>重要程度</th>
            <th>难度</th>
            <th>学习周期</th>
        </tr>
        <tr>
            <td>html</td>
            <td>5星</td>
            <td>3星</td>
            <td>7天</td>
        </tr>
        <tr>
            <td>css</td>
            <td>5星</td>
            <td>4星</td>
            <td>10天</td>
        </tr>
        <tr>
            <td>js</td>
            <td>5星</td>
            <td>5星</td>
            <td>20天</td>
        </tr>
    </table>
    <!--thead,tbody,tfoot-->
    <table border="1">
        <thead>
            <td>科目</td>
            <td>分数</td>
        </thead>
        <tbody>
            <tr>
                <td>语文</td>
                <td>99</td>
            </tr>
            <tr>
                <td>数学</td>
                <td>60</td>
            </tr>
        </tbody>
        <tfoot>
            <td>总分</td>
            <td>159</td>
        </tfoot>
    </table>
```

### 表单

```
<h4>输入你的个人信息</h4>
    <form method="post" action="save.php">
        <label for="name">输入你的姓名:</label>
        <input type="radio" value="yyy" name="name" checked="checked">yyy
        <input type="radio" value="y-3" name="name">y-3
        <input type="radio" value="叶耶耶" name="name">叶耶耶
        <select>
            <option value="yyy" selected="selected">yyy</option>
            <option value="y-3">y-3</option>
            <option value="叶耶耶">叶耶耶</option>
        </select>
        <br>
        <input type="submit" value="提交">
        <br>
        <input type="reset" value="重置">
    </form>
```

### CSS

```
<!--外联式-->
<link href="style.css" rel="stylesheet" type="text/css" />

<!--内联式-->
<p style="color:blue;font-size:12px;"></p>

<!--嵌入式-->
<style type="text/css">
        span{
            color: aqua;
        }
</style>
```

==内联式 > 嵌入式 > 外部式==

- 选择器

  ```
  选择器{
      样式;
  }
  .类选器名称{css样式代码;}
  class="类选择器名称"
  ```

  class->.  **可以使用类选择器词列表方法为一个元素同时设置多个样式**

  id->#  **==id选择器一个只能使用一次==**

- 子选择器

- .class名>标签

​	**>**作用于元素的第一代后代，**空格**作用于元素的所有后代。

```html
* {color:red;}
```

- ##### 伪类选择器

```
a:hover{color:red;}
h1,span{color:red;}
```

==设置鼠标滑过的状态==，和<a>标签适配较好

如果一个元素使用了多个选择器,则会按照选择器的优先级来给定样式。

#### 选择器的优先级

内联样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器

**!important要写在分号的前面**

#### 设置字体样式

- font-style可以设置字体样式，并且有种3设置方式。

- 正常字体为normal,也是font-style的默认值。

- italic为设置字体为斜体，用于字体本身就有倾斜的样式。

- oblique为设置倾斜的字体，强制将字体倾斜。

- text-decoration可以设置添加到文本的修饰。

- text-decoration默认值为none, 定义标准的文本。

- text-decoration的值为underline为定义文本下的一条线。

- text-decoration的值为overline为定义文本上的一条线。

- text-decoration的值为line-through为定义穿过文本下的一条线，一般用于商品折扣价。

```
p{text-indent:2em;} <!--首行缩进-->
p{line-height:1.5em;} <!--行间距-->
p{
	letter-spacing:50px; <!--字母间距-->
	word-spacing:50px;	 <!--单词间距-->
}
h1{
    text-align:center/left/right;
}
<!--文本对齐方式-->
```

- 块级元素

```html
<div>、 <p>、<h1>、<form>、<ul> 、<li> display:block;
```

元素的高度、宽度、行高以及顶和底边距都可设置，单独成行

- ==内联元素==

```
<span>、<a>、<label>、 <strong> 、<em> display:inline;
```

元素的高度、宽度及顶部和底部边距**不可**设置

- ==内联块状元素==

`<img> <input>`

```
display:inline-block;
```

元素的高度、宽度、行高以及顶和底边距都可设置

- 隐藏元素

```
display: none;
```

- 设置背景色

```
background-color:red;
```

#### border-style

dashed（虚线）| dotted（点线）| solid（实线）

border-color（边框颜色）中的颜色可设置为十六进制颜色，border-color:#888;

border-width（边框宽度）中的宽度也可以设置为：

thin | medium | thick

- 元素边框的圆角

`border-radius: 20px 10px 15px 30px;`

==左上，右上，右下，左下==

- padding

```
padding:20px 10px 15px 30px;
```

==上右下左==

- 绝对定位

```
div{
    width:200px;
    height:200px;
    border:2px red solid;
    position:absolute;
    left:100px;
    top:50px;
}
```

### 弹性盒模型

- 设置display: flex属性可以把块级元素在一排显示。

- flex需要添加在==父元素==上，改变子元素的排列顺序。

- 默认为从左往右依次排列,且和父元素左边没有间隙。

```
justify-content: flex-start | flex-end | center | space-between | space-around;
align-items: flex-start | flex-end | center | baseline | stretch;
```

```
margin:20px auto;/* margin-left 与 margin-right 设置为 auto */
margin-left:auto;
margin-right:auto;
```

子元素设置上和左偏移的值都为50%，是元素的左上角在父元素中心点的位置

margin给上和左都给负的自身宽高的一半,就能达到垂直水平居中的效果。