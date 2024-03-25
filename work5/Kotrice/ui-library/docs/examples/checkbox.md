# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

`chechbox`存在受控和非受控两种状态，即有没有传v-model(modelValue)(属性为`boolean`)的两种状态。`label`属性对应着对该`checkbox`的介绍。非受控状态时，也可以用`checked`属性控制初始是否勾选

:::demo

```vue
<template>
  <x-checkbox label="checkbox01"/>
  <x-checkbox label="checkbox02" v-model="isChecked" />
  <x-checkbox label="checkbox03"  checked />
</template>

<script setup>
  import { ref } from 'vue'
  const isChecked = ref(true) 
</script>

<style>
  .x-checkbox-div {
    margin-right: 20px;
  }
</style>

```

:::

## 禁用状态

利用`disabled`属性进行控制

:::demo

```vue
<template>
  <x-checkbox label="checkbox01" disabled />
  <x-checkbox label="checkbox02" disabled v-model="isChecked" />
  <x-checkbox label="checkbox03" disabled checked />
</template>

<script setup>
  import { ref } from 'vue'
  const isChecked = ref(true) 
</script>

<style>
  .x-checkbox-div {
    margin-right: 20px;
  }
</style>
```

:::

## Change事件

当`checked`状态改变时，会触发`change`事件，其中会返回最新的状态值

:::demo

```vue
<template>
  <x-checkbox label="Click To Change" @change="handleChange" />
</template>

<script setup>
  function handleChange(value) {
    alert(`Change! --- ${value}`)
  }
</script>

```

:::

## Checkbox-Group

用来包裹`Checkbox`组件，通过内部逻辑达到控制一组的`Checkbox`的目的。

通过绑定一个`v-model(modelValue)`，类型为字符串数组，值为初始勾选的`checkbox`的`label`值

:::demo

```vue
<template>
  <x-checkbox-group v-model="checkArray">
    <x-checkbox label="checkbox01"/>
    <x-checkbox label="checkbox02"/>
    <x-checkbox label="checkbox03"/>
    <x-checkbox label="checkbox04"/>
  </x-checkbox-group>
</template>

<script setup>
  import { ref } from 'vue'
  const checkArray = ref(['checkbox01', 'checkbox03'])
</script>
```

:::

## 全体禁用
通过`Checkbox-Group`的`disabled`属性控制

:::demo

```vue
<template>
  <x-checkbox-group v-model="checkArray" disabled>
    <x-checkbox label="checkbox01"/>
    <x-checkbox label="checkbox02"/>
    <x-checkbox label="checkbox03"/>
    <x-checkbox label="checkbox04"/>
  </x-checkbox-group>
</template>

<script setup>
  import { ref } from 'vue'
  const checkArray = ref(['checkbox01', 'checkbox03'])
</script>
```

:::

## 最大和最小勾选数

通过`max`和`min`属性控制

:::demo

```vue
<template>
  <x-checkbox-group v-model="checkArray" :min="1" :max="3">
    <x-checkbox label="checkbox01"/>
    <x-checkbox label="checkbox02"/>
    <x-checkbox label="checkbox03"/>
    <x-checkbox label="checkbox04"/>
  </x-checkbox-group>
</template>

<script setup>
  import { ref } from 'vue'
  const checkArray = ref(['checkbox01', 'checkbox03'])
</script>
```

:::

## Change事件

当某个`Checkbox`状态改变时，会触发`change`事件，其中会返回最新的勾选的数组

:::demo

```vue
<template>
  <x-checkbox-group v-model="checkArray" :min="1" :max="3" @change="handleChange" >
    <x-checkbox label="checkbox01"/>
    <x-checkbox label="checkbox02"/>
    <x-checkbox label="checkbox03"/>
    <x-checkbox label="checkbox04"/>
  </x-checkbox-group>
</template>

<script setup>
  import { ref } from 'vue'
  const checkArray = ref(['checkbox01', 'checkbox03'])
  function handleChange(value) {
    alert(`Change! --- ${value}`)
  }
</script>
```

:::

## API

### Checkbox Props

| 属性名                | 说明                                                   | 类型      | 默认值 |
| :-------------------- | :----------------------------------------------------- | :-------- | :----- |
| model-value / v-model | 选中项绑定值                                           | `boolean` | —      |
| label                 | 选中状态的值（只有在`checkbox-group`时有效），选项标签 | `string`  | —      |
| checked               | 非受控状态下当前是否勾选                               | `boolean` | false  |
| disabled              | 是否禁用                                               | `boolean` | false  |

### Checkbox Events

| 事件名 | 说明                     | 类型                              |
| :----- | :----------------------- | :-------------------------------- |
| change | 当绑定值变化时触发的事件 | `Function`(value: string) => void |

### Checkbox Slots

| 插槽名  | 说明                                      |
| :------ | :---------------------------------------- |
| default | 自定义默认内容，不存在时使用label属性的值 |

### CheckboxGroup Props

| 属性名                | 说明                           | 类型      | 默认值 |
| :-------------------- | :----------------------------- | :-------- | :----- |
| model-value / v-model | 绑定值                         | string[]  | []     |
| disabled              | 是否禁用                       | `boolean` | false  |
| min                   | 可被勾选的 checkbox 的最小数量 | `number`  | —      |
| max                   | 可被勾选的 checkbox 的最大数量 | `number`  | —      |

### CheckboxGroup Events

| 事件名 | 说明                     | 类型                                |
| :----- | :----------------------- | :---------------------------------- |
| change | 当绑定值变化时触发的事件 | `Function`(value: string[]) => void |

### CheckboxGroup Slots

| 插槽名  | 说明           | 子标签   |
| :------ | :------------- | :------- |
| default | 自定义默认内容 | Checkbox |

## 碎碎念😭
- `Checkbox`组件本来写的还挺顺，后面跟`CheckboxGroup`套在一块的时候一切就都乱了，所以现在去看他俩的结构，可以说是`一坨😭`!
