// #region Part 1

// Circle 接口
interface Circle {
  type: 'circle',
  radius: number
}
// Square 接口
interface Square {
  type: 'square',
  length: number
}
// Triangle 接口
interface Triangle {
  type: 'triangle',
  length1: number,
  length2: number,
  length3: number
}
// Shape 类型
type Shape = Circle | Square | Triangle
// 声明 shape 变量
const shape: Shape = {
  type: 'circle',
  radius:10
}

// #endregion

// #region Part 2

// isCircle 函数
function isCircle(shape: Shape): shape is Circle {
  return shape.type === 'circle'
}
// isSquare 函数
function isSquare(shape: Shape): shape is Square {
  return shape.type === 'square'
}
// isTriangle 函数
function isTriangle(shape: Shape): shape is Triangle {
  return shape.type === 'triangle'
}

// #endregion

// #region Part 3

// getArea 函数
const getArea = (shape: Shape): number => {
  if (isCircle(shape)) {
    return shape.radius * shape.radius * 3.14159
  } else if (isSquare(shape)) {
    return shape.length * shape.length
  } else if (isTriangle(shape)) {
    const p: number = (shape.length1 + shape.length2 + shape.length3) / 2
    return Math.sqrt(p*(p-shape.length1)*(p-shape.length2)*(p-shape.length3))
  }  else {
    throw Error
  }
}

// #endregion 

// #region Part 4

// filterArray 函数
                                  //  这里我觉得 T 是够了，还要怎么加泛型约束？
const filterArray = <T>(targetArray: T[], filterRule: (value: T) => boolean): T[] => {  
  let afterFilter: T[] = []
  targetArray.forEach(v => {
    if (filterRule(v)) {
      afterFilter.push(v)
    }
  })
  return afterFilter
}

// #endregion
