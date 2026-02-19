# HTML_02

## 索引
- [HTML水平线](#html水平线)
- [HTML注释](#html注释)
- [HTML折行](#html折行)
- [HTML文本格式化](#html文本格式化)
- [HTML链接](#html链接)
- [HTML链接属性](#html链接属性)

## *HTML水平线*
- `<hr>`标签在HTML页面中创建水平线
- hr元素可用于分隔内容
- 实例：
  `<p>这是一个段落。</p>`
  `<hr>`
  `<p>这是一个段落。</p>`

## *HTML注释*
- 将注释插入HTML代码中，提高其可读性
- 实例：
  `<!--这是一个注释-->`

## *HTML折行*
- 使用`<br>`标签，在不产生一个新段落的情况下进行换行
- 实例：
  `<p>这个<br>段落<br>演示了分行的效果</p>`

## *HTML文本格式化*
- 加粗文本使用`<b>`或`<strong>`

  实例：`<b>加粗文本</b>`
- 斜体文本使用`<i>`

  实例：`<i>斜体文本</i>`
- 标记代码片段使用`<code>`

  实例：`<code>print("Hello World!")</code>`

- 下标使用`<sub>`

  实例：`这是<sub>下标</sub>`

- 上标使用`<sup>`

  实例：`这是<sup>上标</sup>`

- 使用`pre`标签对空行和空格进行控制

  实例：

       `<pre>`

       对空行和   空格

       进行控制

## *HTML链接*
- HTML链接通过`<a>`标签创建，通常用于将用户从一个页面导航到另一个页面、从一个部分跳转到页面中的另一个部分、下载文件、打开电子邮件应用程序或执行 JavaScript 函数等
- 基本语法:`<a herf="URL">链接文本</a>`

  `<a>`标签：定义了一个超链接。它是HTML中用来创建可点击链接的主要标签

  `herf`属性：指定目标URL，当点击链接时，浏览器将导航到此URL

- 实例：

  `<a href="/index.html">本文本</a> 是一个指向本网站中的一个页面的链接。`

  `<a href="https://www.microsoft.com/">本文本</a> 是一个指向万维网上的页面的链接。`


## *HTML链接属性*
- herf：定义链接目标

  这是超链接最重要的属性，用来指定链接的目的地。

  实例：

  `<a href="https://www.example.com">访问 Example</a>`

- target：定义链接的打开方式

  （1）_blank：在新窗口或新标签页中打开链接

  （2）_self：在当前窗口或标签页中打开链接（默认）

  （3）_parent：在父框架中打开链接

  （4）_top：在整个窗口中打开链接，取消任何框架

  实例：`<a href="https://www.example.com" target="_blank" rel="noopener">新窗口打开 Example</a>`

- rel：定义链接与目标页面的关系

  （1）nofollow：表示搜索引擎不应跟踪该链接，常用于外部链接。

  （2）noopener 和 noreferrer: 防止在新标签中打开链接时的安全问题，尤其是使用 target="_blank" 时。

   实例：`<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">安全链接</a>`

- download：提示浏览器下载链接目标而不是导航到该目标。

  如果指定了文件名，浏览器会提示下载并保存为指定文件名。

  实例：`<a href="file.pdf" download="example.pdf">下载文件</a>`

- title：定义链接的额外信息，当鼠标悬停在链接上时显示的工具提示。

  实例：`<a href="https://www.example.com" title="访问 Example 网站">访问 Example</a>`

- id：用于链接锚点，通常在同一页面中跳转到某个特定位置。

  实例：`<a href="#section1">跳转到第1部分</a>`

       `div id="section1">这是第1部分</div>`

- class: 用于指定元素的类名（CSS中定义）

  实例：`<a href="https://www.example.com" class="external-link">外部链接</a>`

- style：直接在元素上定义CSS样式

  实例：`<a href="https://www.example.com" style="color: red;">红色链接</a>`
