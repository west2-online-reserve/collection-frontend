# Pagination 分页

当数据量过多时，使用分页分解数据。

## ~~基础~~(混合)用法

由于并没有设置自定义分布等，所以一下就`Total`、`Prev`、`Pager`、`Next`、`Jumper`，按照这个顺序全上了.

`total`属性设置总共的条目个数，`page-size`属性设置每页显示条目的个数.点击`...`折叠起来的按钮，默认前进/后退5格（其实与`pager-count`相关）

(PS:这边如果total设置太大会导致样式变丑，因此我这边先把`Total`和J`Jumper`抹掉)

:::demo

```vue
<template>
  <x-pagination
    class="remove"
    :total="20"
    v-model:page-size="pageSize"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
</script>

<style lang="scss">
  .remove {
    .x-pagination-total,
    .el-select,
    .x-jumper {
      display: none;
    }
  }
</style>

```

:::

## Current-page

通过`current-page`属性的值进行更改

:::demo

```vue
<template>
  <x-pagination
    class="remove"
    :total="20"
    v-model:page-size="pageSize"
    v-model:pager-count="pagerCount"
    :current-page="currentPage"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
  const pagerCount = ref(5)
  const currentPage = ref(7)
</script>

```

:::


## Pager-count

设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠（默认是7），这玩意需要是个`奇数`。

:::demo

```vue
<template>
  <x-pagination
    class="remove"
    :total="20"
    v-model:page-size="pageSize"
    v-model:pager-count="pagerCount"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
  const pagerCount = ref(5)
</script>

```

:::

## Jumper

用来跳转到指定页数

:::demo

```vue
<template>
  <x-pagination
    class="removeTotal"
    :total="100"
    v-model:page-size="pageSize"
    v-model:pager-count="pagerCount"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
  const pagerCount = ref(5)
</script>

<style lang="scss">
  .removeTotal {
    .x-pagination-total,
    .el-select {
      display: none;
    }
  }
</style>

```

:::

## Total

手动更改每页条目数，可以通过绑定`page-sizes`来更改`select`中的选项值

:::demo

```vue
<template>
  <x-pagination
    class="removeJumper"
    :page-sizes="pageSizes"
    :total="40"
    v-model:page-size="pageSize"
    v-model:pager-count="pagerCount"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
  const pagerCount = ref(5)
  const pageSizes = ref([10, 20, 30, 114514, 1919810])
</script>

<style lang="scss">
  .removeJumper {
    .x-jumper {
      display: none;
    }
  }
</style>

```

:::


## 大杂烩

:::demo

```vue
<template>
  <x-pagination
    :page-sizes="pageSizes"
    :total="40"
    v-model:page-size="pageSize"
    v-model:pager-count="pagerCount"
    :current-page="currentPage"
  />
</template>

<script setup>
  import { ref } from 'vue'
  const pageSize = ref(1)
  const pagerCount = ref(5)
  const pageSizes = ref([10, 20, 30, 114514, 1919810])
  const currentPage = ref(17)
</script>

```

:::

## API

### Props

| 属性名                              | 说明                                                         | 类型             | 默认值                    |
| :---------------------------------- | :----------------------------------------------------------- | :--------------- | :------------------------ |
| page-size / v-model:page-size       | 每页显示条目个数                                             | `number`         | —                         |
| total                               | 总条目数                                                     | `number`         | —                         |
| page-count                          | 总页数， `total` 和 `page-count` 设置任意一个就可以达到显示页码的功能；如果要支持 `page-sizes` 的更改，则需要使用 `total` 属性 | `number`         | —                         |
| pager-count                         | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | `number`（奇数） | 7                         |
| page-sizes                          | 每页显示个数选择器的选项设置                                 | `number[]`       | [10, 20, 30, 40, 50, 100] |
| current-page / v-model:current-page | 当前页数                                                     | `number`         | —                         |
| default-page-size                   | 非受控条件时，每页默认的条目个数                             | `number`         | 10                        |
| default-current-page                | 非受控条件时，当前页数的默认初始值                           | `number`         | 1                         |

## 碎碎念😭
- 对于`单元测试`，是实在不知道如何测试`Total`和`Jumper`了，太难模拟了😭
