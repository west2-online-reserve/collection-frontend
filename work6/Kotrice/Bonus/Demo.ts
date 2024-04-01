// #region Part 1

/* 描述：
  *不使用 Pick<T, K> ，实现 TS 内置的 Pick<T, K> 的功能。从类型 T 中选出符合 K 的属性，构造一个新的类型。
  */

// 实现：
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// #endregion

// #region Part 2

/* 描述：
  *实现一个泛型 DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。
  *假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。()
  */

// 实现：

// 应该就是这样吧 QWQ
type DeepReadonly<T> = { 
  readonly [K in keyof T]: T[K] extends {} ? DeepReadonly<T[K]> : T[K]
}

// #endregion

// #region Part 3

/* 描述：
  * 写一个接受数组的类型，并且返回扁平化的数组类型
  */

// 实现：

// 这里查了点资料，实在难！ QWQ
type Flatten<T extends any[]> = T extends [infer Head, ...infer Rest]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Rest>]
    : [Head, ...Flatten<Rest>]
  : []

// #endregion

// #region Part 4

/* 描述：
  * 实现一个类型，该类型对两个非负整数求和，并将总和作为字符串返回。
  * 数字可以指定为字符串、数字或 bigint。Sum<A, B> (难度非常大)
  */

// 实现：

// 太难辣！

// type UnionType = number | string | bigint
// type Sum<T extends UnionType, U extends UnionType> = {

// }

// #endregion
