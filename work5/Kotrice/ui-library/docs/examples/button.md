# Button 按钮

常规的按钮操作

## 基础用法

基础的按钮用法

### 不同类型

使用 ``type`` 定义按钮的类型

:::demo

```vue
<template>
  <div class="x-button-container">
    <x-button type="primary">Primary</x-button>
    <x-button type="success">Success</x-button>
    <x-button type="warning">Warning</x-button>
    <x-button type="danger">Danger</x-button>
    <x-button type="info">Info</x-button>
  </div>
</template>

<style>
  .x-button-container {
    display: flex;
  }
  .x-button {
    margin-right: 10px;
  }
</style>
``` 

:::

### 不同尺寸

使用 ``size`` 定义按钮的尺寸

:::demo

```vue
<template>
  <div class="x-button-container">
    <x-button size="small" >Small</x-button>
    <x-button size="default" >Default</x-button>
    <x-button size="large" >Large</x-button>
  </div>
</template>

<style>
  .x-button-container {
    display: flex;
  }
  .x-button {
    margin-right: 10px;
  }
</style>
```

:::

### 圆角

通过 ``round`` 控制是否开启圆角

:::demo

```vue
<template>
  <x-button round >Round</x-button>
</template>
```
:::

### 禁用状态

通过 ``disabled`` 控制是否禁用该按钮

:::demo

```vue
<template>
  <x-button disabled >Disabled</x-button>
</template>
```
:::

## API

### Props

| 属性名   | 说明               | 类型                                                    | 默认值    |
| :------- | :----------------- | :------------------------------------------------------ | :-------- |
| size     | 尺寸               | `'large'`/`'default'`/`'small'`                         | 'default' |
| type     | 类型               | `'primary'`/`'success'`/`'warning'`/`'danger'`/`'info'` | 'info'    |
| round    | 是否为圆角按钮     | `boolean`                                               | false     |
| disabled | 按钮是否为禁用状态 | `boolean`                                               | false     |

### Slots

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |

## 碎碎念🥰
- 最喜欢的一集🥰
