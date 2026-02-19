/* _____________ 你的代码 _____________ */

type First<T extends any[]> = T extends [] ? never : T[0]

