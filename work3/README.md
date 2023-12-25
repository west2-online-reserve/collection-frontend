# Frontends 第三轮考核

## 目的

- 学习使用`Vue`框架，特别是`Vue3`版本和组合式API的写法
- 学习使用`Pinia`状态管理库
- 学习使用`Vue Router`路由库
- 学习使用`Element Plus`组件库
- 学习使用`Vite`构建工具

## 任务

1. 使用`Vite`构建一个`Vue3`项目，并在项目中引入`Element Plus`组件库、`Vue Router`路由库以及`Pinia`状态管理库
2. 使用`Vue Router`实现一个简单的路由功能，包括但不限于以下几个页面：
   - 注册，登录页，注册页要求输入用户名、密码、邮箱信息，请使用正则表达式对输入的信息进行校验，要求用户名长度不小于6位，密码长度不小于8位，同时包含大小写字母，邮箱格式正确，注册完毕后将信息保存至`localStorage`中，用户登录时需要校验用户名和密码和是否正确，正确则跳转至TodoList页面，并将用户信息保存至`Pinia`中，错误则提示用户用户名或密码错误
   - TodoList页面，
      - 顶部是一个`Banner`，`Banner`的左侧有两个菜单导航栏，分别是`TodoList`和`表格展示`，和当前路由匹配的导航栏颜色突出显示，右侧显示用户的用户名和一个退出按钮，点击退出按钮则退出登录，跳转至登录页面
      - 页面中间是一个输入框和一个添加按钮，输入框用于输入待办事项，点击添加按钮则将输入框中的内容添加至待办事项列表中，数据保存在`Pinia`中
   - 表格展示页面
      - 一个表格页面，用于展示保存在`Pinia`中的待办事项列表，表格中包含待办事项的内容、创建时间、完成时间、操作等信息，操作中包含完成按钮、修改按钮和删除按钮，点击完成按钮则将待办事项状态改为已完成，点击修改按钮会跳出一个Dialog对话框，里面包含一个输入框，存放的是原来的待办事项的内容，修改输入框后点击确认键，可以修改对应储存在`Pinia`中的数据，点击删除按钮则将待办事项从列表中删除
      - 表格左上角有一个时间选择器和搜索框，用于筛选在对应时间内和包含对应搜索字的待办事项，时间选择器或搜索框中输入内容后，表格中只显示符合要求的待办事项
3. 使用`Pinia`实现一个简单的状态管理功能，包括但不限于以下几个状态：
   - 用户信息，包括用户名、邮箱等
   - 待办事项列表
   - 使用`pinia-plugin-persistedstate`插件，从而将`Pinia`中的数据保存在`localStorage`中，刷新页面后数据不会丢失
4. 参考设计稿，可以模仿设计稿的页面进行布局 https://www.figma.com/file/Ezhm17ZLLc0RZkepRHK8E4/%E8%A5%BF%E4%BA%8C%E5%89%8D%E7%AB%AF%E9%A1%B5%E9%9D%A2

## 提示
可能会用到的`Element Plus`组件：
- `ElButton`按钮 (用于各个位置的按钮)
- `ElContainer`容器 (用于布局)
- `ElInput`输入框 (用于输入待办事项，登录注册等)
- `ElForm`表单 (用于登录和注册的校验)
- `ElTable`表格 (用于展示待办事项列表)
- `ElDatePicker`日期选择器 (用于筛选待办事项)
- `ElDialog`对话框 (用于修改待办事项)
- `ElMessage`消息提示 (用于提示用户登录成功或失败)
- `ElMenu`菜单 (用于导航栏)


## Bonus
1. 为表格添加分页功能
2. 为表格添加排序功能
3. 允许用户为每个任务设置分类和标签。这样用户可以根据需要筛选和查找特定类型的任务。


## 参考
1. Vue3官方文档(**请在左上角的API的风格偏好调至组合式**) https://cn.vuejs.org/guide/introduction.html
2. Vite官方文档 https://cn.vitejs.dev/guide/
3. Vue3官方互动指南(**请在左上角的API的风格偏好调至组合式**)  https://cn.vuejs.org/tutorial/#step-1
4. Vue Router官方文档 https://router.vuejs.org/zh/
5. Pinia官方文档 https://pinia.vuejs.org/zh/
6. Element Plus官方文档 https://element-plus.gitee.io/zh-CN/guide/quickstart.html
7. b站教程挺多的，随便找个简短的就行