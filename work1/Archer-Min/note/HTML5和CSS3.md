# HTML5和CSS3

## HTML

### 标签

#### span标签

\<span>标签，这个标签是没有语义的，它的作用就是为了设置单独的样式用的。

<img src="C:/Users/20643/AppData/Roaming/Typora/typora-user-images/image-20230808102726565.png" alt="image-20230808102726565" style="zoom:60%;" />

<img src="C:/Users/20643/AppData/Roaming/Typora/typora-user-images/image-20230808102809056.png" alt="image-20230808102809056" style="zoom:50%;" />



#### hx标签

标题标签一共有6个，`h1、h2、h3、h4、h5、h6`分别为一级标题、二级标题、三级标题、四级标题、五级标题、六级标题。并且依据重要性递减。`<h1>`是最高的等级。
**语法：**
`<hx>标题文本</hx>` (x为1-6)

#### div标签

相当于一个空盒子，划分各部分

#### header标签

代表头部，相当于div，但具备语义化

#### footer标签

底部

#### section

代表区域

#### aside侧边栏

#### & nbsp;空格

#### \<br/>换行

#### hr水平线标签

#### \<ul>\<li>标签 无序列表

```html
<ul>
  <li>精彩少年</li>
  <li>美丽突然出现</li>
  <li>触动心灵的旋律</li>
</ul>
```

#### < ol >< li >有序列表

#### < img>图片

`<img src="图片地址" alt="下载失败时的替换文本" title = "提示文本(鼠标滑过会显示)">`

#### < a>超链接

`<a  href="目标网址"  title="鼠标滑过显示的文本">链接显示的文本</a>`

a标签有的target属性，代表打开网页的方式。可选值为”_ self和_ blank”，默认值为_ self，代表在当前页面打开链接，_blank代表在新窗口打开链接。

#### table表格

创建表格的四个元素：table、tr、th、td

1、\<table>…\</table>：整个表格以\<table>标记开始、\</table>标记结束。

2、\<tr>…\</tr>：表格的一行，所以有几对tr 表格就有几行。

3、\<td>…\</td>：表格的一个单元格，一行中包含几对\<td>...\</td>，说明一行中就有几列。

4、\<th>…\</th>：表格的头部的一个单元格，表格表头。

5、表格中列的个数，取决于一行中数据单元格的个数。

6、border属性可以为表格添加边框，属性值为数字。

```html
<table border="1">
        <caption>前端三剑客</caption>
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
</table>
```

### HTML样式

style 属性用于改变 HTML 元素的样式。

`<html>
<body style="background-color:yellow">
<h1 style="font-family:verdana;text-align:center;">A heading</h1>
<p style="font-family:arial;color:red;font-size:20px;">A paragraph.</p>
<h2 style="background-color:red">This is a heading</h2>
<p style="background-color:green">This is a paragraph.</p>

</body>
</html>`



#### 三种方式插入样式表

- 外部样式表（外联）

  当样式需要被应用到很多页面的时候，外部样式表将是理想的选择。使用外部样式表，你就可以通过更改一个文件来改变整个站点的外观。

  ```html
  <head>
  <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  ```

- 内部样式表

  当单个文件需要特别样式时，就可以使用内部样式表。你可以在 head 部分通过 \<style> 标签定义内部样式表。

  ```html
  <head>
  <style type="text/css">
  body {background-color: red}
  p {margin-left: 20px}
  </style>
  </head>
  ```

- 内联样式

  当特殊的样式需要应用到个别元素时，就可以使用内联样式。使用内联样式的方法是在相关的标签中使用样式属性。样式属性可以包含任何 CSS 属性。以下实例显示出如何改变段落的颜色和左外边距。

  ```html
  <p style="color: red; margin-left: 20px">
  This is a paragraph
  </p>
  ```



### HTML格式化

- #### 文本格式化

  <b>This text is bold</b>

  <strong>This text is strong</strong>

  <big>This text is big</big>

  <em>This text is emphasized</em>

  <i>This text is italic</i>

  <small>This text is small</small>

  This text contains<sub>subscript</sub>

  This text contains<sup>superscript</sup>

- 预格式文本

  <pre>
  这是
  预格式文本。
  它保留了      空格
  和换行。
  </pre>

  <p>pre 标签很适合显示计算机代码：</p>

  <pre>
  for i = 1 to 10
       print i
  next i
  </pre>

- 计算机输出标签

  <code>Computer code</code>
  <kbd>Keyboard input</kbd>
  <tt>Teletype text</tt>
  <samp>Sample text</samp>
  <var>Computer variable</var>

  <p>
  <b>注释：</b>这些标签常用于显示计算机/编程代码。
  </p>

- 缩写
  <abbr title="etcetera">etc.</abbr>
  <acronym title="World Wide Web">WWW</acronym>

  <p>在某些浏览器中，当您把鼠标移至缩略词语上时，title 可用于展示表达的完整版本。</p>

- 改变文字书写方向

  <bdo dir="rtl">
  Here is some Hebrew te
  </bdo>

- 块引用

  这是长的引用：
  <blockquote>
  这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。这是长的引用。
  </blockquote>
  这是短的引用：
  <q>
  这是短的引用。
  </q>

  <p>
  使用 blockquote 元素的话，浏览器会插入换行和外边距，而 q 元素不会有任何特殊的呈现。
  </p>

## CSS

CSS 是一种描述 HTML 文档样式的语言。

CSS 描述应该如何显示 HTML 元素。

### CSS语法

CSS 规则集（rule-set）由选择器和声明块组成：

<img src="C:/Users/20643/AppData/Roaming/Typora/typora-user-images/image-20230809110107657.png" alt="image-20230809110107657" style="zoom:50%;" />

### CSS选择器

- 简单选择器（根据名称、id、类来选取元素）

- [组合器选择器](https://www.w3school.com.cn/css/css_combinators.asp)（根据它们之间的特定关系来选取元素）

- [伪类选择器](https://www.w3school.com.cn/css/css_pseudo_classes.asp)（根据特定状态选取元素）

- [伪元素选择器](https://www.w3school.com.cn/css/css_pseudo_elements.asp)（选取元素的一部分并设置其样式）

- [属性选择器](https://www.w3school.com.cn/css/css_attribute_selectors.asp)（根据属性或属性值来选取元素）

  | 选择器                                                       | 例子                  | 例子描述                                               |
  | :----------------------------------------------------------- | :-------------------- | :----------------------------------------------------- |
  | [.*class*](https://www.w3school.com.cn/cssref/selector_class.asp) | .intro                | 选择 class="intro" 的所有元素。                        |
  | .*class1*.*class2*                                           | .name1.name2          | 选择 class 属性中同时有 name1 和 name2 的所有元素。    |
  | .*class1* .*class2*                                          | .name1 .name2         | 选择作为类名 name1 元素后代的所有类名 name2 元素。     |
  | [#*id*](https://www.w3school.com.cn/cssref/selector_id.asp)  | #firstname            | 选择 id="firstname" 的元素。                           |
  | [*](https://www.w3school.com.cn/cssref/selector_all.asp)     | *                     | 选择所有元素。                                         |
  | [*element*](https://www.w3school.com.cn/cssref/selector_element.asp) | p                     | 选择所有 <p> 元素。                                    |
  | [*element*.*class*](https://www.w3school.com.cn/cssref/selector_element_class.asp) | p.intro               | 选择 class="intro" 的所有 <p> 元素。                   |
  | [*element*,*element*](https://www.w3school.com.cn/cssref/selector_element_comma.asp) | div, p                | 选择所有 <div> 元素和所有 <p> 元素。                   |
  | [*element* *element*](https://www.w3school.com.cn/cssref/selector_element_element.asp) | div p                 | 选择 <div> 元素内的==所有== <p> 元素。                 |
  | [*element*>*element*](https://www.w3school.com.cn/cssref/selector_element_gt.asp) | div > p               | 选择父元素是 <div> 的==直接== <p> 元素。==（第一层）== |
  | [*element*+*element*](https://www.w3school.com.cn/cssref/selector_element_plus.asp) | div + p               | 选择紧跟 <div> 元素的首个 <p> 元素。                   |
  | [*element1*~*element2*](https://www.w3school.com.cn/cssref/selector_gen_sibling.asp) | p ~ ul                | 选择前面有 <p> 元素的每个 <ul> 元素。                  |
  | [[*attribute*\]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | [target]              | 选择带有 target 属性的所有元素。                       |
  | [[*attribute*=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | [target=_blank]       | 选择带有 target="_blank" 属性的所有元素。              |
  | [[*attribute*~=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | [title~=flower]       | 选择 title 属性包含单词 "flower" 的所有元素。          |
  | [[*attribute*\|=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | [lang\|=en]           | 选择 lang 属性值以 "en" 开头的所有元素。               |
  | [[*attribute*^=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | a[href^="https"]      | 选择其 src 属性值以 "https" 开头的每个 <a> 元素。      |
  | [[*attribute*$=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | a[href$=".pdf"]       | 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。         |
  | [[*attribute**=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | a[href*="w3school"]   | 选择其 href 属性值中包含 "abc" 子串的每个 <a> 元素。   |
  | [:active](https://www.w3school.com.cn/cssref/selector_active.asp) | a:active              | 选择活动链接。                                         |
  | [::after](https://www.w3school.com.cn/cssref/selector_after.asp) | p::after              | 在每个 <p> 的内容之后插入内容。                        |
  | [::before](https://www.w3school.com.cn/cssref/selector_before.asp) | p::before             | 在每个 <p> 的内容之前插入内容。                        |
  | [:checked](https://www.w3school.com.cn/cssref/selector_checked.asp) | input:checked         | 选择每个被选中的 <input> 元素。                        |
  | [:default](https://www.w3school.com.cn/cssref/selector_default.asp) | input:default         | 选择默认的 <input> 元素。                              |
  | [:disabled](https://www.w3school.com.cn/cssref/selector_disabled.asp) | input:disabled        | 选择每个被禁用的 <input> 元素。                        |
  | [:empty](https://www.w3school.com.cn/cssref/selector_empty.asp) | p:empty               | 选择没有子元素的每个 <p> 元素（包括文本节点）。        |
  | [:enabled](https://www.w3school.com.cn/cssref/selector_enabled.asp) | input:enabled         | 选择每个启用的 <input> 元素。                          |
  | [:first-child](https://www.w3school.com.cn/cssref/selector_first-child.asp) | p:first-child         | 选择属于父元素的第一个子元素的每个 <p> 元素。          |
  | [::first-letter](https://www.w3school.com.cn/cssref/selector_first-letter.asp) | p::first-letter       | 选择每个 <p> 元素的首字母。                            |
  | [::first-line](https://www.w3school.com.cn/cssref/selector_first-line.asp) | p::first-line         | 选择每个 <p> 元素的首行。                              |
  | [:first-of-type](https://www.w3school.com.cn/cssref/selector_first-of-type.asp) | p:first-of-type       | 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。       |
  | [:focus](https://www.w3school.com.cn/cssref/selector_focus.asp) | input:focus           | 选择获得焦点的 input 元素。                            |
  | [:fullscreen](https://www.w3school.com.cn/cssref/selector_fullscreen.asp) | :fullscreen           | 选择处于全屏模式的元素。                               |
  | [:hover](https://www.w3school.com.cn/cssref/selector_hover.asp) | a:hover               | 选择鼠标指针位于其上的链接。                           |
  | [:in-range](https://www.w3school.com.cn/cssref/selector_in-range.asp) | input:in-range        | 选择其值在指定范围内的 input 元素。                    |
  | [:indeterminate](https://www.w3school.com.cn/cssref/selector_indeterminate.asp) | input:indeterminate   | 选择处于不确定状态的 input 元素。                      |
  | [:invalid](https://www.w3school.com.cn/cssref/selector_invalid.asp) | input:invalid         | 选择具有无效值的所有 input 元素。                      |
  | [:lang(*language*)](https://www.w3school.com.cn/cssref/selector_lang.asp) | p:lang(it)            | 选择 lang 属性等于 "it"（意大利）的每个 <p> 元素。     |
  | [:last-child](https://www.w3school.com.cn/cssref/selector_last-child.asp) | p:last-child          | 选择属于其父元素最后一个子元素每个 <p> 元素。          |
  | [:last-of-type](https://www.w3school.com.cn/cssref/selector_last-of-type.asp) | p:last-of-type        | 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。       |
  | [:link](https://www.w3school.com.cn/cssref/selector_link.asp) | a:link                | 选择所有未访问过的链接。                               |
  | [:not(*selector*)](https://www.w3school.com.cn/cssref/selector_not.asp) | :not(p)               | 选择非 <p> 元素的每个元素。                            |
  | [:nth-child(*n*)](https://www.w3school.com.cn/cssref/selector_nth-child.asp) | p:nth-child(2)        | 选择属于其父元素的第二个子元素的每个 <p> 元素。        |
  | [:nth-last-child(*n*)](https://www.w3school.com.cn/cssref/selector_nth-last-child.asp) | p:nth-last-child(2)   | 同上，从最后一个子元素开始计数。                       |
  | [:nth-of-type(*n*)](https://www.w3school.com.cn/cssref/selector_nth-of-type.asp) | p:nth-of-type(2)      | 选择属于其父元素第二个 <p> 元素的每个 <p> 元素。       |
  | [:nth-last-of-type(*n*)](https://www.w3school.com.cn/cssref/selector_nth-last-of-type.asp) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数。                   |
  | [:only-of-type](https://www.w3school.com.cn/cssref/selector_only-of-type.asp) | p:only-of-type        | 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。       |
  | [:only-child](https://www.w3school.com.cn/cssref/selector_only-child.asp) | p:only-child          | 选择属于其父元素的唯一子元素的每个 <p> 元素。          |
  | [:optional](https://www.w3school.com.cn/cssref/selector_optional.asp) | input:optional        | 选择不带 "required" 属性的 input 元素。                |
  | [:out-of-range](https://www.w3school.com.cn/cssref/selector_out-of-range.asp) | input:out-of-range    | 选择值超出指定范围的 input 元素。                      |
  | [::placeholder](https://www.w3school.com.cn/cssref/selector_placeholder.asp) | input::placeholder    | 选择已规定 "placeholder" 属性的 input 元素。           |
  | [:read-only](https://www.w3school.com.cn/cssref/selector_read-only.asp) | input:read-only       | 选择已规定 "readonly" 属性的 input 元素。              |
  | [:read-write](https://www.w3school.com.cn/cssref/selector_read-write.asp) | input:read-write      | 选择未规定 "readonly" 属性的 input 元素。              |
  | [:required](https://www.w3school.com.cn/cssref/selector_required.asp) | input:required        | 选择已规定 "required" 属性的 input 元素。              |
  | [:root](https://www.w3school.com.cn/cssref/selector_root.asp) | :root                 | 选择文档的根元素。                                     |
  | [::selection](https://www.w3school.com.cn/cssref/selector_selection.asp) | ::selection           | 选择用户已选取的元素部分。                             |
  | [:target](https://www.w3school.com.cn/cssref/selector_target.asp) | #news:target          | 选择当前活动的 #news 元素。                            |
  | [:valid](https://www.w3school.com.cn/cssref/selector_valid.asp) | input:valid           | 选择带有有效值的所有 input 元素。                      |
  | [:visited](https://www.w3school.com.cn/cssref/selector_visited.asp) | a:visited             | 选择所有已访问的链接。                                 |

**选择器的优先级依次是: 内联样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器**



### 添加CSS方法

- 外部CSS

  每张 HTML 页面必须在 head 部分的 \<link> 元素内包含对外部样式表文件的引用

  ```html
  <head>
  <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  ```

  *外部 .css 文件不应包含任何 HTML 标签。*

  - "mystyle.css"

  ```css
  body {
    background-color: lightblue;
  }
  
  h1 {
    color: navy;
    margin-left: 20px;
  }
  ```

- 内部CSS

  内部样式在 HTML 页面的 \<head> 部分内的 \<style> 元素中进行定义

- 行内CSS

  ```html
  <h1 style="color:blue;text-align:center;">This is a heading</h1>
  <p style="color:red;">This is a paragraph.</p>
  ```

> 如果在不同样式表中为同一选择器（元素）定义了一些属性，则将使用最后读取的样式表中的值。如果内部样式是在链接到外部样式表*之后*定义的，则看内部样式；反之看外部样式

> 页面中的所有样式将按照以下规则“层叠”为新的“虚拟”样式表，其中第一优先级最高：
>
> 1. 行内样式（在 HTML 元素中）
> 2. 外部和内部样式表（在 head 部分）
> 3. 浏览器默认样式

## CSS RGB 颜色

- `rgb(red, green, blue)`
- `rgb(red, green, blue, alpha)`



## CSS背景属性

#### background-color

#### opacity:

使用 `opacity` 属性为元素的背景添加透明度时，其所有子元素都继承相同的透明度。

#### background-image

```CSS
background-image: url("paper.gif");
```

#### background-repeat

```CSS
background-repeat: repeat-x;/*仅在水平方向重复*/
background-repeat: no-repeat;/*仅显示一次*/
```

#### background-attachment

```css
/*指定背景图像是应该滚动还是固定的（不会随页面的其余部分一起滚动）*/
background-attachment: fixed;
background-attachment: scroll;
```

#### background-position

```css
background-position: right top;
```

#### 简写属性

```css
body {
  background: #ffffff url("tree.png") no-repeat right top;
}
```

#### 所有背景属性

| 属性                                                         | 描述                                               |
| :----------------------------------------------------------- | :------------------------------------------------- |
| [background](https://www.w3school.com.cn/cssref/pr_background.asp) | 在一条声明中设置所有背景属性的简写属性。           |
| [background-attachment](https://www.w3school.com.cn/cssref/pr_background-attachment.asp) | 设置背景图像是固定的还是与页面的其余部分一起滚动。 |
| [background-clip](https://www.w3school.com.cn/cssref/pr_background-clip.asp) | 规定背景的绘制区域。                               |
| [background-color](https://www.w3school.com.cn/cssref/pr_background-color.asp) | 设置元素的背景色。                                 |
| [background-image](https://www.w3school.com.cn/cssref/pr_background-image.asp) | 设置元素的背景图像。                               |
| [background-origin](https://www.w3school.com.cn/cssref/pr_background-origin.asp) | 规定在何处放置背景图像。                           |
| [background-position](https://www.w3school.com.cn/cssref/pr_background-position.asp) | 设置背景图像的开始位置。                           |
| [background-repeat](https://www.w3school.com.cn/cssref/pr_background-repeat.asp) | 设置背景图像是否及如何重复。                       |
| [background-size](https://www.w3school.com.cn/cssref/pr_background-size.asp) | 规定背景图像的尺寸。                               |



## CSS边框属性

```css
p.dotted {border-style: dotted;}/*点状*/
p.dashed {border-style: dashed;}/*虚线*/
p.solid {border-style: solid;}/*实线*/
p.double {border-style: double;}/*双线*/
p.groove {border-style: groove;}/*凹槽*/
p.ridge {border-style: ridge;}/*垄状*/
p.inset {border-style: inset;}/*3D inset 边框*/
p.outset {border-style: outset;}/*3D outset 边框*/
p.none {border-style: none;}
p.hidden {border-style: hidden;}
p.mix {border-style: dotted dashed solid double;}

p.three {
  border-style: solid;
  border-radius: 5px;/*圆角*/
  border-width: 25px 10px 4px 35px; /* 上边框 25px，右边框 10px，下边框 4px，左边框 35px */
}

p {
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
}
```

## CSS轮廓

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [outline](https://www.w3school.com.cn/cssref/pr_outline.asp) | 简写属性，在一条声明中设置 outline-width、outline-style 以及 outline-color。 |
| [outline-color](https://www.w3school.com.cn/cssref/pr_outline-color.asp) | 设置轮廓的颜色。                                             |
| [outline-offset](https://www.w3school.com.cn/cssref/pr_outline-offset.asp) | 指定轮廓与元素的边缘或边框之间的空间。                       |
| [outline-style](https://www.w3school.com.cn/cssref/pr_outline-style.asp) | 设置轮廓的样式。                                             |
| [outline-width](https://www.w3school.com.cn/cssref/pr_outline-width.asp) | 设置轮廓的宽度。                                             |

轮廓与[边框](https://www.w3school.com.cn/css/css_border.asp)不同！不同之处在于：轮廓是在元素边框之外绘制的，并且可能与其他内容重叠。同样，轮廓也不是元素尺寸的一部分；元素的总宽度和高度不受轮廓线宽度的影响。

## CSS外边距

```css
p {
  margin: 25px 50px 75px 100px;
}
```

```css
<head>
<style>
div {
  width:300px;
  margin: auto;
  border: 1px solid red;
}
</style>
</head>
<body>

<h1>使用 margin:auto</h1>

<p>您可以将 margin 属性设置为 auto 以自动将元素在其容器中水平居中。然后，该元素将占据指定的宽度，剩余空间将在左右外边距之间平均分配：</p>

<div>
由于 margin: auto;，这个 div 将水平居中。
</div>

</body>
```

[==CSS 外边距合并==]([CSS 外边距合并 (w3school.com.cn)](https://www.w3school.com.cn/css/css_margin_collapse.asp))

内边距：padding

## CSS设置宽度和高度

```css
/*当浏览器窗口小于元素的宽度（500px）时，会发生之前那个 <div> 的问题。然后，浏览器会将水平滚动条添加到页面。在这种情况下，使用 max-width 能够改善浏览器对小窗口的处理。*/
div {
  max-width: 500px;
  height: 100px;
  background-color: powderblue;
}
```



## CSS文本

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [color](https://www.w3school.com.cn/cssref/pr_text_color.asp) | 设置文本颜色。                                               |
| [direction](https://www.w3school.com.cn/cssref/pr_text_direction.asp) | 指定文本的方向 / 书写方向。                                  |
| [letter-spacing](https://www.w3school.com.cn/cssref/pr_text_letter-spacing.asp) | 设置字符间距。                                               |
| [line-height](https://www.w3school.com.cn/cssref/pr_dim_line-height.asp) | 设置行高。                                                   |
| [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp) | 指定文本的水平对齐方式。                                     |
| [text-decoration](https://www.w3school.com.cn/cssref/pr_text_text-decoration.asp) | 指定添加到文本的装饰效果。（删除线、下划线）                 |
| [text-indent](https://www.w3school.com.cn/cssref/pr_text_text-indent.asp) | 指定文本块中首行的缩进。                                     |
| [text-shadow](https://www.w3school.com.cn/cssref/pr_text-shadow.asp) | 指定添加到文本的阴影效果。（水平阴影、垂直阴影、模糊效果）   |
| [text-transform](https://www.w3school.com.cn/cssref/pr_text_text-transform.asp) | 控制文本的大小写。                                           |
| [text-overflow](https://www.w3school.com.cn/cssref/pr_text-overflow.asp) | 指定应如何向用户示意未显示的溢出内容。                       |
| [unicode-bidi](https://www.w3school.com.cn/cssref/pr_unicode-bidi.asp) | 与 direction 属性一起使用，设置或返回是否应重写文本来支持同一文档中的多种语言。 |
| [vertical-align](https://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp) | 设置元素的垂直对齐方式。                                     |
| [white-space](https://www.w3school.com.cn/cssref/pr_text_white-space.asp) | 指定如何处理元素内的空白。                                   |
| [word-spacing](https://www.w3school.com.cn/cssref/pr_text_word-spacing.asp) | 设置单词间距。                                               |

- 当 `text-align` 属性设置为 "justify" 后，将拉伸每一行，以使每一行具有相等的宽度，并且左右边距是直的（就像在杂志和报纸中）：

- ```css
  /*从右到左*/
  p {
    direction: rtl;
    unicode-bidi: bidi-override;
  }
  ```



## CSS文本框



## CSS字体

```css
body{font-family:"Microsoft Yahei";}
```

### 谷歌字体

```html
<html>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
<style>
body {
  font-family: "Sofia";
  font-size: 22px;
}
</style>
</head>
<body>

<h1>Sofia Font</h1>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>

</body>
</html>
```

### 所有 CSS 字体属性

| 属性                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [font](https://www.w3school.com.cn/cssref/pr_font_font.asp)  | 简写属性。在一条声明中设置所有字体属性。 |
| [font-family](https://www.w3school.com.cn/cssref/pr_font_font-family.asp) | 规定文本的字体系列（字体族）。           |
| [font-size](https://www.w3school.com.cn/cssref/pr_font_font-size.asp) | 规定文本的字体大小。                     |
| [font-style](https://www.w3school.com.cn/cssref/pr_font_font-style.asp) | 规定文本的字体样式。                     |
| [font-variant](https://www.w3school.com.cn/cssref/pr_font_font-variant.asp) | 规定是否以小型大写字母的字体显示文本。   |
| [font-weight](https://www.w3school.com.cn/cssref/pr_font-weight.asp) | 规定字体的粗细。                         |



## 盒模型

### 块级元素、内联元素、内联块状元素

display: inline-block ：

1、和其他元素都在一行上；

2、元素的高度、宽度、行高以及顶和底边距都可设置。(除此之外设置宽度和高度没用)

display:none; (隐藏元素)

padding:元素内容与边框之间的间距

margin:元素与其他元素间的距离（简写顺序是上右下左）



## 布局模型

1、流动模型（Flow）
2、浮动模型 (Float)
3、层模型（Layer）

### 浮动模型

使元素可以在同一行

```css
#div1{float:left;}
#div2{float:right;}
```

### 层模型

1、**绝对定位**(position: absolute)

相对于浏览器窗口

```css
position:absolute;
left:100px;
top:50px;
```

2、**相对定位**(position: relative)

(浮起一块）相对于**以前的位置移动，**移动的方向和幅度由left、right、top、bottom属性确定，偏移前的位置保留不动。

3、**固定定位**(position: fixed)

相对于浏览器窗口 但**滚动时位置不变**

4、Relative与Absolute组合使用

相对于**其它元素**进行定位(前辈元素是relative,定位元素加入absolute)

```css
#box1{
    width:200px;
    height:200px;
    position:relative;        
}
#box2{
    position:absolute;
    top:20px;
    left:30px;         
}

<div id="box1"><!--参照定位的元素-->
    <div id="box2">相对参照元素进行定位</div><!--相对定位元素-->
</div>
```



## flex弹性盒模型

1、设置display: flex属性可以把块级元素在一排显示。

2、flex需要添加在父元素上，改变子元素的排列顺序。

3、默认为从左往右依次排列,且和父元素左边没有间隙。

- **justify-content**属性（横轴排列方式）

justify-content: flex-start | flex-end | center | space-between | space-around;

- **align-items**属性设置纵轴排列方式

`flex-start`：默认值，左对齐（顶部）

`flex-end`：交叉轴的终点对齐（底部）

`center`： 交叉轴的中点对齐

`baseline`：项目的第一行文字的基线对齐。

`stretch（默认值）`：如果项目未设置高度或设为auto，将占满整个容器的高度。

- **flex**属性 设置子元素相对于父元素的占比

给子元素设置了flex之后,其宽度属性会失效



## 水平居中

### 行内元素居中

**父元素**设置 `text-align:center`

### 定宽块状元素

设置“**左右margin**”值为“**auto**”

- 已知宽高实现盒子水平垂直居中

  ```css
  <style type="text/css">
      .box {
          border: 1px solid #00ee00;
          height: 300px;
          position:relative;
      }
  
      .box1 {
          position:absolute;
          width: 200px;
          height: 200px;
          border: 1px solid red;
          top:50%;
          left:50%;
          margin-top:-100px;
          margin-left:-100px;
      }
      </style>
  </head>
  
  <body>
      <div class="box">
          <div class="box1"></div>
      </div>
  </body>
  ```

  ![image-20230825103314832](C:/Users/20643/AppData/Roaming/Typora/typora-user-images/image-20230825103314832.png)

- 未知宽高实现水平居中

  同上，最后使用`transform: translate(-50%, -50%);`给上和左都位移-50%距离

