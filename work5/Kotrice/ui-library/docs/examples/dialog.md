# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

弹窗一个对话框，可以起到提醒用户或者其他作用。
组件接收一个`v-model`(`modelValue`)，其类型为`Boolean`，用来控制组件的显示与关闭，可以传入`title`属性（可选），用来当做弹窗的标题，如果有用`header`的具名插槽，那`header`中的内容会将`title`传的内容覆盖。另外的，还有`default`插槽（控制主要内容）和`footer`插槽（控制弹窗底部的内容，可以自行传入按钮等来进行控制）。

:::demo

```vue
<template>
  <x-button @click="showDialog = true" >Show Dialog</x-button>
  <x-dialog v-model="showDialog" title="Dialog">
    <span>Content</span>
    <template #footer>
      <x-button type="primary" @click="showDialog = false">
        Confirm
      </x-button>
    </template>
  </x-dialog>  
</template>

<script setup>
  import { ref } from 'vue'
  const showDialog = ref(false)
</script>

<style>
  .x-dialog-footer {
    text-align: right;
  }
</style>
```

:::

### 自定义头部

利用`title`属性或者`header`具名插槽实现，具体可以看上方的基础用法。

### 自定义内容

利用`default`默认插槽实现，具体可以看上方的基础用法。

### 自定义底部

利用`footer`具名插槽实现，具体可以看上方的基础用法。

## Before-Close

`Dialog`接收一个`before-close`属性，属性类型为函数(`Function(done => void) => void`)，其中函数有一个参数`done`，这是一个回调函数，调用`done`是才会`Dialog`真正关闭。

:::demo

```vue
<template>
  <x-button @click="showDialog = true" >Show Dialog</x-button>
  <x-dialog 
    v-model="showDialog"
    title="Dialog"
    :before-close="beforeClose"
  >
    <span>Content</span>
    <template #footer>
      <x-button type="primary" @click="showDialog = false">
        Confirm
      </x-button>
    </template>
  </x-dialog>  
</template>

<script setup>
  import { ref } from 'vue'
  const showDialog = ref(false)
  function beforeClose(done) {
    alert('Before Close')
    done()
  }
</script>
```

:::

当然，以上实例中，Confirm按钮按下之后没有出现触发`before-close`，因为Confirm将其逻辑写死了，这是由开发者操作的，所以可以自行更改即可。

## 事件

这里提供`open`和`close`两个事件，分别是`Dialog`开启的时候，和`Dialog`关闭的时候触发。

:::demo

```vue
<template>
  <x-button @click="showDialog = true" >Show Dialog</x-button>
  <x-dialog 
    v-model="showDialog"
    title="Dialog"
    @open="handleOpen"
    @close="handleClose"
  >
    <span>Content</span>
    <template #footer>
      <x-button type="primary" @click="showDialog = false">
        Confirm
      </x-button>
    </template>
  </x-dialog>  
</template>

<script setup>
  import { ref } from 'vue'
  const showDialog = ref(false)
  function handleOpen() {
    alert('Open!')
  }
  function handleClose() {
    alert('Close!')
  }
</script>
```

:::

## API

### Props
| 属性名                | 说明                                                         | 类型                                                         | 可选值 | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----- | :----- |
| model-value / v-model | 是否显示 Dialog                                              | `boolean`                                                    | —      | —      |
| title                 | Dialog 对话框 Dialog 的标题， 也可通过具名 slot 传入         | `string`                                                     | —      | —      |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候 | `Function`(done: () => void) => void (done是一个函数 用来关闭 Dialog) | —      | —      |

### Slots

| 插槽名  | 说明                                          |
| :------ | :-------------------------------------------- |
| default | Dialog 的内容                                 |
| header  | 对话框标题的内容；会替换属性传入的title部分。 |
| footer  | Dialog 按钮操作区的内容                       |

### Events

| 事件名 | 说明              | 参数 |
| :----- | :---------------- | :--- |
| open   | Dialog 打开的回调 | —    |
| close  | Dialog 关闭的回调 | —    |

## 碎碎念😭
- 关于`draggable`，本来想直接用`vueuse`里面的`draggable`，但是感觉耍小聪明就算了.
- 关于`lock-scroll`，我想是可以直接用`原生js`弄到`body`元素，然后把`scrollbar`扣掉，但是感觉用了`vue`还直接触碰`原生DOM元素`不太好，也就算了.
