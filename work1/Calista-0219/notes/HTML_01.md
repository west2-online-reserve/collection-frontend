# HTML-01

# 索引
- [什么是HTML](#什么是html)
- [HTML标签](#html标签)
- [HTML元素](#html元素)
- [HTML标题](#html标题)
- [HTML段落](#html段落)
- [HTML链接](#html链接)
- [HTML图像](#html图像)
- [HTML元素语法](#html元素语法)
- [嵌套的HTML元素](#嵌套的html元素)
- [HTML空元素](#html空元素)
- [HTML属性](#html属性)
- [全局属性](#全局属性)
- [某些元素的属性](#某些元素的属性)
- [布尔属性](#布尔属性)
- [自定义属性](#自定义属性)
- [事件处理属性](#事件处理属性)
## *什么是HTML*
- HTML（HyperText Markup Language）超文本标记语言，是用来描述网页的一种语言。
- HTML不是一种编程语言，而是一种**标记**语言
- 标记语言是一套**标记标签**
- 负责网页的**结构**

## *HTML标签*
- HTML标签是由**尖括号**包围的关键词，比如<html>
- HTML标签通常是**成对**出现的，比如<b>和</b>
- 标签对中的第一个标签是**开始标签**，第二个标签是**结束标签**

## *HTML元素*
- “HTML标签”和“HTML元素”通常都是描述同样的意思
- 但是严格地讲，一个HTML元素包含了开始标签与结束标签

## *HTML标题*
- HTML标题是通过\<h1>-\<h6>标签来定义的
- `<h1>`定义最大的标题，`<h6>`定义最小的标题
- 实例：

  `<h1>这是标题一<\h1>`

  `<h2>这是标题二<\h2>`

  `<h3>这是标题三<\h3>`

## *HTML段落*
- HTML段落是通过标签\<p>来定义的
- 实例：

  `<p>这是一个段落。</p>`

  `<p>这也是一个段落。</p>`

## *HTML链接*
- HTML链接是通过标签\<a>来定义的
- 实例：

  `<a herf="https://github.com">这是一个链接</a>`

## *HTML图像*
- HTML图像是通过标签\<img>来定义的
- 实例：

     `<img src="/images/logo.png" width="258" height="39"/>`
- Tip:图像的**名称**和**尺寸**是以**属性**的形式提供的

## *HTML元素语法*
- HTML元素以**开始标签**起始
- HTML元素以**结束标签**终止
- **元素的内容**是开始标签与结束标签之间的内容
- 某些HTML元素具有**空内容**
- 空元素**在开始标签中进行关闭**（以开始标签的结束而结束）
- 大多数HTML元素可具有**属性**

## *嵌套的HTML元素*
- 大多数HTML元素可以嵌套
- HTML文档由相互嵌套的HTML元素构成

## *HTML空元素*
- 没有内容的HTML元素被称为空元素。空元素是在开始标签中关闭的。
- \<br>就是没有关闭标签的空元素（\<br>标签定义换行）

## *HTML属性*
- 属性是HTML元素提供的附加信息
- 属性通常出现在HTML标签的开始标签中，用于定义元素的行为、样式、内容或其他特性
- 属性总是以**name="value"** 的形式写在标签内，**name**是属性的名称，**value**是属性的值

## *全局属性*
- **id**：为元素指定唯一的标识符
  
  `<div id="header">This is the header</div>`

- **class**: 为元素指定一个或多个类名，用于CSS或JavaScript选择

   `<p class="text highlight">This is a highlight text.</p>`

- **style**: 用于直接在元素上应用CSS样式

   `<p style="color:blue;front-size:14px;">This is a styled paragraph.</p>`

- **title**: 为元素提供额外的提示信息，通常在鼠标悬停时显示

  `<abbr title="HyperText Markup Language">HTML</abbr>`

- **data-***: 用于存储自定义数据，通常通过JavaScript访问

   `<div data-user-id="12345">User Info</div>`

## *某些元素的属性*
某些属性仅适用于特定的HTML元素

- **herf**（用于`<a>`和`<link>`元素）：指定链接的目标URL

  '<a herf="https://www.example.com">Visit Example</a>`

- **src**(用于`<img>`,`<script>`,`<iframe>`等元素）：指定外部资源的URL

  `<img src="image.jpg" alt="An example image">`

- **alt**(用于`<img>`元素）：当图像无法正常显示时，为图像提供替代文本

  `<img src="image.jpg" alt="An example image">`

- **type**(用于`<input>`和`<button>`元素）：指定输入控件的类型

  `<input type="text" value="Default Value">`

- **value**(用于`<input>`,`<button>`,`<option>`等元素）：指定元素的初始值

  `<input type="text" value="Default Value">`

- **disabled**(用于表单元素）：禁用元素，使其不可交互

  `<input type="text" disabled>`

- **checked**(用于`<input type="checkbox:>`和`<input type="radio">`):指定复选框或单选按钮是否被选中

  `<input type="checkbox" checked>`

- **placeholder**(用于`<input>`和`<textarea>`元素）：在输入框中显示提示文本

  `<input type="text" placeholder="Enter your email">`

- **target**（用于`<a>`和`<from>`元素）：指定链接或表单提交的目标窗口或框架

  `<a herf="https://www.example.com" target="_blank">Open in new tab</a>`

## *布尔属性*
布尔属性是指不需要值的属性，它们的存在即表示true，不存在则表示false

- **disabled**: 禁用元素

  `<input type="text" disabled>

- **readonly**: 使输入框只读

  `<input type="text" readonly>`

- **required**: 指定输入字段为必填项

  `<input type="text" required>`

- **autoplay**（用于`<audo>`和`<video>`元素）：自动播放媒体

  `<video src="video.mp4" autoplay</video>`

## *自定义属性*
HTML5引入了data-*属性，允许开发者自定义属性来存储额外的数据

-**data-***：用于存储自定义数据，通常通过JavaScript访问

  `<div data-user-id="12345" data-role="admin">User Info</div>`

## *事件处理属性*
HTML元素可以通过事件处理属性来响应特定的事件，如点击、鼠标悬停等

- **onclick**: 当用户点击元素时触发
 
  `<button onclick="alert("Button clicked!')">Click Me</button>

- **onmouseover**: 当用户将鼠标悬停在元素上时触发

  `<div onmouseover="this.style.backgroundColor='yellow'">Hover over me</div>`

- **onchange**: 当元素的值发生变化时触发

  `<input type="text" onchange="alert('Value changed!')">`


  
