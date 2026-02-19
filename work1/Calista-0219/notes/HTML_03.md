# HTML_03

## 索引
- [HTML图像- 图像标签（`<img>`）和源属性（`Src`）](#html图像--图像标签img和源属性src)
- [HTML图像-Alt属性](html图像-alt属性)
- [HTML图像-设置图像的高度与宽度](#html图像-设置图像的高度与宽度)
- [HTML列表](#html列表)
- [HTML区块](#html区块)
  
## *HTML图像- 图像标签（`<img>`）和源属性（`Src`）*

  在 HTML 中，图像由`<img>` 标签定义 (`<img>`是空标签)。

  要在页面上显示图像，需要使用源属性（`src`）。`src` 指 "source"。源属性的值是图像的 URL 地址。

- 定义图像的语法是：
  `<img src="url" alt="some_text">`

## *HTML图像-Alt属性*
- `alt`属性用来为图像定义一串预备的可替换的文本。
- `<img src="boat.gif" alt="Big Boat">`

## *HTML图像-设置图像的高度与宽度*
- `height`（高度）与`width`（宽度）属性用于设置图像的高度与宽度。
- 属性值默认单位为像素
- `<img src="pulpit.jpg" alt="Pulpit rock" width="304" height="228">`

## *HTML列表*
HTML 支持有序、无序和定义列表:
- 有序列表：有序列表始于 `<ol>` 标签。每个列表项始于 `<li>` 标签。列表项使用数字来标记。

  `<ol>`
 
  `<li>Coffee</li>`
 
  `<li>Milk</li>`
 
  `</ol>`



- 自定义列表：自定义列表不仅仅是一列项目，而是项目及其注释的组合。

  自定义列表以`<dl>`标签开始。每个自定义列表项以`<dt>`开始。每个自定义列表项的定义以`<dd>`开始。

  `<dl>`
  
  `<dt>Coffee</dt>`
  
  `<dd>- black hot drink</dd>`
  
  `<dt>Milk</dt>`
  
  `<dd>- white cold drink</dd>`
  
  `</dl>`

  显示如下：

  Coffee
  
  -black hot drink
    
  Milk
  
  -white cold drink

- 不同类型的有序列表：
  
  大写的字母列表：type="A"

  小写字母列表：type="a"

  罗马数字列表：type="I"

  小写罗马数字列表：type="i"

- 无序列表：无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。
- 无序列表使用`<ul>`标签
- `<ul>`
  
  `<li>Coffee</li>`
  
  `<li>Milk</li>`
  
  `</ul>`

## *HTML区块*
- HTML`<div>`和`<span>`:
  
  HTML 可以通过 `<div>` 和 `<span>`将元素组合起来
-  HTML 区块元素:

   大多数HTML 元素被定义为块级元素或内联元素。

   块级元素在浏览器显示时，通常会以新行来开始（和结束）。

   实例: `<h1>`, `<p>`, `<ul>`, `<table>`
- HTML 内联元素:
  
  内联元素在显示时通常不会以新行开始。

  实例: `<b>`, `<td>`, `<a>`, `<img>`

- HTML`<div>`元素

  定义了文档的区域，块级

- HTML`<span>`元素:

  用来组合文档中的行内元素， 内联元素
  


 
