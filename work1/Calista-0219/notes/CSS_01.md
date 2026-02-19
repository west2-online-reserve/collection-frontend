# CSS_01

# 索引
- [CSS语法](#css语法)
- [CSS id 和 class 选择器](#css-id-和-class-选择器)
- [CSS常用基础属性](#css常用基础属性)
- [CSS常用伪类](#css常用伪类)
- [CSS !important 规则](css-!important-规则)
- [CSS对齐](#css对齐)

# *CSS语法*
- CSS实例：

  CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明:

  选择器通常是需要改变样式的 HTML 元素。

  每条声明由一个属性和一个值组成。

  每个属性有一个值。属性和值被冒号分开。

  CSS声明总是以分号 ; 结束，以大括号 {} 括起来:

  例子：

  `p{color:red;text-align:center;}`
  
- CSS注释：
  
  以 /* 开始, 以 */ 结束

# *CSS id 和 class 选择器*
- id选择器:

  id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式

  CSS 中 id 选择器以 "#" 来定义

  实例：

  `#para1`
  
  `{`

  `text-align:center;`
  
  `color:red;`
  
  `}`

- class选择器:

  class 选择器用于描述一组元素的样式，可以在多个元素中使用。

  在CSS中，类选择器以一个点 . 号显示

  多个 class 选择器可以使用空格分开

  实例：

  `.center {text-align:center;}`


# *CSS常用基础属性*
- color：
  设置文字颜色
- background / background-color：
  设置背景属性
- text-align：
  设置文本水平对齐方式

  `left 左对齐（默认）`

  `center 居中`

  `right 右对齐`
  
- font-size：
  设置字体大小
- font-weight：
  设置字体粗细
- border：
  设置边框

  `边框需要三个部分：`

  `粗细：1px`

  `样式：solid / dashed / dotted`

  `颜色：black`

  实例：

  `div {`
  
  `border: 1px solid black;`
  
 `}`
- margin:
  设置元素与外部（其他元素）之间的外边距。
- padding:
  设置元素内部内容与边框之间的内边距。
- height:
  设置元素的高度
- width：
  设置元素的宽度
- display：决定元素的显示方式（布局方式）

  常用：

  `block → 块级元素（独占一行）`

  `inline → 行内元素（不换行）`

  `inline-block → 行内 + 可设置尺寸`

  `flex → 开启 flex 布局`

  `none → 隐藏元素`
  

# *CSS常用伪类*
- hover:
  选中鼠标悬停在元素上时的状态。

# *CSS !important 规则*

  CSS 中的 !important 规则用于增加样式的权重。
  
  使用一个 !important 规则时，此声明将覆盖任何其他声明。

  实例：

  `#myid {`
  
  `background-color: blue;`
  
`}`
 
`.myclass {`

  `background-color: gray;`
  
`}`
 
`p {`

  `background-color: red !important;`
  
`}`

 PS:尽量别用这玩意orz


# *CSS对齐*
- 元素居中对齐：

  使用`margin: auto;`

  设置到元素的宽度将防止它溢出到容器的边缘

  实例：

  `.center {`
  
    `margin: auto;`
  
    `width: 50%;`
  
    `border: 3px solid green;`
  
    `padding: 10px;`
  
 `}`

- 文本居中对齐：”

  使用 `text-align: center;`
  
- 图片居中对齐：

  使用 `margin: auto;` 并将它放到 `块` 元素中:

- 左右对齐：

  使用 `float` 属性来对齐元素

- 垂直居中对齐：

  使用 `padding`或`line-height`
  
  
  
  
  

